package ec.edu.utc.compostaje_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="observaciones")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Observacion {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name="lote_id")
    private Lote lote;


    private LocalDate fecha;


    private String descripcion;
}