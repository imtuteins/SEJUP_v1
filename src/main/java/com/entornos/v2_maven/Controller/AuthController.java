package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Dtos.LoginUserDto;
import com.entornos.v2_maven.Dtos.NewUsuarioDto;
import com.entornos.v2_maven.Entity.Rol;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Enums.RoleList;
import com.entornos.v2_maven.Repository.RolRepository;
import com.entornos.v2_maven.Repository.UsuarioRepository;
import com.entornos.v2_maven.Service.AuthService;
import com.entornos.v2_maven.jwt.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Valid @RequestBody LoginUserDto loginUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Revise sus credenciales");
        }

        try {
            String jwt = authService.authenticate(loginUserDto.getUsername(), loginUserDto.getPassword());
            return ResponseEntity.ok(jwt);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario o contraseña incorrectos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody NewUsuarioDto newUserDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()){
            return ResponseEntity.badRequest().body("Revise los campos");
        }
        try {
            authService.registerUser(newUserDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("Registrado");
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/check-auth")
    public ResponseEntity<String> checkAuth(){
        return ResponseEntity.ok().body("Autenticado");
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        String tokenGoogle = request.get("tokenGoogle");

        try {
            // Verificar el token con Google
            String googleApiUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + tokenGoogle;
            URL url = new URL(googleApiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuilder content = new StringBuilder();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();

            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> googleData = mapper.readValue(content.toString(), Map.class);

            String email = (String) googleData.get("email");
            String name = (String) googleData.get("name");

            //  Buscar usuario o crear uno nuevo
            Optional<Usuario> existingUser = usuarioRepository.findByUsername(email);
            Usuario usuario;

            if (existingUser.isPresent()) {
                usuario = existingUser.get();
            } else {
                usuario = new Usuario();
                usuario.setUsername(email);
                usuario.setPassword("GOOGLE_USER"); // marcador
                Rol rolCliente = rolRepository.findByName(RoleList.ROLE_CLIENTE)
                        .orElseThrow(() -> new RuntimeException("Rol CLIENTE no encontrado"));
                usuario.setRol(rolCliente);
                usuarioRepository.save(usuario);
            }


            String jwt = jwtUtil.generateTokenFromUsername(usuario.getUsername());

            Map<String, Object> response = new HashMap<>();
            response.put("jwt", jwt);
            response.put("email", email);
            response.put("nombre", name);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token inválido o error en Google login");
        }
    }

}
