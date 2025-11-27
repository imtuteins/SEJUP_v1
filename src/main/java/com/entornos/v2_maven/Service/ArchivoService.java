package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Entity.Archivo;
import com.entornos.v2_maven.Reponse.ResponseArchivo;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface Archivoservice {

    //Permite almacenar archivos
    Archivo store(MultipartFile file) throws IOException;

    //Descarga de archivos
    Optional<Archivo> getfile (UUID id) throws FileNotFoundException;

    //Consulta de archivos
    List<ResponseArchivo> getfiles();

    Archivo storeForCurrentUser(MultipartFile file) throws IOException;

    List<Archivo> getAllFiles();
}
