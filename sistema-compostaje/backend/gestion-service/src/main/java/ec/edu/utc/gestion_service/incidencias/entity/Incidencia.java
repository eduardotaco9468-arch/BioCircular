package ec.edu.utc.gestion_service.incidencias.entity;

import ec.edu.utc.gestion_service.recolecciones.entity.Recoleccion;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;


import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "incidencias")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;

    @Column(nullable = false, length = 150)
    private String titulo;

    @Column(nullable = false, length = 1000)
    private String descripcion;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoIncidencia tipoIncidencia;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoIncidencia estado;

    private LocalDate fechaResolucion;

    @Column(name = "responsable_id")
    private Long responsableId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recoleccion_id", nullable = false)
    private Recoleccion recoleccion;

}