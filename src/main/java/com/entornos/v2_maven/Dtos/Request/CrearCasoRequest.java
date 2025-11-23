package com.entornos.v2_maven.Dtos.Request;

public record CrearCasoRequest(String descripcion, boolean esDemandado, String titulo, Long cliente) {

}
