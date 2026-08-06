package ec.edu.utc.gestion_service.recolecciones.dto;

import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class RecoleccionRequestDTO {
    @NotNull(message = "El cliente es obligatorio")
    private Long clienteId;
    private Long operadorId;
    private Long vehiculoId;
    @NotNull(message = "La fecha programada es obligatoria")
    private LocalDateTime fechaProgramada;
    private LocalDateTime fechaRealizada;
    @NotNull(message = "El estado es obligatorio")
    private EstadoRecoleccion estado;
    @Positive(message = "El peso recolectado debe ser positivo")
    private BigDecimal pesoRecolectado;
    @NotBlank(message = "La unidad es obligatoria")
    private String unidad;
    private String observaciones;
}
