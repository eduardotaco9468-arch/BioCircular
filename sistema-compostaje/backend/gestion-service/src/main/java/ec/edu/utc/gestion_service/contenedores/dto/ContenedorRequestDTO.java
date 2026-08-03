package ec.edu.utc.gestion_service.contenedores.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;


import java.time.LocalDate;


@Getter
@Setter
public class ContenedorRequestDTO {


    @NotBlank(message = "El código es obligatorio")
    private String codigo;


    @NotNull(message = "La capacidad es obligatoria")
    private Integer capacidad;


    @NotNull(message = "La fecha de instalación es obligatoria")
    private LocalDate fechaInstalacion;


    @NotNull(message = "El cliente es obligatorio")
    private Long clienteId;


}