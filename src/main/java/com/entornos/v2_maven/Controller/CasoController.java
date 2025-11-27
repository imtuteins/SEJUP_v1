package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Dtos.Request.AsignarCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoRequest;
import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Service.ArchivoService;
import com.entornos.v2_maven.Service.CasoService;
import com.entornos.v2_maven.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/caso")
public class CasoController {

    @Autowired
    private CasoService casoService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ArchivoService archivoService;

    @PostMapping("/crear-caso")
    public ResponseEntity<?> crearCaso(@RequestBody CrearCasoRequest crearCasoRequest) {
        return new ResponseEntity<>(casoService.crearCaso(crearCasoRequest), HttpStatus.CREATED);
    }

    @PutMapping("/asignar")
    public ResponseEntity<?> asignarCaso(@RequestBody AsignarCasoRequest asignarCasoRequest) {
        return new ResponseEntity<>(casoService.asignarCaso(asignarCasoRequest), HttpStatus.CREATED);
    }

    @GetMapping("/todos")
    public ResponseEntity<?> listarTodosLosCasos() {
        return ResponseEntity.ok(casoService.findAll());
    }

    @GetMapping("/mis-casos")
    public ResponseEntity<?> listarMisCasos() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails) principal).getUsername();
        Usuario usuario = usuarioService.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return ResponseEntity.ok(casoService.encontrarCasos(usuario.getId()));
    }

    @PutMapping("/{idCaso}/desasignar-abogado")
    public ResponseEntity<?> desasignarAbogado(@PathVariable Long idCaso) {
        return ResponseEntity.ok(casoService.desasignarAbogado(idCaso));
    }

    @PutMapping("/{idCaso}/asignar-cliente/{idCliente}")
    public ResponseEntity<?> asignarCliente(@PathVariable Long idCaso, @PathVariable Long idCliente) {
        return ResponseEntity.ok(casoService.asignarCliente(idCaso, idCliente));
    }

    @PutMapping("/{idCaso}/desasignar-cliente")
    public ResponseEntity<?> desasignarCliente(@PathVariable Long idCaso) {
        
        return ResponseEntity.ok(casoService.desasignarCliente(idCaso));
    }

    @PostMapping("/{id}/archivos")
    public ResponseEntity<?> subirArchivoCaso(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            archivoService.storeForCase(file, id);
            return ResponseEntity.ok("Archivo subido correctamente al caso " + id);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir archivo");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}