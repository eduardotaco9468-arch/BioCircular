package ec.edu.utc.gestion_service.rutas.service;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import ec.edu.utc.gestion_service.clientes.repository.ClienteRepository;

import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;

import ec.edu.utc.gestion_service.rutas.dto.ParadaRutaRequestDTO;
import ec.edu.utc.gestion_service.rutas.dto.ParadaRutaResponseDTO;

import ec.edu.utc.gestion_service.rutas.entity.ParadaRuta;
import ec.edu.utc.gestion_service.rutas.entity.Ruta;

import ec.edu.utc.gestion_service.rutas.mapper.ParadaRutaMapper;

import ec.edu.utc.gestion_service.rutas.repository.ParadaRutaRepository;
import ec.edu.utc.gestion_service.rutas.repository.RutaRepository;


import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;


import java.util.List;



@Service
@RequiredArgsConstructor
public class ParadaRutaService {



    private final ParadaRutaRepository paradaRutaRepository;

    private final RutaRepository rutaRepository;

    private final ClienteRepository clienteRepository;

    private final ParadaRutaMapper mapper;




    public ParadaRutaResponseDTO registrar(
            Long rutaId,
            ParadaRutaRequestDTO dto){



        Ruta ruta = rutaRepository.findById(rutaId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Ruta no encontrada"
                        )
                );



        Cliente cliente = clienteRepository.findById(dto.getClienteId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Cliente no encontrado"
                        )
                );



        ParadaRuta parada = new ParadaRuta();


        parada.setOrden(
                dto.getOrden()
        );


        parada.setDireccion(
                dto.getDireccion()
        );


        parada.setRuta(
                ruta
        );


        parada.setCliente(
                cliente
        );



        return mapper.toDTO(
                paradaRutaRepository.save(parada)
        );


    }





    public List<ParadaRutaResponseDTO> listarPorRuta(
            Long rutaId){



        if(!rutaRepository.existsById(rutaId)){

            throw new ResourceNotFoundException(
                    "Ruta no encontrada"
            );

        }



        return paradaRutaRepository
                .findByRutaIdOrderByOrdenAsc(rutaId)
                .stream()
                .map(mapper::toDTO)
                .toList();


    }





    public void eliminar(Long id){



        ParadaRuta parada =
                paradaRutaRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Parada no encontrada"
                                )
                        );



        paradaRutaRepository.delete(parada);


    }


}