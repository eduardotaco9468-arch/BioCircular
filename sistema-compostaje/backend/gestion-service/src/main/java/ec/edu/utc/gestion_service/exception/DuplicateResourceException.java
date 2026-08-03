package ec.edu.utc.gestion_service.exception;

public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String mensaje) {
        super(mensaje);
    }

}