package ec.edu.utc.gestion_service.incidencias.dto;

import ec.edu.utc.gestion_service.incidencias.entity.EstadoIncidencia;
import ec.edu.utc.gestion_service.incidencias.entity.TipoIncidencia;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidenciaResponseDTO {

    private Long id;

    private LocalDateTime fechaRegistro;

    private String titulo;

    private String descripcion;

    private TipoIncidencia tipoIncidencia;

    private EstadoIncidencia estado;

    private LocalDate fechaResolucion;

    private Long responsableId;

    private Long recoleccionId;

}