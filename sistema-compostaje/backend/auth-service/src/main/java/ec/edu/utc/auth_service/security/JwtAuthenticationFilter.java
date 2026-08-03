package ec.edu.utc.auth_service.security;

import ec.edu.utc.auth_service.service.JwtService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {


    private final JwtService jwtService;


    public JwtAuthenticationFilter(
            JwtService jwtService
    ){

        this.jwtService = jwtService;

    }



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        String header =
                request.getHeader("Authorization");



        if(header == null || !header.startsWith("Bearer ")){

            filterChain.doFilter(request,response);
            return;

        }



        String token =
                header.substring(7);



        try {


            String email =
                    jwtService.extractEmail(token);



            String rol =
                    jwtService.extractRole(token);



            UsernamePasswordAuthenticationToken authentication =

                    new UsernamePasswordAuthenticationToken(

                            email,

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



        }catch(Exception e){

            System.out.println("Token inválido");

        }



        filterChain.doFilter(request,response);


    }

}