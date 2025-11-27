package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Entity.Archivo;
import com.entornos.v2_maven.Reponse.ResponseArchivo;
import com.entornos.v2_maven.Reponse.ResponseMessage;
import com.entornos.v2_maven.Service.ArchivoServiceImpl;
import com.entornos.v2_maven.Service.Archivoservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/SEJUP")
public class ArchivoController {

    @Autowired
    private ArchivoServiceImpl archivoService;

    @PostMapping("/upload")
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        archivoService.storeForCurrentUser(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseMessage("Archivo subido exitosamente"));
    }


    @GetMapping("/Archivo/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable UUID id) throws FileNotFoundException {
        Archivo archivo = archivoService.getfile(id)
                .orElseThrow(() -> new FileNotFoundException("Archivo no encontrado con id: " + id));

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_TYPE, archivo.getTipoArchivo())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + archivo.getNombreArchivo() + "\"")
                .body(archivo.getData());
    }

    @GetMapping("/files")
    public ResponseEntity<List<ResponseArchivo>> getListFiles() {
        List<ResponseArchivo> files = archivoService.getfiles();
        return ResponseEntity.status(HttpStatus.OK).body(files);
    }
}
