package ec.edu.utc.gestion_service.recolecciones.mapper;


import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;


import org.springframework.stereotype.Component;



@Component
public class RecoleccionMapper {


    public RecoleccionResponseDTO toDTO(Recoleccion recoleccion){


        return new RecoleccionResponseDTO(

                recoleccion.getId(),

                recoleccion.getFecha(),

                recoleccion.getHoraInicio(),

                recoleccion.getHoraFin(),

                recoleccion.getEstado(),

                recoleccion.getCliente().getId(),

                recoleccion.getContenedor().getId(),

                recoleccion.getRuta().getId(),

                recoleccion.getPesoCantidad(),

                recoleccion.getUnidad(),

                recoleccion.getTipoProblema(),

                recoleccion.getObservacion()

        );


    }


}