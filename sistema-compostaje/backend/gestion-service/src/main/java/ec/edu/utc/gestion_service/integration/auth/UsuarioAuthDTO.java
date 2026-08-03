package ec.edu.utc.gestion_service.integration.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioAuthDTO {

    private Long id;

    private String nombre;

    private String email;

    private String rol;

}