package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Dtos.Request.AsignarCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoRequest;
import com.entornos.v2_maven.Entity.Archivo;
import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CasoService {

        @Autowired
        private UsuarioRepository usuarioRepository;
        @Autowired
        private CasoRepository casoRepository;

        public String crearCaso(CrearCasoRequest crearCasoRequest) {

                Usuario clieteExistente = usuarioRepository.findById(crearCasoRequest.cliente())
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Caso caso = Caso.builder()

                                .titulo(crearCasoRequest.titulo())
                                .descripcion(crearCasoRequest.descripcion())
                                .esDemandado(crearCasoRequest.esDemandado())
                                .cliente(clieteExistente)
                                .abogado(null)
                                .build();

                casoRepository.save(caso);

                return caso.getTitulo();
        }

        public String asignarCaso(AsignarCasoRequest asignarCasoRequest) {

                Usuario abogadoExistente = usuarioRepository.findById(asignarCasoRequest.idAbogado())
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Caso casoExistente = casoRepository.findById(asignarCasoRequest.idCaso())
                                .orElseThrow(() -> new RuntimeException("caso no encontrado"));

                casoExistente.setAbogado(abogadoExistente);

                casoRepository.save(casoExistente);

                return casoExistente.getAbogado().getUsername();
        }

        public List<Caso> encontrarCasos(Long idUsuario) {

                Usuario usuarioExistente = usuarioRepository.findById(idUsuario)
                                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                return casoRepository.findByCliente(usuarioExistente);
        }

        public List<Caso> findAll() {
                return casoRepository.findAll();
        }

        public String desasignarAbogado(Long idCaso) {
                Caso caso = casoRepository.findById(idCaso)
                                .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setAbogado(null);
                casoRepository.save(caso);
                return "Abogado desasignado del caso " + caso.getTitulo();
        }

        public String asignarCliente(Long idCaso, Long idCliente) {
                Usuario cliente = usuarioRepository.findById(idCliente)
                                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
                Caso caso = casoRepository.findById(idCaso)
                                .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setCliente(cliente);
                casoRepository.save(caso);
                return "Cliente asignado al caso " + caso.getTitulo();
        }

        public String desasignarCliente(Long idCaso) {
                Caso caso = casoRepository.findById(idCaso)
                                .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setCliente(null);
                casoRepository.save(caso);
                return "Cliente desasignado del caso " + caso.getTitulo();
        }

}
