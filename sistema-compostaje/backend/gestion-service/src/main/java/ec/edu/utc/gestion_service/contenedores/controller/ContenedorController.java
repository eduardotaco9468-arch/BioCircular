package ec.edu.utc.gestion_service.contenedores.controller;


import ec.edu.utc.gestion_service.contenedores.dto.ContenedorRequestDTO;
import ec.edu.utc.gestion_service.contenedores.dto.ContenedorResponseDTO;
import ec.edu.utc.gestion_service.contenedores.dto.ContenedorUpdateDTO;
import ec.edu.utc.gestion_service.contenedores.service.ContenedorService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/contenedores")
@RequiredArgsConstructor
public class ContenedorController {


    private final ContenedorService contenedorService;


    @PostMapping
    public ResponseEntity<ContenedorResponseDTO> registrar(
            @Valid @RequestBody ContenedorRequestDTO dto){

        return new ResponseEntity<>(
                contenedorService.registrar(dto),
                HttpStatus.CREATED
        );

    }



    @GetMapping
    public ResponseEntity<List<ContenedorResponseDTO>> listar(){

        return ResponseEntity.ok(
                contenedorService.listar()
        );

    }



    @GetMapping("/{id}")
    public ResponseEntity<ContenedorResponseDTO> buscarPorId(
            @PathVariable Long id){

        return ResponseEntity.ok(
                contenedorService.buscarPorId(id)
        );

    }



    @PutMapping("/{id}")
    public ResponseEntity<ContenedorResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ContenedorUpdateDTO dto){

        return ResponseEntity.ok(
                contenedorService.actualizar(id, dto)
        );

    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> retirar(
            @PathVariable Long id){

        contenedorService.eliminar(id);

        return ResponseEntity.noContent().build();

    }


}