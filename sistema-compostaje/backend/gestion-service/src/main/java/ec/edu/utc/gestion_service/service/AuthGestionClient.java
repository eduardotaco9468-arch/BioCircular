package ec.edu.utc.gestion_service.service;

import ec.edu.utc.gestion_service.clientes.dto.ClienteRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.HttpEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
public class AuthGestionClient {

    private final RestTemplate restTemplate;
    @Value("${auth.service.url}")
    private String authServiceUrl;

    public AuthGestionClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void crearUsuarioDesdeCliente(ClienteRequestDTO dto) {
        String url = authServiceUrl + "/auth/internal/create-client-user";
        try {
            // We need to map ClienteRequestDTO to CreateUserRequest
            // CreateUserRequest has nombre, email, password, rol
            // We will set password as "Temporal123" and rol as "CLIENTE"
            var request = new org.springframework.util.LinkedMultiValueMap<String, String>();
            request.add("nombre", dto.getNombre());
            request.add("email", dto.getCorreo());
            request.add("password", "Temporal123");
            request.add("rol", "CLIENTE");
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(request, headers);
            ResponseEntity<Void> response = restTemplate.postForEntity(url, entity, Void.class);
        } catch (Exception e) {
            System.err.println("Error creando usuario en auth-service: " + e.getMessage());
        }
    }
}


