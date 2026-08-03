package ec.edu.utc.gestion_service.incidencias.mapper;

import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaRequestDTO;
import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaResponseDTO;
import ec.edu.utc.gestion_service.incidencias.entity.Incidencia;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;

import java.time.LocalDateTime;

public class IncidenciaMapper {

    public static Incidencia toEntity(
            IncidenciaRequestDTO dto,
            Recoleccion recoleccion
    ){

        return Incidencia.builder()
                .fechaRegistro(LocalDateTime.now())
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .tipoIncidencia(dto.getTipoIncidencia())
                .estado(dto.getEstado())
                .responsableId(dto.getResponsableId())
                .recoleccion(recoleccion)
                .build();

    }

    public static IncidenciaResponseDTO toResponseDTO(
            Incidencia incidencia
    ){

        return IncidenciaResponseDTO.builder()
                .id(incidencia.getId())
                .fechaRegistro(incidencia.getFechaRegistro())
                .titulo(incidencia.getTitulo())
                .descripcion(incidencia.getDescripcion())
                .tipoIncidencia(incidencia.getTipoIncidencia())
                .estado(incidencia.getEstado())
                .fechaResolucion(incidencia.getFechaResolucion())
                .responsableId(incidencia.getResponsableId())
                .recoleccionId(
                        incidencia.getRecoleccion().getId()
                )
                .build();

    }

    public static void updateEntity(
            Incidencia incidencia,
            IncidenciaRequestDTO dto,
            Recoleccion recoleccion
    ){

        incidencia.setTitulo(dto.getTitulo());
        incidencia.setDescripcion(dto.getDescripcion());
        incidencia.setTipoIncidencia(dto.getTipoIncidencia());
        incidencia.setEstado(dto.getEstado());
        incidencia.setResponsableId(dto.getResponsableId());
        incidencia.setRecoleccion(recoleccion);

    }

}