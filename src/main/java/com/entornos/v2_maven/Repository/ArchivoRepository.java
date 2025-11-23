package com.entornos.v2_maven.Repository;

import com.entornos.v2_maven.Entity.Archivo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ArchivoRepository extends JpaRepository<Archivo, UUID> {
    List<Archivo> findByUsuario_Id(Long usuarioId);
}
