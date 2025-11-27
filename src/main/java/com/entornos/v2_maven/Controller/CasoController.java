package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Dtos.Request.AsignarCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoClienteRequest;
import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Service.CasoService;
import com.entornos.v2_maven.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/caso")
@CrossOrigin(origins = "http://localhost:3000")
public class CasoController {

    @Autowired
    private CasoService casoService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/crear-caso")
    public ResponseEntity<?> crearCaso(
            @RequestBody CrearCasoClienteRequest crearCasoRequest,
            @RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUserName(token);
        return new ResponseEntity<>(casoService.crearCasoConUsername(crearCasoRequest, username), HttpStatus.CREATED);
    }

    @PutMapping("/asignar")
    public ResponseEntity<?> asignarCaso(@RequestBody AsignarCasoRequest asignarCasoRequest){
        return new ResponseEntity<>(casoService.asignarCaso(asignarCasoRequest), HttpStatus.CREATED);
    }

    @GetMapping("/mis-casos")
    public ResponseEntity<List<Caso>> obtenerMisCasos(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUserName(token);
        List<Caso> casos = casoService.obtenerCasosCliente(username);
        return ResponseEntity.ok(casos);
    }

    @GetMapping("/mis-casos-abogado")
    public ResponseEntity<List<Caso>> obtenerMisCasosAbogado(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String username = jwtUtil.extractUserName(token);
        List<Caso> casos = casoService.obtenerCasosAbogado(username);
        return ResponseEntity.ok(casos);
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Caso>> obtenerTodosCasos() {
        List<Caso> casos = casoService.obtenerTodosCasos();
        return ResponseEntity.ok(casos);
    }

}
