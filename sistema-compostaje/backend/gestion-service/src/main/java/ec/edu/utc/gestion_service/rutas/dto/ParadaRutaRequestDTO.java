package ec.edu.utc.gestion_service.rutas.dto;


import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class ParadaRutaRequestDTO {


    @NotNull(message = "El orden de la parada es obligatorio")
    private Integer orden;


    private String direccion;


    @NotNull(message = "El cliente es obligatorio")
    private Long clienteId;


}