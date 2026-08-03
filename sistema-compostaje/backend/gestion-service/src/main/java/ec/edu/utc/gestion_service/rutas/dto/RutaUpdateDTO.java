package ec.edu.utc.gestion_service.rutas.dto;


import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RutaUpdateDTO {


    private String nombre;


    private String descripcion;


    private String sector;


    private String direccion;


    private String horario;


}