package ec.edu.utc.gestion_service.recolecciones.dto;

import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class RecoleccionUpdateDTO {
    private Long clienteId;
    private Long operadorId;
    private Long vehiculoId;
    private LocalDateTime fechaProgramada;
    private LocalDateTime fechaRealizada;
    private EstadoRecoleccion estado;
    @Positive(message = "El peso recolectado debe ser positivo")
    private BigDecimal pesoRecolectado;
    private String unidad;
    private String observaciones;
}
