package ec.edu.utc.gestion_service.security;


import feign.RequestInterceptor;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;


@Configuration
public class FeignClientInterceptor {


    @Bean
    public RequestInterceptor requestInterceptor(){


        return template -> {


            ServletRequestAttributes attributes =
                    (ServletRequestAttributes)
                            RequestContextHolder.getRequestAttributes();


            if(attributes != null){


                HttpServletRequest request =
                        attributes.getRequest();


                String authorization =
                        request.getHeader("Authorization");


                if(authorization != null){


                    template.header(
                            "Authorization",
                            authorization
                    );

                }

            }


        };


    }

}