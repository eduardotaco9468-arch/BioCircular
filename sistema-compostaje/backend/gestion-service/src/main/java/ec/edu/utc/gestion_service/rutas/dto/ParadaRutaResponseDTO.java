package ec.edu.utc.gestion_service.rutas.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;



@Getter
@AllArgsConstructor
public class ParadaRutaResponseDTO {


    private Long id;


    private Integer orden;


    private String direccion;


    private Long rutaId;


    private Long clienteId;


}