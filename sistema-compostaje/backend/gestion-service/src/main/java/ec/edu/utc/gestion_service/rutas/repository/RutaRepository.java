package ec.edu.utc.gestion_service.rutas.repository;


import ec.edu.utc.gestion_service.rutas.entity.Ruta;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;


@Repository
public interface RutaRepository extends JpaRepository<Ruta, Long> {


    Optional<Ruta> findByCodigo(String codigo);


}