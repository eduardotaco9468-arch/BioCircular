package ec.edu.utc.compostaje_service.controller;

import ec.edu.utc.compostaje_service.entity.Observacion;
import ec.edu.utc.compostaje_service.service.ObservacionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/observaciones")
@CrossOrigin
public class ObservacionController {


    private final ObservacionService service;


    public ObservacionController(ObservacionService service) {
        this.service = service;
    }


    @GetMapping
    public List<Observacion> listar() {
        return service.listar();
    }


    @GetMapping("/{id}")
    public Observacion buscar(@PathVariable Long id) {
        return service.buscar(id);
    }


    @PostMapping
    public Observacion guardar(@RequestBody Observacion observacion) {
        return service.guardar(observacion);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}