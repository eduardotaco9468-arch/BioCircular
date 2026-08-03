package ec.edu.utc.compostaje_service.repository;

import ec.edu.utc.compostaje_service.entity.Observacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObservacionRepository extends JpaRepository<Observacion, Long> {

}