package ec.edu.utc.gestion_service.recolecciones.dto;


import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;


import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class RecoleccionUpdateDTO {


    private EstadoRecoleccion estado;


    private String observacion;


}