package ec.edu.utc.gestion_service.recolecciones.dto;

import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class RecoleccionResponseDTO {
    private Long id;
    private Long clienteId;
    private Long operadorId;
    private Long vehiculoId;
    private LocalDateTime fechaProgramada;
    private LocalDateTime fechaRealizada;
    private EstadoRecoleccion estado;
    private BigDecimal pesoRecolectado;
    private String unidad;
    private String observaciones;
}
