package ec.edu.utc.gestion_service.incidencias.service;

import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;
import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaRequestDTO;
import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaResponseDTO;
import ec.edu.utc.gestion_service.incidencias.entity.Incidencia;
import ec.edu.utc.gestion_service.incidencias.mapper.IncidenciaMapper;
import ec.edu.utc.gestion_service.incidencias.repository.IncidenciaRepository;
import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;
import ec.edu.utc.gestion_service.recolecciones.repository.RecoleccionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ec.edu.utc.gestion_service.integration.auth.AuthClient;
import ec.edu.utc.gestion_service.integration.auth.UsuarioAuthDTO;


import java.util.List;

@Service
@RequiredArgsConstructor
public class IncidenciaService {

    private final IncidenciaRepository incidenciaRepository;
    private final RecoleccionRepository recoleccionRepository;
    private final AuthClient authClient;


    // PASO 8
    public IncidenciaResponseDTO crear(IncidenciaRequestDTO dto) {

        Recoleccion recoleccion = recoleccionRepository
                .findById(dto.getRecoleccionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recolección no encontrada con ID: "
                                        + dto.getRecoleccionId()
                        )
                );
        if(dto.getResponsableId() != null){

            UsuarioAuthDTO usuario =
                    authClient.buscarUsuario(dto.getResponsableId());


            if(!usuario.getRol().equals("TECNICO")){

                throw new RuntimeException(
                        "El responsable debe tener rol TECNICO"
                );

            }

        }

        Incidencia incidencia =
                IncidenciaMapper.toEntity(dto, recoleccion);

        incidencia = incidenciaRepository.save(incidencia);

        return IncidenciaMapper.toResponseDTO(incidencia);
    }


    // PASO 9
    public List<IncidenciaResponseDTO> listar() {

        return incidenciaRepository.findAll()
                .stream()
                .map(IncidenciaMapper::toResponseDTO)
                .toList();

    }


    // PASO 10
    public IncidenciaResponseDTO obtenerPorId(Long id) {

        Incidencia incidencia = incidenciaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Incidencia no encontrada con ID: " + id
                        )
                );

        return IncidenciaMapper.toResponseDTO(incidencia);

    }


    // PASO 11
    public IncidenciaResponseDTO actualizar(
            Long id,
            IncidenciaRequestDTO dto
    ) {

        Incidencia incidencia = incidenciaRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Incidencia no encontrada con ID: " + id
                        )
                );


        Recoleccion recoleccion = recoleccionRepository
                .findById(dto.getRecoleccionId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Recolección no encontrada con ID: "
                                        + dto.getRecoleccionId()
                        )
                );


        IncidenciaMapper.updateEntity(
                incidencia,
                dto,
                recoleccion
        );


        incidencia = incidenciaRepository.save(incidencia);


        return IncidenciaMapper.toResponseDTO(incidencia);

    }

}