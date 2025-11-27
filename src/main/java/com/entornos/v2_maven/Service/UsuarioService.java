package com.entornos.v2_maven.Service;

import com.entornos.v2_maven.Entity.Rol;
import com.entornos.v2_maven.Entity.Usuario;
import com.entornos.v2_maven.Enums.RoleList;
import com.entornos.v2_maven.Repository.RolRepository;
import com.entornos.v2_maven.Repository.UsuarioRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@Service
public class UsuarioService implements UserDetailsService {

    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;

    @Autowired
    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));

        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(usuario.getRol().getName().toString());

        return new User(
                usuario.getUsername(),
                usuario.getPassword(),
                Collections.singleton(authority)
        );
    }

    public boolean existsByUsername(String username) {
        return usuarioRepository.existsByUsername(username);
    }

    public void save(Usuario usuario) {
        usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario obtenerUsuarioPorUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }

    public Usuario findByUsername(String username) {
        return usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
    }

    public Optional<Usuario> findByUsernameOptional(String username) {
        return usuarioRepository.findByUsername(username);
    }

    public void deleteUserById(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void updateUserRole(Long id, String rolName) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        // Convierte el String recibido en el enum
        RoleList roleEnum;
        try {
            roleEnum = RoleList.valueOf(rolName); // rolName = "ROLE_CLIENTE", "ROLE_ABOGADO"
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Rol no válido");
        }

        Rol rol = rolRepository.findByName(roleEnum)
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));

        usuario.setRol(rol);
        usuarioRepository.save(usuario);
    }

    public List<Usuario> findByRole(RoleList rolName) {
        return usuarioRepository.findByRol_Name(rolName);
    }


}
