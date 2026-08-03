package ec.edu.utc.gestion_service.recolecciones.dto;


import ec.edu.utc.gestion_service.recolecciones.entity.EstadoRecoleccion;
import ec.edu.utc.gestion_service.recolecciones.entity.TipoProblema;
import ec.edu.utc.gestion_service.recolecciones.entity.UnidadMedida;


import lombok.AllArgsConstructor;
import lombok.Getter;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;



@Getter
@AllArgsConstructor
public class RecoleccionResponseDTO {


    private Long id;


    private LocalDate fecha;


    private LocalTime horaInicio;


    private LocalTime horaFin;


    private EstadoRecoleccion estado;


    private Long clienteId;


    private Long contenedorId;


    private Long rutaId;


    private BigDecimal pesoCantidad;


    private UnidadMedida unidad;


    private TipoProblema tipoProblema;


    private String observacion;


}