package ec.edu.utc.gestion_service.incidencias.repository;

import ec.edu.utc.gestion_service.incidencias.entity.Incidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {

}