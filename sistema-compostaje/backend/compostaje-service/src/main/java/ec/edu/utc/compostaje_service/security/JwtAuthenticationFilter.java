package ec.edu.utc.compostaje_service.security;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.List;


@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("ENTRO AL FILTRO JWT");


        String authHeader = request.getHeader("Authorization");


        if(authHeader != null && authHeader.startsWith("Bearer ")) {


            String token = authHeader.substring(7);


            if(jwtService.isValidToken(token)) {


                String username = jwtService.extractUsername(token);


                String rol = jwtService.extractRole(token);
                System.out.println("ROL RECIBIDO: " + rol);



                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                List.of(
                                        new SimpleGrantedAuthority(
                                                "ROLE_" + rol
                                        )
                                )
                        );


                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

            }

        }


        filterChain.doFilter(request,response);

    }

}