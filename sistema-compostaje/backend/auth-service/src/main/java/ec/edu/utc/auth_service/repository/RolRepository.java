package ec.edu.utc.auth_service.repository;

import ec.edu.utc.auth_service.entity.Rol;
import ec.edu.utc.auth_service.enums.NombreRol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Long> {

    Optional<Rol> findByNombre(NombreRol nombre);

}