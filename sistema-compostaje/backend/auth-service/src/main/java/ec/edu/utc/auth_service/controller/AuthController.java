package ec.edu.utc.auth_service.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import ec.edu.utc.auth_service.dto.LoginRequest;
import ec.edu.utc.auth_service.dto.RegisterRequest;
import ec.edu.utc.auth_service.entity.Usuario;
import ec.edu.utc.auth_service.repository.UsuarioRepository;
import ec.edu.utc.auth_service.service.JwtService;
import ec.edu.utc.auth_service.service.UsuarioService;
import ec.edu.utc.auth_service.dto.AuthResponse;
import ec.edu.utc.auth_service.dto.CreateUserRequest;
import ec.edu.utc.auth_service.dto.UsuarioResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import ec.edu.utc.auth_service.dto.MensajeResponse;



@RestController
@RequestMapping("/auth")
public class AuthController {


    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;


    public AuthController(
            UsuarioService usuarioService,
            UsuarioRepository usuarioRepository,
            JwtService jwtService,
            PasswordEncoder passwordEncoder
    ){

        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;

    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UsuarioResponse> buscarUsuario(
            @PathVariable Long id
    ){

        Usuario usuario = usuarioService.buscarPorId(id);


        UsuarioResponse response =
                UsuarioResponse.builder()
                        .id(usuario.getId())
                        .nombre(usuario.getNombre())
                        .email(usuario.getEmail())
                        .rol(usuario.getRol().getNombre().name())
                        .build();


        return ResponseEntity.ok(response);

    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UsuarioResponse> crearUsuario(
            @RequestBody CreateUserRequest request
    ){

        Usuario usuario = usuarioService.crearUsuario(request);

        UsuarioResponse response = new UsuarioResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol().getNombre().name()
        );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<MensajeResponse> actualizarUsuario(
            @PathVariable Long id,
            @RequestBody CreateUserRequest request
    ) {
        usuarioService.actualizarUsuario(id, request);
        return ResponseEntity.ok(new MensajeResponse("Usuario actualizado correctamente"));
    }

    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {
        usuarioService.eliminarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/test")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminTest() {
        return "Acceso permitido ADMIN";
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {

        List<UsuarioResponse> usuarios =
                usuarioService.listarUsuarios()
                        .stream()
                        .map(usuario -> new UsuarioResponse(
                                usuario.getId(),
                                usuario.getNombre(),
                                usuario.getEmail(),
                                usuario.getRol().getNombre().name()
                        ))
                        .toList();

        return ResponseEntity.ok(usuarios);

    }



    @PostMapping("/register")
    public ResponseEntity<Usuario> registrar(
            @RequestBody RegisterRequest request
    ){

        return ResponseEntity.ok(
                usuarioService.registrarUsuario(request)
        );

    }
    @GetMapping("/perfil")
    public ResponseEntity<?> perfil(){

        return ResponseEntity.ok(
                "Token válido, usuario autenticado"
        );

    }



    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ){


        Usuario usuario =
                usuarioRepository
                        .findByEmail(request.getEmail())
                        .orElse(null);



        if(usuario == null){

            return ResponseEntity
                    .status(401)
                    .body("Usuario no encontrado");

        }



        if(!passwordEncoder.matches(
                request.getPassword(),
                usuario.getPassword()
        )){


            return ResponseEntity
                    .status(401)
                    .body("Contraseña incorrecta");

        }



        String token = jwtService.generateToken(usuario);

        AuthResponse response = new AuthResponse(
                token,
                usuario.getEmail(),
                usuario.getRol().getNombre().name()
        );

        return ResponseEntity.ok(response);




    }

    @PostMapping("/internal/create-client-user")
    public ResponseEntity<UsuarioResponse> createClientUser(@RequestBody CreateUserRequest request) {
        Usuario usuario = usuarioService.createUserFromClient(request);
        return ResponseEntity.ok(new UsuarioResponse(usuario.getId(), usuario.getNombre(), usuario.getEmail(), usuario.getRol().getNombre().name()));
    
}
}