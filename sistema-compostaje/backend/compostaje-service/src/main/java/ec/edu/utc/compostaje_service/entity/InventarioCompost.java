package ec.edu.utc.compostaje_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name="inventario_compost")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventarioCompost {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String codigoProducto;


    private Double cantidadKg;


    private LocalDate fechaProduccion;


    private String estado;
}