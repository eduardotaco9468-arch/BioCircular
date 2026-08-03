package ec.edu.utc.compostaje_service.service;

import ec.edu.utc.compostaje_service.entity.Observacion;
import ec.edu.utc.compostaje_service.repository.ObservacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObservacionService {

    private final ObservacionRepository repository;


    public ObservacionService(ObservacionRepository repository) {
        this.repository = repository;
    }


    public List<Observacion> listar() {
        return repository.findAll();
    }


    public Observacion guardar(Observacion observacion) {
        return repository.save(observacion);
    }


    public Observacion buscar(Long id) {
        return repository.findById(id).orElse(null);
    }


    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}