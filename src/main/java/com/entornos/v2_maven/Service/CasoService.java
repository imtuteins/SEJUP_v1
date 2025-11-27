package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Dtos.Request.AsignarCasoRequest;
import com.entornos.v2_maven.Dtos.Request.CrearCasoRequest;
import com.entornos.v2_maven.Entity.Caso;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Repository.CasoRepository;
import com.entornos.v2_maven.Repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CasoService {

        private final UsuarioRepository usuarioRepository;
        private final CasoRepository casoRepository;

        // Crear un nuevo caso
        public String crearCaso(CrearCasoRequest crearCasoRequest) {
                Usuario clienteExistente = usuarioRepository.findById(crearCasoRequest.cliente())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Caso caso = Caso.builder()
                        .titulo(crearCasoRequest.titulo())
                        .descripcion(crearCasoRequest.descripcion())
                        .esDemandado(crearCasoRequest.esDemandado())
                        .cliente(clienteExistente)
                        .abogado(null)
                        .build();

                casoRepository.save(caso);
                return caso.getTitulo();
        }

        // Asignar abogado a un caso
        public String asignarCaso(AsignarCasoRequest asignarCasoRequest) {
                Usuario abogadoExistente = usuarioRepository.findById(asignarCasoRequest.idAbogado())
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                Caso casoExistente = casoRepository.findById(asignarCasoRequest.idCaso())
                        .orElseThrow(() -> new RuntimeException("Caso no encontrado"));

                casoExistente.setAbogado(abogadoExistente);
                casoRepository.save(casoExistente);

                return casoExistente.getAbogado().getUsername();
        }

        // Encontrar todos los casos de un cliente
        public List<Caso> encontrarCasos(Long idUsuario) {
                Usuario usuarioExistente = usuarioRepository.findById(idUsuario)
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

                return casoRepository.findByCliente(usuarioExistente);
        }

        // Listar todos los casos
        public List<Caso> findAll() {
                return casoRepository.findAll();
        }

        // Desasignar abogado de un caso
        public String desasignarAbogado(Long idCaso) {
                Caso caso = casoRepository.findById(idCaso)
                        .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setAbogado(null);
                casoRepository.save(caso);
                return "Abogado desasignado del caso " + caso.getTitulo();
        }

        // Asignar cliente a un caso
        public String asignarCliente(Long idCaso, Long idCliente) {
                Usuario cliente = usuarioRepository.findById(idCliente)
                        .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
                Caso caso = casoRepository.findById(idCaso)
                        .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setCliente(cliente);
                casoRepository.save(caso);
                return "Cliente asignado al caso " + caso.getTitulo();
        }

        // Desasignar cliente de un caso
        public String desasignarCliente(Long idCaso) {
                Caso caso = casoRepository.findById(idCaso)
                        .orElseThrow(() -> new RuntimeException("Caso no encontrado"));
                caso.setCliente(null);
                casoRepository.save(caso);
                return "Cliente desasignado del caso " + caso.getTitulo();
        }
}
