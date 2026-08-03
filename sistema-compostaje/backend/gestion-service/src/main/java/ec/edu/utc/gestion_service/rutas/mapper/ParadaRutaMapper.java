package ec.edu.utc.gestion_service.rutas.mapper;


import ec.edu.utc.gestion_service.rutas.dto.ParadaRutaResponseDTO;
import ec.edu.utc.gestion_service.rutas.entity.ParadaRuta;


import org.springframework.stereotype.Component;



@Component
public class ParadaRutaMapper {


    public ParadaRutaResponseDTO toDTO(ParadaRuta parada){


        return new ParadaRutaResponseDTO(

                parada.getId(),

                parada.getOrden(),

                parada.getDireccion(),

                parada.getRuta().getId(),

                parada.getCliente().getId()

        );


    }


}