package com.entornos.v2_maven.Repository;

import com.entornos.v2_maven.Entity.ArchivoLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArchivoLogRepository extends JpaRepository<ArchivoLog, Long> {
}
