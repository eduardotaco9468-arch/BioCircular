package ec.edu.utc.gestion_service.clientes.repository;

import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    Optional<Cliente> findByIdentificacion(String identificacion);

    Optional<Cliente> findByCorreo(String correo);

    boolean existsByIdentificacion(String identificacion);

    boolean existsByCorreo(String correo);
}