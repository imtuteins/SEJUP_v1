# Usa una imagen base de Java 17
FROM eclipse-temurin:17-jdk-alpine AS build

# Instala Maven
RUN apk add --no-cache maven

# Directorio de trabajo
WORKDIR /app

# Copia el pom.xml y descarga las dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia el código fuente
COPY src ./src

# Compila el proyecto
RUN mvn clean package -DskipTests

# Etapa de ejecución
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia el JAR desde la etapa de build
COPY --from=build /app/target/V2_Maven-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
