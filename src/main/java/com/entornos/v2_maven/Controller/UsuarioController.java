package com.entornos.v2_maven.Controller;

import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Enums.RoleList;
import com.entornos.v2_maven.Service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsers() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<Usuario> getUserByUsername(@PathVariable String username) {
        Usuario usuario = usuarioService.findByUsername(username);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("/usuarios-view")
    public String getAllUsers(Model model) {
        model.addAttribute("usuarios", usuarioService.findAll());
        return "usuarios";

    }

    @PutMapping("/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String rolName = body.get("rolName");
        usuarioService.updateUserRole(id, rolName);
        return ResponseEntity.ok("Rol actualizado");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        usuarioService.deleteUserById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @GetMapping("/abogados")
    public ResponseEntity<List<Usuario>> getAbogados() {
        return ResponseEntity.ok(usuarioService.findByRole(RoleList.ROLE_ABOGADO));
    }

}
