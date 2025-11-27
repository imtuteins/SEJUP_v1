package com.entornos.v2_maven.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Archivo {
    @Id
    @GeneratedValue
    private UUID id;

    private String nombreArchivo;

    private String tipoArchivo;

    @Lob
    private byte[] data;

    private LocalDateTime fechaSubida;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "caso_id")
    private Caso caso;
}
