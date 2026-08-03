package ec.edu.utc.gestion_service.incidencias.controller;

import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaRequestDTO;
import ec.edu.utc.gestion_service.incidencias.dto.IncidenciaResponseDTO;
import ec.edu.utc.gestion_service.incidencias.service.IncidenciaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/incidencias")
@RequiredArgsConstructor
public class IncidenciaController {


    private final IncidenciaService incidenciaService;


    @PostMapping
    public ResponseEntity<IncidenciaResponseDTO> crear(
            @Valid @RequestBody IncidenciaRequestDTO dto
    ){

        return new ResponseEntity<>(
                incidenciaService.crear(dto),
                HttpStatus.CREATED
        );

    }


    @GetMapping
    public ResponseEntity<List<IncidenciaResponseDTO>> listar(){

        return ResponseEntity.ok(
                incidenciaService.listar()
        );

    }


    @GetMapping("/{id}")
    public ResponseEntity<IncidenciaResponseDTO> buscarPorId(
            @PathVariable Long id
    ){

        return ResponseEntity.ok(
                incidenciaService.obtenerPorId(id)
        );

    }


    @PutMapping("/{id}")
    public ResponseEntity<IncidenciaResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody IncidenciaRequestDTO dto
    ){

        return ResponseEntity.ok(
                incidenciaService.actualizar(id, dto)
        );

    }

}