package ec.edu.utc.gestion_service.contenedores.repository;


import ec.edu.utc.gestion_service.contenedores.entity.Contenedor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;


@Repository
public interface ContenedorRepository extends JpaRepository<Contenedor, Long> {


    Optional<Contenedor> findByCodigo(String codigo);


}