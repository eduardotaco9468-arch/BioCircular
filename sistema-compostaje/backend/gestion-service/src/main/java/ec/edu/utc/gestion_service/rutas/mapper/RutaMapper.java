package ec.edu.utc.gestion_service.rutas.mapper;


import ec.edu.utc.gestion_service.rutas.dto.RutaResponseDTO;
import ec.edu.utc.gestion_service.rutas.entity.Ruta;

import org.springframework.stereotype.Component;


@Component
public class RutaMapper {


    public RutaResponseDTO toDTO(Ruta ruta) {


        return new RutaResponseDTO(

                ruta.getId(),

                ruta.getCodigo(),

                ruta.getNombre(),

                ruta.getDescripcion(),

                ruta.getSector(),

                ruta.getDireccion(),

                ruta.getFechaProgramada(),

                ruta.getHorario(),

                ruta.getEstado(),

                ruta.getFechaCreacion()

        );


    }


}