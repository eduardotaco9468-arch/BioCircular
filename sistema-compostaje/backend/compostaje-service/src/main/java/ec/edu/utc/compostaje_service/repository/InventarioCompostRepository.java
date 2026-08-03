package ec.edu.utc.compostaje_service.repository;

import ec.edu.utc.compostaje_service.entity.InventarioCompost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventarioCompostRepository extends JpaRepository<InventarioCompost, Long> {

}