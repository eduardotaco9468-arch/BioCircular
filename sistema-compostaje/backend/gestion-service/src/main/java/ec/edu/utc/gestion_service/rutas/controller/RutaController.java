package ec.edu.utc.gestion_service.rutas.controller;


import ec.edu.utc.gestion_service.rutas.dto.RutaRequestDTO;
import ec.edu.utc.gestion_service.rutas.dto.RutaResponseDTO;
import ec.edu.utc.gestion_service.rutas.dto.RutaUpdateDTO;
import ec.edu.utc.gestion_service.rutas.service.RutaService;


import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/rutas")
@RequiredArgsConstructor
public class RutaController {



    private final RutaService rutaService;



    @PostMapping
    public ResponseEntity<RutaResponseDTO> registrar(
            @Valid @RequestBody RutaRequestDTO dto){


        return new ResponseEntity<>(
                rutaService.registrar(dto),
                HttpStatus.CREATED
        );

    }




    @GetMapping
    public ResponseEntity<List<RutaResponseDTO>> listar(){


        return ResponseEntity.ok(
                rutaService.listar()
        );


    }




    @GetMapping("/{id}")
    public ResponseEntity<RutaResponseDTO> buscarPorId(
            @PathVariable Long id){


        return ResponseEntity.ok(
                rutaService.buscarPorId(id)
        );


    }




    @PutMapping("/{id}")
    public ResponseEntity<RutaResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody RutaUpdateDTO dto){


        return ResponseEntity.ok(
                rutaService.actualizar(id, dto)
        );


    }





    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id){


        rutaService.eliminar(id);


        return ResponseEntity.noContent().build();


    }



}