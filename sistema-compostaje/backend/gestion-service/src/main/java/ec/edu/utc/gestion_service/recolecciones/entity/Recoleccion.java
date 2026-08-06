package ec.edu.utc.gestion_service.recolecciones.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "gestion_recolecciones")
@Getter
@Setter
@NoArgsConstructor
public class Recoleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long clienteId;

    private Long operadorId;

    private Long vehiculoId;

    @Column(nullable = false)
    private LocalDateTime fechaProgramada;

    private LocalDateTime fechaRealizada;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoRecoleccion estado;

    @Column(precision = 12, scale = 2)
    private BigDecimal pesoRecolectado;

    @Column(length = 20)
    private String unidad;

    @Column(length = 1000)
    private String observaciones;
}
