package ec.edu.utc.auth_service.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ClienteRequestDTO {

    @NotBlank
    private String nombre;

    @NotNull
    private String tipoCliente;

    @NotBlank
    @Size(max = 13)
    private String identificacion;

    @NotBlank
    @Email
    @Size(max = 100)
    private String correo;

    @NotBlank
    @Size(max = 15)
    private String telefono;

    @NotBlank
    @Size(max = 255)
    private String direccion;

    @NotBlank
    @Size(max = 100)
    private String sector;

    private Boolean estado;
}
