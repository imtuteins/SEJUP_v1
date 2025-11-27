package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Entity.Archivo;
import com.entornos.v2_maven.Entity.Rol;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Reponse.ResponseArchivo;
import com.entornos.v2_maven.Repository.ArchivoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ArchivoServiceImpl implements ArchivoService {

    @Autowired
    private ArchivoRepository archivoRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Override
    public Archivo store(MultipartFile file) throws IOException {
        String nombreArchivo = StringUtils.cleanPath(file.getOriginalFilename());

        Archivo archivo = Archivo.builder()
                .id(UUID.randomUUID())
                .nombreArchivo(nombreArchivo)
                .tipoArchivo(file.getContentType())
                .data(file.getBytes())
                .fechaSubida(LocalDateTime.now())
                .build();

        return archivoRepository.save(archivo);
    }

    @Override
    public Optional<Archivo> getfile(UUID id) throws FileNotFoundException {
        return archivoRepository.findById(id)
                .or(() -> {
                    throw new RuntimeException("Archivo no encontrado");
                });
    }

    @Override
    public List<ResponseArchivo> getfiles() {
        return archivoRepository.findAll().stream().map(dbfile -> {
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/SEJUP/Archivo/")
                    .path(dbfile.getId().toString())
                    .toUriString();
            return ResponseArchivo.builder()
                    .nombreArchivo(dbfile.getNombreArchivo())
                    .tipoArchivo(dbfile.getTipoArchivo())
                    .url(fileDownloadUri)
                    .size(dbfile.getData().length)
                    .usuario(dbfile.getUsuario().getUsername())
                    .rol(dbfile.getUsuario().getRol().getName().name())
                    .build();
        }).collect(Collectors.toList());
    }

    @Override
    public Archivo storeForCurrentUser(MultipartFile file) throws IOException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails) principal).getUsername();

        Usuario usuario = usuarioService.findByUsername(username);

        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        Archivo archivo = Archivo.builder()
                .nombreArchivo(filename)
                .tipoArchivo(file.getContentType())
                .data(file.getBytes())
                .fechaSubida(LocalDateTime.now())
                .usuario(usuario)
                .build();

        return archivoRepository.save(archivo);
    }

    public List<Archivo> getAllFiles() {
        return archivoRepository.findAll();
    }
}
