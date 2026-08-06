package ec.edu.utc.auth_service.exception;

public class CorreoDuplicadoException extends RuntimeException {
    public CorreoDuplicadoException() {
        super("El correo ya existe");
    }
}
