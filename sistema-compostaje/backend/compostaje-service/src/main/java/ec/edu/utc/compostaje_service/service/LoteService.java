package ec.edu.utc.compostaje_service.service;

import ec.edu.utc.compostaje_service.entity.Lote;
import ec.edu.utc.compostaje_service.repository.LoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoteService {


    private final LoteRepository repository;


    public LoteService(LoteRepository repository){
        this.repository = repository;
    }


    public List<Lote> listar(){
        return repository.findAll();
    }


    public Lote guardar(Lote lote){
        return repository.save(lote);
    }


    public Lote buscar(Long id){
        return repository.findById(id).orElse(null);
    }


    public void eliminar(Long id){
        repository.deleteById(id);
    }
}