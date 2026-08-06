package ec.edu.utc.gestion_service.clientes.controller;

import ec.edu.utc.gestion_service.clientes.dto.ClienteRequestDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteResponseDTO;
import ec.edu.utc.gestion_service.clientes.dto.ClienteUpdateDTO;
import ec.edu.utc.gestion_service.clientes.service.ClienteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import ec.edu.utc.gestion_service.exception.ResourceNotFoundException;


@RestController
@RequestMapping("/clientes")
@RequiredArgsConstructor
public class ClienteController {


    private final ClienteService clienteService;


    @PostMapping
    public ResponseEntity<ClienteResponseDTO> registrar(
            @Valid @RequestBody ClienteRequestDTO dto) {

        return new ResponseEntity<>(
                clienteService.registrar(dto),
                HttpStatus.CREATED
        );
    }


    @GetMapping
    public ResponseEntity<List<ClienteResponseDTO>> listar() {

        return ResponseEntity.ok(
                clienteService.listar()
        );
    }


    @GetMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                clienteService.buscarPorId(id)
        );
    }


    
    @GetMapping("/identificacion/{identificacion}")
    public ResponseEntity<ClienteResponseDTO> buscarPorIdentificacion(@PathVariable String identificacion) {
        return ResponseEntity.ok(clienteService.buscarPorIdentificacion(identificacion));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ClienteUpdateDTO dto) {

        return ResponseEntity.ok(
                clienteService.actualizar(id, dto)
        );
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desactivar(
            @PathVariable Long id) {

        clienteService.desactivar(id);

        return ResponseEntity.noContent().build();
    }

}

