package ec.edu.utc.gestion_service.clientes.mapper;

import ec.edu.utc.gestion_service.clientes.dto.ClienteRequestDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteResponseDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteUpdateDTO;
import ec.edu.utc.gestion_service.clientes.entity.Cliente;

import java.time.LocalDateTime;

public class ClienteMapper {

    public static Cliente toEntity(ClienteRequestDTO dto) {
        return Cliente.builder()
                .tipoCliente(dto.getTipoCliente())
                .nombre(dto.getNombre())
                .identificacion(dto.getIdentificacion())
                .correo(dto.getCorreo())
                .telefono(dto.getTelefono())
                .direccion(dto.getDireccion())
                .sector(dto.getSector())
                .estado(true)
                .fechaRegistro(LocalDateTime.now())
                .build();
    }

    public static ClienteResponseDTO toResponseDTO(Cliente cliente) {
        return ClienteResponseDTO.builder()
                .id(cliente.getId())
                .tipoCliente(cliente.getTipoCliente())
                .nombre(cliente.getNombre())
                .identificacion(cliente.getIdentificacion())
                .correo(cliente.getCorreo())
                .telefono(cliente.getTelefono())
                .direccion(cliente.getDireccion())
                .sector(cliente.getSector())
                .estado(cliente.getEstado())
                .fechaRegistro(cliente.getFechaRegistro())
                .build();
    }

    public static void updateEntity(Cliente cliente, ClienteUpdateDTO dto) {
        cliente.setTipoCliente(dto.getTipoCliente());
        cliente.setNombre(dto.getNombre());
        cliente.setCorreo(dto.getCorreo());
        cliente.setTelefono(dto.getTelefono());
        cliente.setDireccion(dto.getDireccion());
        cliente.setSector(dto.getSector());
        cliente.setEstado(dto.getEstado());
    }
}