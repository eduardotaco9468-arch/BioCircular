package ec.edu.utc.gestion_service.recolecciones.controller;

import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionRequestDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionResponseDTO;
import ec.edu.utc.gestion_service.recolecciones.dto.RecoleccionUpdateDTO;
import ec.edu.utc.gestion_service.recolecciones.service.RecoleccionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recolecciones")
@RequiredArgsConstructor
public class RecoleccionController {
    private final RecoleccionService recoleccionService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<RecoleccionResponseDTO> registrar(@Valid @RequestBody RecoleccionRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(recoleccionService.registrar(dto));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR', 'CLIENTE')")
    public ResponseEntity<List<RecoleccionResponseDTO>> listar(Authentication authentication) {
        return ResponseEntity.ok(recoleccionService.listar(rol(authentication), authentication.getName()));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR', 'CLIENTE')")
    public ResponseEntity<RecoleccionResponseDTO> buscarPorId(@PathVariable Long id, Authentication authentication) {
        return ResponseEntity.ok(recoleccionService.buscarPorId(id, rol(authentication), authentication.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'OPERADOR')")
    public ResponseEntity<RecoleccionResponseDTO> actualizar(@PathVariable Long id,
                                                               @Valid @RequestBody RecoleccionUpdateDTO dto,
                                                               Authentication authentication) {
        return ResponseEntity.ok(recoleccionService.actualizar(id, dto, rol(authentication)));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        recoleccionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    private String rol(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .findFirst()
                .map(authority -> authority.getAuthority().replace("ROLE_", ""))
                .orElseThrow();
    }
}
