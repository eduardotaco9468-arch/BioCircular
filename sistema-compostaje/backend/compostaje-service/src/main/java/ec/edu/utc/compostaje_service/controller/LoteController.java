package ec.edu.utc.compostaje_service.controller;

import ec.edu.utc.compostaje_service.entity.Lote;
import ec.edu.utc.compostaje_service.service.LoteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lotes")
@CrossOrigin
public class LoteController {

    private final LoteService service;

    public LoteController(LoteService service) {
        this.service = service;
    }


    @GetMapping
    public String listar() {

        System.out.println("ENTRO AL CONTROLLER LOTE");

        return "FUNCIONA";

    }


    @GetMapping("/{id}")
    public Lote buscar(@PathVariable Long id) {
        return service.buscar(id);
    }


    @PostMapping
    public Lote guardar(@RequestBody Lote lote) {
        return service.guardar(lote);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}