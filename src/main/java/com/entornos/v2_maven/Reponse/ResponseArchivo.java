package com.entornos.v2_maven.Reponse;

import com.entornos.v2_maven.Entity.Usuario;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseArchivo {
    private String usuario;
    private String rol;
    private String nombreArchivo;
    private String tipoArchivo;
    private String url;
    private long size;
}
