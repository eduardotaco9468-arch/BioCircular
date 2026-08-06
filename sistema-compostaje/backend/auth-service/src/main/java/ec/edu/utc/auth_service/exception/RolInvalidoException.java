package ec.edu.utc.auth_service.exception;

public class RolInvalidoException extends RuntimeException {
    public RolInvalidoException() {
        super("Rol inválido");
    }
}
