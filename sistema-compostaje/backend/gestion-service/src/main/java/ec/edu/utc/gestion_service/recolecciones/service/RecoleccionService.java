package ec.edu.utc.gestion_service.recolecciones.service;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import ec.edu.utc.gestion_service.clientes.repository.ClienteRepository;

import ec.edu.utc.gestion_service.contenedores.entity.Contenedor;
import ec.edu.utc.gestion_service.contenedores.repository.ContenedorRepository;

import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;

import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionRequestDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionUpdateDTO;

import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;

import ec.edu.utc.gestion_service.recolecciones.mapper.RecoleccionMapper;
import ec.edu.utc.gestion_service.recolecciones.repository.RecoleccionRepository;

import ec.edu.utc.gestion_service.rutas.entity.Ruta;
import ec.edu.utc.gestion_service.rutas.repository.RutaRepository;


import lombok.RequiredArgsConstructor;


import org.springframework.stereotype.Service;


import java.util.List;



@Service
@RequiredArgsConstructor
public class RecoleccionService {



    private final RecoleccionRepository recoleccionRepository;

    private final ClienteRepository clienteRepository;

    private final ContenedorRepository contenedorRepository;

    private final RutaRepository rutaRepository;

    private final RecoleccionMapper mapper;



    public RecoleccionResponseDTO registrar(
            RecoleccionRequestDTO dto){


        Cliente cliente =
                clienteRepository.findById(dto.getClienteId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Cliente no encontrado"
                                )
                        );



        Contenedor contenedor =
                contenedorRepository.findById(dto.getContenedorId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Contenedor no encontrado"
                                )
                        );



        Ruta ruta =
                rutaRepository.findById(dto.getRutaId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Ruta no encontrada"
                                )
                        );



        Recoleccion recoleccion =
                new Recoleccion();


        recoleccion.setFecha(dto.getFecha());

        recoleccion.setHoraInicio(dto.getHoraInicio());

        recoleccion.setHoraFin(dto.getHoraFin());


        recoleccion.setEstado(
                EstadoRecoleccion.PROGRAMADA
        );


        recoleccion.setCliente(cliente);

        recoleccion.setContenedor(contenedor);

        recoleccion.setRuta(ruta);


        recoleccion.setPesoCantidad(
                dto.getPesoCantidad()
        );


        recoleccion.setUnidad(
                dto.getUnidad()
        );


        recoleccion.setTipoProblema(
                dto.getTipoProblema()
        );


        recoleccion.setObservacion(
                dto.getObservacion()
        );



        return mapper.toDTO(
                recoleccionRepository.save(recoleccion)
        );


    }




    public List<RecoleccionResponseDTO> listar(){


        return recoleccionRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();


    }





    public RecoleccionResponseDTO buscarPorId(Long id){


        Recoleccion recoleccion =
                recoleccionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Recolección no encontrada"
                                )
                        );


        return mapper.toDTO(recoleccion);


    }





    public RecoleccionResponseDTO actualizar(
            Long id,
            RecoleccionUpdateDTO dto){



        Recoleccion recoleccion =
                recoleccionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Recolección no encontrada"
                                )
                        );



        if(dto.getEstado()!=null){

            recoleccion.setEstado(
                    dto.getEstado()
            );

        }



        if(dto.getObservacion()!=null){

            recoleccion.setObservacion(
                    dto.getObservacion()
            );

        }



        return mapper.toDTO(
                recoleccionRepository.save(recoleccion)
        );


    }





    public List<RecoleccionResponseDTO> buscarPorCliente(
            Long clienteId){



        return recoleccionRepository
                .findByClienteId(clienteId)
                .stream()
                .map(mapper::toDTO)
                .toList();


    }



}