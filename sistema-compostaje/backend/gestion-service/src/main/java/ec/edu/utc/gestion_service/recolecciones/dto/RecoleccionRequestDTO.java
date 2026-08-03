package ec.edu.utc.gestion_service.recolecciones.dto;


import ec.edu.utc.gestion_service.recolecciones.entity.TipoProblema;
import ec.edu.utc.gestion_service.recolecciones.entity.UnidadMedida;


import jakarta.validation.constraints.NotNull;


import lombok.Getter;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;



@Getter
@Setter
public class RecoleccionRequestDTO {


    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;


    private LocalTime horaInicio;


    private LocalTime horaFin;



    @NotNull(message = "El cliente es obligatorio")
    private Long clienteId;



    @NotNull(message = "El contenedor es obligatorio")
    private Long contenedorId;



    @NotNull(message = "La ruta es obligatoria")
    private Long rutaId;



    @NotNull(message = "El peso o cantidad es obligatorio")
    private BigDecimal pesoCantidad;



    @NotNull(message = "La unidad es obligatoria")
    private UnidadMedida unidad;



    private TipoProblema tipoProblema;


    private String observacion;


}