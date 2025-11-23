package com.entornos.v2_maven.Repository;

import com.entornos.v2_maven.Entity.Rol;
import com.entornos.v2_maven.Enums.RoleList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository  extends JpaRepository<Rol, Long> {
    Optional<Rol> findByName(RoleList name);

}
