package ec.edu.utc.gestion_service.recolecciones.mapper;

import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;
import org.springframework.stereotype.Component;

@Component
public class RecoleccionMapper {
    public RecoleccionResponseDTO toDTO(Recoleccion recoleccion) {
        return RecoleccionResponseDTO.builder()
                .id(recoleccion.getId())
                .clienteId(recoleccion.getClienteId())
                .operadorId(recoleccion.getOperadorId())
                .vehiculoId(recoleccion.getVehiculoId())
                .fechaProgramada(recoleccion.getFechaProgramada())
                .fechaRealizada(recoleccion.getFechaRealizada())
                .estado(recoleccion.getEstado())
                .pesoRecolectado(recoleccion.getPesoRecolectado())
                .unidad(recoleccion.getUnidad())
                .observaciones(recoleccion.getObservaciones())
                .build();
    }
}
