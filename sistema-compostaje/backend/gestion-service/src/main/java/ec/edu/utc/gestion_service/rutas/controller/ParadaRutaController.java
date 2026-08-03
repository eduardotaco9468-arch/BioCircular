package ec.edu.utc.gestion_service.rutas.controller;


import ec.edu.utc.gestion_service.rutas.dto.ParadaRutaRequestDTO;
import ec.edu.utc.gestion_service.rutas.dto.ParadaRutaResponseDTO;
import ec.edu.utc.gestion_service.rutas.service.ParadaRutaService;


import jakarta.validation.Valid;


import lombok.RequiredArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import org.springframework.web.bind.annotation.*;


import java.util.List;



@RestController
@RequestMapping("/rutas")
@RequiredArgsConstructor
public class ParadaRutaController {



    private final ParadaRutaService paradaRutaService;




    @PostMapping("/{rutaId}/paradas")
    public ResponseEntity<ParadaRutaResponseDTO> registrar(
            @PathVariable Long rutaId,
            @Valid @RequestBody ParadaRutaRequestDTO dto){


        return new ResponseEntity<>(

                paradaRutaService.registrar(
                        rutaId,
                        dto
                ),

                HttpStatus.CREATED
        );


    }





    @GetMapping("/{rutaId}/paradas")
    public ResponseEntity<List<ParadaRutaResponseDTO>> listar(
            @PathVariable Long rutaId){


        return ResponseEntity.ok(

                paradaRutaService.listarPorRuta(
                        rutaId
                )

        );


    }





    @DeleteMapping("/paradas/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id){


        paradaRutaService.eliminar(id);


        return ResponseEntity.noContent().build();


    }


}