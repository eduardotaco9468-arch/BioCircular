package ec.edu.utc.gestion_service.rutas.entity;


import ec.edu.utc.gestion_service.clientes.entity.Cliente;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "paradas_ruta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParadaRuta {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Integer orden;


    private String direccion;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ruta_id", nullable = false)
    private Ruta ruta;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;


}