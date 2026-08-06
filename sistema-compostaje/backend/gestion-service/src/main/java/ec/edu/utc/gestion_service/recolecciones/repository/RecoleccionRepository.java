package ec.edu.utc.gestion_service.recolecciones.repository;

import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecoleccionRepository extends JpaRepository<Recoleccion, Long> {
    List<Recoleccion> findByClienteId(Long clienteId);
}
