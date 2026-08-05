package ec.edu.utc.auth_service.config;

import ec.edu.utc.auth_service.entity.Rol;
import ec.edu.utc.auth_service.enums.NombreRol;
import ec.edu.utc.auth_service.repository.RolRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class DataInitializer {


    @Bean
    @Order(1)
    CommandLineRunner initRoles(RolRepository rolRepository) {

        return args -> {

            for (NombreRol nombre : NombreRol.values()) {

                if (rolRepository.findByNombre(nombre).isEmpty()) {

                    Rol rol = new Rol();
                    rol.setNombre(nombre);

                    rolRepository.save(rol);
                }
            }

        };

    }

}
