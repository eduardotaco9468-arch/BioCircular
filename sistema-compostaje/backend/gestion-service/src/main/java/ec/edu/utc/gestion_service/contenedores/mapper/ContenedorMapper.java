package ec.edu.utc.gestion_service.contenedores.mapper;


import ec.edu.utc.gestion_service.contenedores.dto.ContenedorResponseDTO;
import ec.edu.utc.gestion_service.contenedores.entity.Contenedor;

import org.springframework.stereotype.Component;


@Component
public class ContenedorMapper {


    public ContenedorResponseDTO toDTO(Contenedor contenedor) {

        return new ContenedorResponseDTO(
                contenedor.getId(),
                contenedor.getCodigo(),
                contenedor.getCapacidad(),
                contenedor.getEstado(),
                contenedor.getFechaInstalacion(),
                contenedor.getCliente().getId()
        );

    }

}