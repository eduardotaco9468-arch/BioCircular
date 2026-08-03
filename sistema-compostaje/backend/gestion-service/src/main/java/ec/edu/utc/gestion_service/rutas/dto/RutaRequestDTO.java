package ec.edu.utc.gestion_service.rutas.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;


@Getter
@Setter
public class RutaRequestDTO {


    @NotBlank(message = "El código es obligatorio")
    private String codigo;


    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;


    private String descripcion;


    @NotBlank(message = "El sector es obligatorio")
    private String sector;


    @NotBlank(message = "La dirección es obligatoria")
    private String direccion;


    @NotNull(message = "La fecha programada es obligatoria")
    private LocalDate fechaProgramada;


    @NotBlank(message = "El horario es obligatorio")
    private String horario;


}