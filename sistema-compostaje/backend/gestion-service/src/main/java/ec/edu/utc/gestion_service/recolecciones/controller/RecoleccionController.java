package ec.edu.utc.gestion_service.recolecciones.controller;


import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionRequestDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionUpdateDTO;
import ec.edu.utc.gestion_service.recolecciones.service.RecoleccionService;


import jakarta.validation.Valid;


import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/recolecciones")
@RequiredArgsConstructor
public class RecoleccionController {



    private final RecoleccionService recoleccionService;



    @PostMapping
    public ResponseEntity<RecoleccionResponseDTO> registrar(
            @Valid @RequestBody RecoleccionRequestDTO dto){


        return new ResponseEntity<>(

                recoleccionService.registrar(dto),

                HttpStatus.CREATED

        );


    }





    @GetMapping
    public ResponseEntity<List<RecoleccionResponseDTO>> listar(){


        return ResponseEntity.ok(

                recoleccionService.listar()

        );


    }





    @GetMapping("/{id}")
    public ResponseEntity<RecoleccionResponseDTO> buscarPorId(
            @PathVariable Long id){


        return ResponseEntity.ok(

                recoleccionService.buscarPorId(id)

        );


    }





    @PutMapping("/{id}")
    public ResponseEntity<RecoleccionResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody RecoleccionUpdateDTO dto){


        return ResponseEntity.ok(

                recoleccionService.actualizar(id, dto)

        );


    }





    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<RecoleccionResponseDTO>> buscarPorCliente(
            @PathVariable Long clienteId){


        return ResponseEntity.ok(

                recoleccionService.buscarPorCliente(clienteId)

        );


    }


}