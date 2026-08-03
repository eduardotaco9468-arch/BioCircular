package ec.edu.utc.gestion_service.rutas.dto;


import ec.edu.utc.gestion_service.rutas.entity.EstadoRuta;

import lombok.AllArgsConstructor;
import lombok.Getter;


import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class RutaResponseDTO {


    private Long id;

    private String codigo;

    private String nombre;

    private String descripcion;

    private String sector;

    private String direccion;

    private LocalDate fechaProgramada;

    private String horario;

    private EstadoRuta estado;

    private LocalDateTime fechaCreacion;


}