package ec.edu.utc.auth_service.service;

import ec.edu.utc.auth_service.dto.ClienteRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import ec.edu.utc.auth_service.dto.ClienteResponseDTO;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import ec.edu.utc.auth_service.dto.EstadoUpdateRequest;
@Component
public class ClienteGestionClient {

    private final RestTemplate restTemplate;
    @Value("${gestion.service.url}")
    private String gestionServiceUrl;

    public ClienteGestionClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void crearCliente(ClienteRequestDTO dto) {
        String url = gestionServiceUrl + "/clientes";
        try {
            ResponseEntity<Void> response = restTemplate.postForEntity(url, dto, Void.class);
            // Optionally log success
        } catch (Exception e) {
            throw new RuntimeException(
                "Error creando cliente en gestion-service: "
                + e.getMessage()
            );
        }
    }
    public ClienteResponseDTO getClientByEmail(String email) {
        String url = gestionServiceUrl + "/clientes/correo/" + email;
        try {
            ResponseEntity<ClienteResponseDTO> response = restTemplate.getForEntity(url, ClienteResponseDTO.class);
            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException(
                "Error obteniendo cliente por email desde gestion-service: " + e.getMessage(),
                e);
        }
    }

    public void updateClientEstado(Long id, boolean estado) {
        String url = gestionServiceUrl + "/clientes/" + id + "/estado";
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            EstadoUpdateRequest body = new EstadoUpdateRequest();
            body.setEstado(estado);
            HttpEntity<EstadoUpdateRequest> entity = new HttpEntity<>(body, headers);
            ResponseEntity<Void> response = restTemplate.exchange(url, HttpMethod.PUT, entity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException(
                "Error actualizando estado de cliente en gestion-service: " + e.getMessage(),
                e);
        }
    }

}



