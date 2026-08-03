package ec.edu.utc.gestion_service.contenedores.dto;


import ec.edu.utc.gestion_service.contenedores.entity.EstadoContenedor;

import lombok.AllArgsConstructor;
import lombok.Getter;


import java.time.LocalDate;


@Getter
@AllArgsConstructor
public class ContenedorResponseDTO {


    private Long id;

    private String codigo;

    private Integer capacidad;

    private EstadoContenedor estado;

    private LocalDate fechaInstalacion;

    private Long clienteId;


}