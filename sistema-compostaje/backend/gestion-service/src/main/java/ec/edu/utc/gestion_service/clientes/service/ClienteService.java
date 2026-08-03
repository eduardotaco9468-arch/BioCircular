package ec.edu.utc.gestion_service.clientes.service;

import ec.edu.utc.gestion_service.clientes.dto.ClienteRequestDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteResponseDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteUpdateDTO;
import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import ec.edu.utc.gestion_service.clientes.mapper.ClienteMapper;
import ec.edu.utc.gestion_service.clientes.repository.ClienteRepository;
import ec.edu.utc.gestion_service.exception.DuplicateResourceException;
import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteResponseDTO registrar(ClienteRequestDTO dto) {

        if (clienteRepository.existsByIdentificacion(dto.getIdentificacion())) {
            throw new DuplicateResourceException("La identificación ya está registrada.");
        }

        if (clienteRepository.existsByCorreo(dto.getCorreo())) {
            throw new DuplicateResourceException("El correo ya está registrado.");
        }

        Cliente cliente = ClienteMapper.toEntity(dto);

        cliente = clienteRepository.save(cliente);

        return ClienteMapper.toResponseDTO(cliente);
    }

    public List<ClienteResponseDTO> listar() {
        return clienteRepository.findAll()
                .stream()
                .map(ClienteMapper::toResponseDTO)
                .toList();
    }

    public ClienteResponseDTO buscarPorId(Long id) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cliente no encontrado."));

        return ClienteMapper.toResponseDTO(cliente);
    }

    public ClienteResponseDTO actualizar(Long id, ClienteUpdateDTO dto) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cliente no encontrado."));

        ClienteMapper.updateEntity(cliente, dto);

        cliente = clienteRepository.save(cliente);

        return ClienteMapper.toResponseDTO(cliente);
    }

    public void desactivar(Long id) {

        Cliente cliente = clienteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Cliente no encontrado."));

        cliente.setEstado(false);

        clienteRepository.save(cliente);
    }

}