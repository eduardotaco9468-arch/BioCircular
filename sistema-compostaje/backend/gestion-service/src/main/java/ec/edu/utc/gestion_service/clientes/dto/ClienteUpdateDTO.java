package ec.edu.utc.gestion_service.clientes.dto;

import ec.edu.utc.gestion_service.clientes.entity.TipoCliente;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteUpdateDTO {

    @NotNull
    private TipoCliente tipoCliente;

    @NotBlank
    @Size(max = 150)
    private String nombre;

    @NotBlank
    @Email
    private String correo;

    @NotBlank
    @Size(max = 15)
    private String telefono;

    @NotBlank
    private String direccion;

    @NotBlank
    private String sector;

    @NotNull
    private Boolean estado;
}