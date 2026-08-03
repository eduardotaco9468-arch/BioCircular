package ec.edu.utc.auth_service.service;

import java.util.List;
import ec.edu.utc.auth_service.dto.RegisterRequest;
import ec.edu.utc.auth_service.entity.Rol;
import ec.edu.utc.auth_service.entity.Usuario;
import ec.edu.utc.auth_service.enums.NombreRol;
import ec.edu.utc.auth_service.repository.RolRepository;
import ec.edu.utc.auth_service.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ec.edu.utc.auth_service.dto.CreateUserRequest;
import ec.edu.utc.auth_service.enums.NombreRol;
import ec.edu.utc.auth_service.entity.Rol;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;


    public UsuarioService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            RolRepository rolRepository
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.rolRepository = rolRepository;
    }
    public List<Usuario> listarUsuarios() {

        return usuarioRepository.findAll();

    }
    public Usuario buscarPorId(Long id){

        return usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Usuario no encontrado"
                        )
                );

    }

    public Usuario crearUsuario(CreateUserRequest request){

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setEmail(request.getEmail());

        usuario.setPassword(
                passwordEncoder.encode(request.getPassword())
        );


        NombreRol nombreRol =
                NombreRol.valueOf(request.getRol());


        Rol rol = rolRepository.findByNombre(nombreRol)
                .orElseThrow(() ->
                        new RuntimeException("Rol no encontrado")
                );


        usuario.setRol(rol);


        return usuarioRepository.save(usuario);
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


        return usuarioRepository.save(usuario);
    }
}