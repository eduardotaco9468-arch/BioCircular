package ec.edu.utc.gestion_service.rutas.repository;


import ec.edu.utc.gestion_service.rutas.entity.ParadaRuta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface ParadaRutaRepository extends JpaRepository<ParadaRuta, Long> {


    List<ParadaRuta> findByRutaIdOrderByOrdenAsc(Long rutaId);


}