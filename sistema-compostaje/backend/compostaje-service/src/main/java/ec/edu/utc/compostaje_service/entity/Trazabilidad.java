package ec.edu.utc.compostaje_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "trazabilidad")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Trazabilidad {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne
    @JoinColumn(name = "lote_id")
    private Lote lote;


    private String evento;


    private String descripcion;


    private LocalDate fecha;

}