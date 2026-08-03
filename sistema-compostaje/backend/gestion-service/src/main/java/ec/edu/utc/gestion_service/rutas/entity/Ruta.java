package ec.edu.utc.gestion_service.rutas.entity;


import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Table(name = "rutas")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ruta {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String codigo;


    @Column(nullable = false)
    private String nombre;


    private String descripcion;


    @Column(nullable = false)
    private String sector;


    @Column(nullable = false)
    private String direccion;


    @Column(nullable = false)
    private LocalDate fechaProgramada;


    @Column(nullable = false)
    private String horario;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoRuta estado;


    @Column(nullable = false)
    private LocalDateTime fechaCreacion;


    @OneToMany(
            mappedBy = "ruta",
            cascade = CascadeType.ALL
    )
    private List<ParadaRuta> paradas;


}