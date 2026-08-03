package ec.edu.utc.gestion_service.rutas.service;


import ec.edu.utc.gestion_service.exception.DuplicateResourceException;
import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;

import ec.edu.utc.gestion_service.rutas.dto.RutaRequestDTO;
import ec.edu.utc.gestion_service.rutas.dto.RutaResponseDTO;
import ec.edu.utc.gestion_service.rutas.dto.RutaUpdateDTO;

import ec.edu.utc.gestion_service.rutas.entity.EstadoRuta;
import ec.edu.utc.gestion_service.rutas.entity.Ruta;

import ec.edu.utc.gestion_service.rutas.mapper.RutaMapper;
import ec.edu.utc.gestion_service.rutas.repository.RutaRepository;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;



@Service
@RequiredArgsConstructor
public class RutaService {


    private final RutaRepository rutaRepository;

    private final RutaMapper mapper;



    public RutaResponseDTO registrar(RutaRequestDTO dto){


        if(rutaRepository.findByCodigo(dto.getCodigo()).isPresent()){


            throw new DuplicateResourceException(
                    "El código de ruta ya existe"
            );

        }


        Ruta ruta = new Ruta();


        ruta.setCodigo(dto.getCodigo());

        ruta.setNombre(dto.getNombre());

        ruta.setDescripcion(dto.getDescripcion());

        ruta.setSector(dto.getSector());

        ruta.setDireccion(dto.getDireccion());

        ruta.setFechaProgramada(dto.getFechaProgramada());

        ruta.setHorario(dto.getHorario());


        ruta.setEstado(
                EstadoRuta.ACTIVA
        );


        ruta.setFechaCreacion(
                LocalDateTime.now()
        );


        return mapper.toDTO(
                rutaRepository.save(ruta)
        );


    }



    public List<RutaResponseDTO> listar(){


        return rutaRepository.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();


    }



    public RutaResponseDTO buscarPorId(Long id){


        Ruta ruta = rutaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ruta no encontrada"
                        )
                );


        return mapper.toDTO(ruta);


    }




    public RutaResponseDTO actualizar(
            Long id,
            RutaUpdateDTO dto){



        Ruta ruta = rutaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ruta no encontrada"
                        )
                );



        if(dto.getNombre()!=null){

            ruta.setNombre(
                    dto.getNombre()
            );

        }


        if(dto.getDescripcion()!=null){

            ruta.setDescripcion(
                    dto.getDescripcion()
            );

        }


        if(dto.getSector()!=null){

            ruta.setSector(
                    dto.getSector()
            );

        }


        if(dto.getDireccion()!=null){

            ruta.setDireccion(
                    dto.getDireccion()
            );

        }


        if(dto.getHorario()!=null){

            ruta.setHorario(
                    dto.getHorario()
            );

        }



        return mapper.toDTO(
                rutaRepository.save(ruta)
        );


    }




    public void eliminar(Long id){



        Ruta ruta = rutaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ruta no encontrada"
                        )
                );


        ruta.setEstado(
                EstadoRuta.INACTIVA
        );


        rutaRepository.save(ruta);


    }


}