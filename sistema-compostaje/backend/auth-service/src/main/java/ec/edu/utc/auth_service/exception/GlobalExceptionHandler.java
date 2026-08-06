package ec.edu.utc.auth_service.exception;

import ec.edu.utc.auth_service.dto.MensajeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsuarioNoEncontradoException.class)
    public ResponseEntity<MensajeResponse> manejarUsuarioNoEncontrado(UsuarioNoEncontradoException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MensajeResponse(exception.getMessage()));
    }

    @ExceptionHandler(CorreoDuplicadoException.class)
    public ResponseEntity<MensajeResponse> manejarCorreoDuplicado(CorreoDuplicadoException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(new MensajeResponse(exception.getMessage()));
    }

    @ExceptionHandler(RolInvalidoException.class)
    public ResponseEntity<MensajeResponse> manejarRolInvalido(RolInvalidoException exception) {
        return ResponseEntity.badRequest().body(new MensajeResponse(exception.getMessage()));
    }
}
