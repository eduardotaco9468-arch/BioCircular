package ec.edu.utc.gestion_service.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private String mensaje;

    private Integer codigo;

    private LocalDateTime fecha;

}