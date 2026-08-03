package ec.edu.utc.compostaje_service.repository;

import ec.edu.utc.compostaje_service.entity.Trazabilidad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrazabilidadRepository
        extends JpaRepository<Trazabilidad,Long> {


    List<Trazabilidad> findByLoteId(Long loteId);

}