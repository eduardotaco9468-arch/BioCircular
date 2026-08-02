package com.biocircular.reportes.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate; import org.springframework.security.core.context.SecurityContextHolder; import org.springframework.security.oauth2.jwt.Jwt;

@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        RestTemplate template=new RestTemplate();
        template.getInterceptors().add((request,body,execution)->{Object credentials=SecurityContextHolder.getContext().getAuthentication()==null?null:SecurityContextHolder.getContext().getAuthentication().getCredentials();if(credentials instanceof Jwt jwt)request.getHeaders().setBearerAuth(jwt.getTokenValue());return execution.execute(request,body);});
        return template;
    }
}
