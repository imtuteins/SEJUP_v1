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

@Controller
@RequestMapping("/admin")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> getAllUsers() {
        List<Usuario> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/usuarios-view")
    public String getAllUsers(Model model) {
        model.addAttribute("usuarios", usuarioService.findAll());
        return "usuarios";

    }

    @PutMapping("/usuarios/{id}/role")
    public ResponseEntity<String> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String rolName = body.get("rolName");
        usuarioService.updateUserRole(id, rolName);
        return ResponseEntity.ok("Rol actualizado");
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        usuarioService.deleteUserById(id);
        return ResponseEntity.ok("Usuario eliminado");
    }

    @GetMapping("/abogados")
    public ResponseEntity<List<Usuario>> getAbogados() {
        return ResponseEntity.ok(usuarioService.findByRole(RoleList.ROLE_ABOGADO));
    }

}
