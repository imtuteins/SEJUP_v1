package com.entornos.v2_maven.Repository;

import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CasoRepository extends JpaRepository<Caso, Long> {
    List<Caso> findByCliente(Usuario idCliente);
    List<Caso> findByAbogado(Usuario abogado);

}
