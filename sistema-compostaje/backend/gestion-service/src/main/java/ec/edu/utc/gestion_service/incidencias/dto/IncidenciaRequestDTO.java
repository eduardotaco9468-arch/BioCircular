package ec.edu.utc.gestion_service.incidencias.dto;

import ec.edu.utc.gestion_service.incidencias.entity.EstadoIncidencia;
import ec.edu.utc.gestion_service.incidencias.entity.TipoIncidencia;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidenciaRequestDTO {

    @NotBlank
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotNull
    private TipoIncidencia tipoIncidencia;

    @NotNull
    private Long recoleccionId;

    private Long responsableId;

    @NotNull
    private EstadoIncidencia estado;

}