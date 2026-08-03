package ec.edu.utc.gestion_service.recolecciones.entity;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;
import ec.edu.utc.gestion_service.contenedores.entity.Contenedor;
import ec.edu.utc.gestion_service.rutas.entity.Ruta;


import jakarta.persistence.*;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;



@Entity
@Table(name = "recolecciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recoleccion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private LocalDate fecha;


    private LocalTime horaInicio;


    private LocalTime horaFin;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoRecoleccion estado;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contenedor_id", nullable = false)
    private Contenedor contenedor;



    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ruta_id", nullable = false)
    private Ruta ruta;




    @Column(nullable = false)
    private BigDecimal pesoCantidad;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UnidadMedida unidad;



    @Enumerated(EnumType.STRING)
    private TipoProblema tipoProblema;



    private String observacion;


}