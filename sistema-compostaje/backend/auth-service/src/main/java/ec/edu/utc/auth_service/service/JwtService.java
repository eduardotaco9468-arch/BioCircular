package ec.edu.utc.auth_service.service;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ec.edu.utc.auth_service.entity.Usuario;
import java.security.Key;
import java.util.Date;


@Service
public class JwtService {


    private final Key secretKey;

    private final long expiration;



    public JwtService(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration
    ){

        this.secretKey =
                Keys.hmacShaKeyFor(
                        secret.getBytes()
                );

        this.expiration = expiration;

    }

    public String extractRole(String token){

        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .get("rol", String.class);

    }



    public String generateToken(Usuario usuario){

        return Jwts.builder()
                .setSubject(usuario.getEmail())

                .claim(
                        "rol",
                        usuario.getRol().getNombre().name()
                )

                .setIssuedAt(new Date())

                .setExpiration(
                        new Date(
                                System.currentTimeMillis() + expiration
                        )
                )

                .signWith(
                        secretKey,
                        SignatureAlgorithm.HS256
                )

                .compact();

    }



    public String extractEmail(String token){


        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(secretKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();


        return claims.getSubject();

    }

}