package ec.edu.utc.gestion_service.clientes.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum TipoCliente {
    RESIDENCIAL,
    COMERCIAL
    ;
    @JsonCreator
    public static TipoCliente fromString(String value) {
        if (value == null) {
            return null;
        }
        return TipoCliente.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toJson() {
        return name();
    }
}
