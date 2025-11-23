package com.entornos.v2_maven.Repository;

import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Enums.RoleList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByUsername(String username);
    boolean existsByUsername(String username);
    List<Usuario> findByRol_Name(RoleList name);;
}
