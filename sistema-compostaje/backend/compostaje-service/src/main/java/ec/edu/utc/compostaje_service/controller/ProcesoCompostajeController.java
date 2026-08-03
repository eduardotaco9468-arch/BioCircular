package ec.edu.utc.compostaje_service.controller;

import ec.edu.utc.compostaje_service.entity.ProcesoCompostaje;
import ec.edu.utc.compostaje_service.service.ProcesoCompostajeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/procesos")
@CrossOrigin
public class ProcesoCompostajeController {


    private final ProcesoCompostajeService service;


    public ProcesoCompostajeController(ProcesoCompostajeService service) {
        this.service = service;
    }


    @GetMapping
    public List<ProcesoCompostaje> listar() {
        return service.listar();
    }


    @GetMapping("/{id}")
    public ProcesoCompostaje buscar(@PathVariable Long id) {
        return service.buscar(id);
    }


    @PostMapping
    public ProcesoCompostaje guardar(@RequestBody ProcesoCompostaje proceso) {
        return service.guardar(proceso);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}