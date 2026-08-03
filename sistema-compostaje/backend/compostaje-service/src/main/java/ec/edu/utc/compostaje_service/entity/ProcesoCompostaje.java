package ec.edu.utc.compostaje_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "procesos_compostaje")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProcesoCompostaje {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote;


    private String etapa;

    private LocalDate fechaInicio;

    private LocalDate fechaFin;

    private String responsable;

    private String observacion;
}