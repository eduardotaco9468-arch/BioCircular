package ec.edu.utc.compostaje_service.repository;

import ec.edu.utc.compostaje_service.entity.ProcesoCompostaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcesoCompostajeRepository extends JpaRepository<ProcesoCompostaje, Long> {

}