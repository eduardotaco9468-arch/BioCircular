package ec.edu.utc.gestion_service.contenedores.entity;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;


@Entity
@Table(name = "contenedores")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contenedor {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private String codigo;


    @Column(nullable = false)
    private Integer capacidad;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoContenedor estado;


    @Column(nullable = false)
    private LocalDate fechaInstalacion;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;


}