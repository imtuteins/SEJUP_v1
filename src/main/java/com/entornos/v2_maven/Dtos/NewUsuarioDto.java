package com.entornos.v2_maven.Dtos;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class NewUsuarioDto {
    public String username;
    public String password;
}
