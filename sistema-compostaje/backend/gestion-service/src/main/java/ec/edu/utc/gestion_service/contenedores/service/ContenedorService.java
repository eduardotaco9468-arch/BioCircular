package ec.edu.utc.gestion_service.contenedores.service;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import ec.edu.utc.gestion_service.clientes.repository.ClienteRepository;

import ec.edu.utc.gestion_service.contenedores.dto.ContenedorRequestDTO;
import ec.edu.utc.gestion_service.contenedores.dto.ContenedorResponseDTO;
import ec.edu.utc.gestion_service.contenedores.dto.ContenedorUpdateDTO;

import ec.edu.utc.gestion_service.contenedores.entity.Contenedor;
import ec.edu.utc.gestion_service.contenedores.entity.EstadoContenedor;

import ec.edu.utc.gestion_service.contenedores.mapper.ContenedorMapper;
import ec.edu.utc.gestion_service.contenedores.repository.ContenedorRepository;

import ec.edu.utc.gestion_service.exception.DuplicateResourceException;
import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class ContenedorService {


    private final ContenedorRepository contenedorRepository;

    private final ClienteRepository clienteRepository;

    private final ContenedorMapper mapper;



    public ContenedorResponseDTO registrar(ContenedorRequestDTO dto) {


        if(contenedorRepository.findByCodigo(dto.getCodigo()).isPresent()){

            throw new DuplicateResourceException(
                    "El código del contenedor ya existe"
            );

        }


        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cliente no encontrado"
                        )
                );


        Contenedor contenedor = new Contenedor();

        contenedor.setCodigo(dto.getCodigo());
        contenedor.setCapacidad(dto.getCapacidad());
        contenedor.setFechaInstalacion(dto.getFechaInstalacion());
        contenedor.setEstado(EstadoContenedor.DISPONIBLE);
        contenedor.setCliente(cliente);


        return mapper.toDTO(
                contenedorRepository.save(contenedor)
        );

    }



    public List<ContenedorResponseDTO> listar(){

        return contenedorRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();

    }



    public ContenedorResponseDTO buscarPorId(Long id){

        Contenedor contenedor =
                contenedorRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contenedor no encontrado"
                                )
                        );


        return mapper.toDTO(contenedor);

    }



    public ContenedorResponseDTO actualizar(
            Long id,
            ContenedorUpdateDTO dto){


        Contenedor contenedor =
                contenedorRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contenedor no encontrado"
                                )
                        );


        if(dto.getCapacidad()!=null){

            contenedor.setCapacidad(
                    dto.getCapacidad()
            );

        }


        if(dto.getEstado()!=null){

            contenedor.setEstado(
                    EstadoContenedor.valueOf(
                            dto.getEstado()
                    )
            );

        }


        return mapper.toDTO(
                contenedorRepository.save(contenedor)
        );

    }



    public void eliminar(Long id){


        Contenedor contenedor =
                contenedorRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contenedor no encontrado"
                                )
                        );


        contenedor.setEstado(
                EstadoContenedor.RETIRADO
        );


        contenedorRepository.save(contenedor);

    }

}