package ec.edu.utc.gestion_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;


@Service
public class JwtService {


    @Value("${jwt.secret}")
    private String secret;



    private SecretKey getSigningKey(){

        return Keys.hmacShaKeyFor(
                secret.getBytes()
        );

    }



    public String extractUsername(String token){


        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(getSigningKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();


        return claims.getSubject();

    }



    public String extractRole(String token){


        Claims claims =
                Jwts.parserBuilder()
                        .setSigningKey(getSigningKey())
                        .build()
                        .parseClaimsJws(token)
                        .getBody();


        return claims.get(
                "rol",
                String.class
        );

    }



    public boolean isValidToken(String token){

        try {

            extractUsername(token);
            return true;


        }catch(Exception e){

            return false;

        }

    }

}