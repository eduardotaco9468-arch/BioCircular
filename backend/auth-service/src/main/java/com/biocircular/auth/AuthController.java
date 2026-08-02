package com.biocircular.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;

record Login(@NotBlank String email, @NotBlank String password) {}
record Token(String accessToken, String tokenType, long expiresIn) {}
record PasswordChange(@NotBlank String currentPassword, @NotBlank @Size(min = 8, max = 128) String newPassword) {}

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final byte[] key;
  private final long expiry;
  private final JdbcTemplate jdbc;

  AuthController(@Value("${app.jwt-secret}") String secret, @Value("${app.jwt-expiration}") long expiry, JdbcTemplate jdbc) {
    this.key = secret.getBytes(StandardCharsets.UTF_8);
    this.expiry = expiry;
    this.jdbc = jdbc;
  }

  @PostMapping("/login")
  ResponseEntity<Token> login(@Valid @RequestBody Login login) {
    List<String> roles = jdbc.query("""
      select r.codigo from usuario u join usuario_rol ur on ur.usuario_id = u.id
      join rol r on r.id = ur.rol_id
      where lower(u.correo) = lower(?) and u.activo and u.contrasena_hash = crypt(?, u.contrasena_hash)
      """, (rs, row) -> rs.getString(1), login.email(), login.password());
    if (roles.isEmpty()) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    String token = Jwts.builder().subject(login.email().toLowerCase()).claim("roles", roles)
      .issuedAt(new Date()).expiration(Date.from(Instant.now().plusMillis(expiry)))
      .signWith(Keys.hmacShaKeyFor(key)).compact();
    return ResponseEntity.ok(new Token(token, "Bearer", expiry));
  }

  @PostMapping("/cambiar-contrasena")
  ResponseEntity<Void> changePassword(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody PasswordChange request) {
    int updated = jdbc.update("""
      update usuario set contrasena_hash = crypt(?, gen_salt('bf'))
      where lower(correo) = lower(?) and activo and contrasena_hash = crypt(?, contrasena_hash)
      """, request.newPassword(), jwt.getSubject(), request.currentPassword());
    return updated == 1 ? ResponseEntity.noContent().build() : ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  @PostMapping("/logout")
  ResponseEntity<Void> logout() { return ResponseEntity.noContent().build(); }
}
