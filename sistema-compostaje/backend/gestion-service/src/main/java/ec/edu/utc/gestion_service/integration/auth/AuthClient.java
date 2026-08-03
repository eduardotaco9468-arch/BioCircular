package ec.edu.utc.gestion_service.integration.auth;


import ec.edu.utc.gestion_service.security.FeignClientInterceptor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@FeignClient(
        name = "auth-service",
        url = "http://auth-service:8081",
        configuration = FeignClientInterceptor.class
)
public interface AuthClient {


    @GetMapping("/auth/users/{id}")
    UsuarioAuthDTO buscarUsuario(
            @PathVariable("id") Long id
    );

}