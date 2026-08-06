package ec.edu.utc.gestion_service.recolecciones.service;

import ec.edu.utc.gestion_service.clientes.repository.ClienteRepository;
import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionRequestDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionUpdateDTO;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;
import ec.edu.utc.gestion_service.recolecciones.mapper.RecoleccionMapper;
import ec.edu.utc.gestion_service.recolecciones.repository.RecoleccionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecoleccionService {
    private final RecoleccionRepository recoleccionRepository;
    private final ClienteRepository clienteRepository;
    private final RecoleccionMapper mapper;

    public RecoleccionResponseDTO registrar(RecoleccionRequestDTO dto) {
        validarCliente(dto.getClienteId());
        validarFechas(dto.getFechaProgramada(), dto.getFechaRealizada());

        Recoleccion recoleccion = new Recoleccion();
        recoleccion.setClienteId(dto.getClienteId());
        recoleccion.setOperadorId(dto.getOperadorId());
        recoleccion.setVehiculoId(dto.getVehiculoId());
        recoleccion.setFechaProgramada(dto.getFechaProgramada());
        recoleccion.setFechaRealizada(dto.getFechaRealizada());
        recoleccion.setEstado(dto.getEstado());
        recoleccion.setPesoRecolectado(dto.getPesoRecolectado());
        recoleccion.setUnidad(dto.getUnidad());
        recoleccion.setObservaciones(dto.getObservaciones());
        return mapper.toDTO(recoleccionRepository.save(recoleccion));
    }

    public List<RecoleccionResponseDTO> listar(String rol, String email) {
        if ("CLIENTE".equals(rol)) {
            return recoleccionRepository.findByClienteId(clienteIdPorCorreo(email)).stream().map(mapper::toDTO).toList();
        }
        return recoleccionRepository.findAll().stream().map(mapper::toDTO).toList();
    }

    public RecoleccionResponseDTO buscarPorId(Long id, String rol, String email) {
        Recoleccion recoleccion = obtener(id);
        validarAccesoCliente(recoleccion, rol, email);
        return mapper.toDTO(recoleccion);
    }

    public RecoleccionResponseDTO actualizar(Long id, RecoleccionUpdateDTO dto, String rol) {
        Recoleccion recoleccion = obtener(id);
        if ("OPERADOR".equals(rol)) {
            validarActualizacionOperador(dto);
            recoleccion.setEstado(dto.getEstado());
        } else {
            actualizarCamposAdmin(recoleccion, dto);
        }
        validarFechas(recoleccion.getFechaProgramada(), recoleccion.getFechaRealizada());
        return mapper.toDTO(recoleccionRepository.save(recoleccion));
    }

    public void eliminar(Long id) {
        recoleccionRepository.delete(obtener(id));
    }

    private Recoleccion obtener(Long id) {
        return recoleccionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recolección no encontrada"));
    }

    private void validarCliente(Long clienteId) {
        if (!clienteRepository.existsById(clienteId)) {
            throw new ResourceNotFoundException("Cliente no encontrado");
        }
    }

    private Long clienteIdPorCorreo(String email) {
        return clienteRepository.findByCorreo(email)
                .orElseThrow(() -> new AccessDeniedException("No tiene un cliente asociado"))
                .getId();
    }

    private void validarAccesoCliente(Recoleccion recoleccion, String rol, String email) {
        if ("CLIENTE".equals(rol) && !recoleccion.getClienteId().equals(clienteIdPorCorreo(email))) {
            throw new AccessDeniedException("No tiene permiso para consultar esta recolección");
        }
    }

    private void validarActualizacionOperador(RecoleccionUpdateDTO dto) {
        if (dto.getEstado() == null || dto.getClienteId() != null || dto.getOperadorId() != null
                || dto.getVehiculoId() != null || dto.getFechaProgramada() != null || dto.getFechaRealizada() != null
                || dto.getPesoRecolectado() != null || dto.getUnidad() != null || dto.getObservaciones() != null) {
            throw new AccessDeniedException("El operador solo puede actualizar el estado");
        }
    }

    private void actualizarCamposAdmin(Recoleccion recoleccion, RecoleccionUpdateDTO dto) {
        if (dto.getClienteId() != null) { validarCliente(dto.getClienteId()); recoleccion.setClienteId(dto.getClienteId()); }
        if (dto.getOperadorId() != null) recoleccion.setOperadorId(dto.getOperadorId());
        if (dto.getVehiculoId() != null) recoleccion.setVehiculoId(dto.getVehiculoId());
        if (dto.getFechaProgramada() != null) recoleccion.setFechaProgramada(dto.getFechaProgramada());
        if (dto.getFechaRealizada() != null) recoleccion.setFechaRealizada(dto.getFechaRealizada());
        if (dto.getEstado() != null) recoleccion.setEstado(dto.getEstado());
        if (dto.getPesoRecolectado() != null) recoleccion.setPesoRecolectado(dto.getPesoRecolectado());
        if (dto.getUnidad() != null && !dto.getUnidad().isBlank()) recoleccion.setUnidad(dto.getUnidad());
        if (dto.getObservaciones() != null) recoleccion.setObservaciones(dto.getObservaciones());
    }

    private void validarFechas(java.time.LocalDateTime fechaProgramada, java.time.LocalDateTime fechaRealizada) {
        if (fechaRealizada != null && fechaRealizada.isBefore(fechaProgramada)) {
            throw new IllegalArgumentException("La fecha realizada no puede ser anterior a la fecha programada");
        }
    }
}
