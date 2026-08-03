package ec.edu.utc.gestion_service.contenedores.dto;


import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ContenedorUpdateDTO {


    private Integer capacidad;


    @NotNull(message = "El estado es obligatorio")
    private String estado;


}