package ec.edu.utc.gestion_service.clientes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "clientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoCliente tipoCliente;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, unique = true, length = 13)
    private String identificacion;

    @Column(nullable = false, unique = true, length = 100)
    private String correo;

    @Column(nullable = false, length = 15)
    private String telefono;

    @Column(nullable = false, length = 255)
    private String direccion;

    @Column(nullable = false, length = 100)
    private String sector;

    @Column(nullable = false)
    private Boolean estado;

    @Column(nullable = false)
    private LocalDateTime fechaRegistro;
}