package ec.edu.utc.compostaje_service.controller;

import ec.edu.utc.compostaje_service.entity.InventarioCompost;
import ec.edu.utc.compostaje_service.service.InventarioCompostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventario")
@CrossOrigin
public class InventarioCompostController {


    private final InventarioCompostService service;


    public InventarioCompostController(InventarioCompostService service) {
        this.service = service;
    }


    @GetMapping
    public List<InventarioCompost> listar() {
        return service.listar();
    }


    @GetMapping("/{id}")
    public InventarioCompost buscar(@PathVariable Long id) {
        return service.buscar(id);
    }


    @PostMapping
    public InventarioCompost guardar(@RequestBody InventarioCompost inventario) {
        return service.guardar(inventario);
    }


    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}