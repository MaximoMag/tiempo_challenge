# Tiempo Challenge

## Descripción

Esta aplicación proporciona un pronóstico del tiempo basado en la ubicación seleccionada, utilizando datos de la API de Open Weather. Permite buscar el clima actual de cualquier ciudad y ver detalles avanzados del pronóstico en un formato visual.

## Pasos para la Ejecución de la App

### 1. Clonar el Repositorio

Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/MaximoMag/tiempo_challenge.git´´´
```

### 2. Conseguir la API Key

1. **Crea una cuenta en Rapid API**: Ve a [RapidAPI](https://rapidapi.com) y regístrate si aún no tienes una cuenta.

2. **Selecciona un Plan**: Una vez registrado, selecciona el plan que prefieras para la API de Open Weather.

3. **Subscríbete a la API**: Accede a la API de Open Weather en [este enlace](https://rapidapi.com/worldapi/api/open-weather13) y subscríbete al plan que elegiste.

4. **Obtén tu API Key**: Dirígete a los endpoints de la API y copia el campo que dice `X-RapidAPI-Key`.

### 3. Configurar el archivo de variables de entorno

1. **Crea un archivo `.env`**: En la carpeta base de la aplicación, crea un archivo llamado `.env`.

2. **Ingresa la API Key**: Dentro del archivo `.env`, agrega la siguiente línea, reemplazando `YOUR_API_KEY` con la clave que obtuviste en el paso 2:

    ```plaintext
    REACT_APP_RAPIDAPI_KEY=YOUR_API_KEY
    ```

### 4. Instalar las dependencias

Con la consola posicionada en la carpeta de la aplicación, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 5. Ejecutar la aplicación

Para iniciar la aplicación, ejecuta el siguiente comando en la consola:

```bash
npm start
```

Esto lanzará el servidor de desarrollo y abrirá la aplicación en tu navegador por defecto.

