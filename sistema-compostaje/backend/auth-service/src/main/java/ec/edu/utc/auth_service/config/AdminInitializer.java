package ec.edu.utc.auth_service.config;

import ec.edu.utc.auth_service.entity.Rol;
import ec.edu.utc.auth_service.entity.Usuario;
import ec.edu.utc.auth_service.enums.NombreRol;
import ec.edu.utc.auth_service.repository.RolRepository;
import ec.edu.utc.auth_service.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
@Order(2)
public class AdminInitializer implements CommandLineRunner {

    private static final String ADMIN_EMAIL = "admin@sistema.com";

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminInitializer(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (usuarioRepository.findByEmail(ADMIN_EMAIL).isPresent()) {
            System.out.println("Administrador ya existe");
            return;
        }

        Rol rolAdmin = rolRepository.findByNombre(NombreRol.ADMIN)
                .orElseThrow(() -> new IllegalStateException("El rol ADMIN no existe"));

        Usuario administrador = new Usuario();
        administrador.setNombre("Administrador");
        administrador.setEmail(ADMIN_EMAIL);
        administrador.setPassword(passwordEncoder.encode("Admin123*"));
        administrador.setEstado(true);
        administrador.setRol(rolAdmin);

        usuarioRepository.save(administrador);
        System.out.println("Administrador inicial creado");
    }
}
