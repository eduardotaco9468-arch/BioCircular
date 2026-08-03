package ec.edu.utc.auth_service.dto;

import lombok.Getter;
import lombok.Builder;
import lombok.AllArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class UsuarioResponse {

    private Long id;

    private String nombre;

    private String email;

    private String rol;

}