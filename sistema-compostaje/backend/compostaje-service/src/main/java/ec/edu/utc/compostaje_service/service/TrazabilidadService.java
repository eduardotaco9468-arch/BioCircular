package ec.edu.utc.compostaje_service.service;

import ec.edu.utc.compostaje_service.entity.Trazabilidad;
import ec.edu.utc.compostaje_service.repository.TrazabilidadRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrazabilidadService {


    private final TrazabilidadRepository repository;


    public TrazabilidadService(TrazabilidadRepository repository){
        this.repository = repository;
    }


    public List<Trazabilidad> listar(){
        return repository.findAll();
    }

    public List<Trazabilidad> buscarPorLote(Long loteId){
        return repository.findByLoteId(loteId);
    }


    public Trazabilidad guardar(Trazabilidad trazabilidad){
        return repository.save(trazabilidad);
    }


    public Trazabilidad buscar(Long id){
        return repository.findById(id).orElse(null);
    }

}