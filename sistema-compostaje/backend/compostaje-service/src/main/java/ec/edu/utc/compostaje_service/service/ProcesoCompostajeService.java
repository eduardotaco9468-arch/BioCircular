package ec.edu.utc.compostaje_service.service;

import ec.edu.utc.compostaje_service.entity.ProcesoCompostaje;
import ec.edu.utc.compostaje_service.entity.Trazabilidad;
import ec.edu.utc.compostaje_service.repository.ProcesoCompostajeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ProcesoCompostajeService {


    private final ProcesoCompostajeRepository repository;

    private final TrazabilidadService trazabilidadService;


    public ProcesoCompostajeService(
            ProcesoCompostajeRepository repository,
            TrazabilidadService trazabilidadService
    ){
        this.repository = repository;
        this.trazabilidadService = trazabilidadService;
    }


    public List<ProcesoCompostaje> listar(){
        return repository.findAll();
    }


    public ProcesoCompostaje guardar(ProcesoCompostaje proceso){

        ProcesoCompostaje guardado = repository.save(proceso);


        Trazabilidad trazabilidad = new Trazabilidad();

        trazabilidad.setLote(proceso.getLote());
        trazabilidad.setEvento("PROCESO_COMPOSTAJE");
        trazabilidad.setDescripcion(
                "El lote ingresó a etapa: "
                        + proceso.getEtapa()
        );
        trazabilidad.setFecha(LocalDate.now());


        trazabilidadService.guardar(trazabilidad);


        return guardado;
    }


    public ProcesoCompostaje buscar(Long id){
        return repository.findById(id).orElse(null);
    }


    public void eliminar(Long id){
        repository.deleteById(id);
    }
}