package ec.edu.utc.gestion_service.clientes.dto;

import ec.edu.utc.gestion_service.clientes.entity.TipoCliente;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClienteResponseDTO {

    private Long id;
    private TipoCliente tipoCliente;
    private String nombre;
    private String identificacion;
    private String correo;
    private String telefono;
    private String direccion;
    private String sector;
    private Boolean estado;
    private LocalDateTime fechaRegistro;
}