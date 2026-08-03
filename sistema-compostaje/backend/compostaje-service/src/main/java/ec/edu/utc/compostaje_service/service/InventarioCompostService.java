package ec.edu.utc.compostaje_service.service;

import ec.edu.utc.compostaje_service.entity.InventarioCompost;
import ec.edu.utc.compostaje_service.repository.InventarioCompostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventarioCompostService {

    private final InventarioCompostRepository repository;


    public InventarioCompostService(InventarioCompostRepository repository) {
        this.repository = repository;
    }


    public List<InventarioCompost> listar() {
        return repository.findAll();
    }


    public InventarioCompost guardar(InventarioCompost inventario) {
        return repository.save(inventario);
    }


    public InventarioCompost buscar(Long id) {
        return repository.findById(id).orElse(null);
    }


    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}