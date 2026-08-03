package ec.edu.utc.auth_service.dto;

import lombok.Data;

@Data
public class CreateUserRequest {

    private String nombre;

    private String email;

    private String password;

    private String rol;

}