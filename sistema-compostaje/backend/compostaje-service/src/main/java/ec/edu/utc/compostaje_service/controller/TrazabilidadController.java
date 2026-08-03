package ec.edu.utc.compostaje_service.controller;


import ec.edu.utc.compostaje_service.entity.Trazabilidad;
import ec.edu.utc.compostaje_service.service.TrazabilidadService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/trazabilidad")
@CrossOrigin
public class TrazabilidadController {


    private final TrazabilidadService service;


    public TrazabilidadController(TrazabilidadService service){
        this.service = service;
    }


    @GetMapping
    public List<Trazabilidad> listar(){
        return service.listar();
    }


    @GetMapping("/{id}")
    public Trazabilidad buscar(@PathVariable Long id){
        return service.buscar(id);
    }
    @GetMapping("/lote/{id}")
    public List<Trazabilidad> buscarPorLote(
            @PathVariable Long id
    ){
        return service.buscarPorLote(id);
    }


    @PostMapping
    public Trazabilidad guardar(@RequestBody Trazabilidad trazabilidad){
        return service.guardar(trazabilidad);
    }

}