package ec.edu.utc.auth_service.service;

import java.util.List;
import ec.edu.utc.auth_service.dto.RegisterRequest;
import ec.edu.utc.auth_service.dto.CreateUserRequest;
import ec.edu.utc.auth_service.dto.ClienteRequestDTO;
import ec.edu.utc.auth_service.entity.Rol;
import ec.edu.utc.auth_service.entity.Usuario;
import ec.edu.utc.auth_service.enums.NombreRol;
import ec.edu.utc.auth_service.repository.RolRepository;
import ec.edu.utc.auth_service.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ec.edu.utc.auth_service.exception.CorreoDuplicadoException;
import ec.edu.utc.auth_service.exception.RolInvalidoException;
import ec.edu.utc.auth_service.exception.UsuarioNoEncontradoException;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;
    private final RestTemplate restTemplate;
    private final ClienteGestionClient clienteGestionClient;


    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            RolRepository rolRepository,
            RestTemplate restTemplate,
            ClienteGestionClient clienteGestionClient
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
        this.restTemplate = restTemplate;
        this.clienteGestionClient = clienteGestionClient;
    }
    public List<Usuario> listarUsuarios() {

        return usuarioRepository.findAll();

    }
    public Usuario buscarPorId(Long id){

        return usuarioRepository.findById(id)
                .orElseThrow(UsuarioNoEncontradoException::new);

    }

    public Usuario crearUsuario(CreateUserRequest request){

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new CorreoDuplicadoException();
        }

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());

        usuario.setPassword(
                passwordEncoder.encode(request.getPassword())
        );


        Rol rol = obtenerRol(request.getRol());


        usuario.setRol(rol);
        Usuario saved = usuarioRepository.save(usuario);
        if (rol.getNombre() == NombreRol.CLIENTE) {
            ClienteRequestDTO dto = new ClienteRequestDTO();
            dto.setNombre(usuario.getNombre());
            dto.setTipoCliente("RESIDENCIAL");
            dto.setIdentificacion("PENDIENTE-" + usuario.getId());
            dto.setCorreo(usuario.getEmail());
            dto.setTelefono("0000000000");
            dto.setDireccion("PENDIENTE");
            dto.setSector("PENDIENTE");
            dto.setEstado(true);
            clienteGestionClient.crearCliente(dto);
        }
        return saved;
    }

    public Usuario actualizarUsuario(Long id, CreateUserRequest request) {

        Usuario usuario = buscarPorId(id);

        usuarioRepository.findByEmail(request.getEmail())
                .filter(usuarioConMismoCorreo -> !usuarioConMismoCorreo.getId().equals(id))
                .ifPresent(usuarioConMismoCorreo -> {
                    throw new CorreoDuplicadoException();
                });

        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        Rol rol = obtenerRol(request.getRol());

        usuario.setRol(rol);

        return usuarioRepository.save(usuario);
    }

    public void eliminarUsuario(Long id) {

        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }

    private Rol obtenerRol(String nombreRol) {
        try {
            NombreRol rolSolicitado = NombreRol.valueOf(nombreRol);
            return rolRepository.findByNombre(rolSolicitado)
                    .orElseThrow(RolInvalidoException::new);
        } catch (IllegalArgumentException | NullPointerException exception) {
            throw new RolInvalidoException();
        }
    }


    public Usuario registrarUsuario(RegisterRequest request) {

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());

        usuario.setPassword(
                passwordEncoder.encode(request.getPassword())
        );


        Rol rolCliente = rolRepository.findByNombre(NombreRol.CLIENTE)
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        usuario.setRol(rolCliente);
        Usuario saved = usuarioRepository.save(usuario);
        if (rolCliente.getNombre() == NombreRol.CLIENTE) {
            ClienteRequestDTO dto = new ClienteRequestDTO();
            dto.setNombre(usuario.getNombre());
            dto.setTipoCliente("RESIDENCIAL");
            dto.setIdentificacion("PENDIENTE-" + usuario.getId());
            dto.setCorreo(usuario.getEmail());
            dto.setTelefono("0000000000");
            dto.setDireccion("PENDIENTE");
            dto.setSector("PENDIENTE");
            dto.setEstado(true);
            clienteGestionClient.crearCliente(dto);
        }
        return saved;
    }
    public Usuario createUserFromClient(CreateUserRequest request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new CorreoDuplicadoException();
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());
        usuario.setPassword(passwordEncoder.encode(request.getPassword()));

        Rol rolCliente = rolRepository.findByNombre(NombreRol.CLIENTE)
                .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));

        usuario.setRol(rolCliente);
        return usuarioRepository.save(usuario);
}
}
