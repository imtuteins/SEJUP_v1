package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Dtos.Request.AsignarCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoRequest;
import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Service.CasoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/caso")
public class CasoController {

    @Autowired
    private CasoService casoService;

    @PostMapping("/crear-caso")
    public ResponseEntity<?> crearCaso(@RequestBody CrearCasoRequest crearCasoRequest){
        return new ResponseEntity<>(casoService.crearCaso(crearCasoRequest), HttpStatus.CREATED);
    }

    @PutMapping("/asignar")
    public ResponseEntity<?> asignarCaso(@RequestBody AsignarCasoRequest asignarCasoRequest){
        return new ResponseEntity<>(casoService.asignarCaso(asignarCasoRequest), HttpStatus.CREATED);
    }

}
