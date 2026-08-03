package ec.edu.utc.gestion_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;


@SpringBootApplication
@EnableFeignClients
public class GestionServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(
				GestionServiceApplication.class,
				args
		);

	}

}