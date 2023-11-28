# Obligatorio Desarrollo Web y Mobile - 2023

Integrantes: Renzo Giacometti, Gonzalo Juárez, Floriana Locatelli, Florencia Roldós

## Contenido

1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Uso](#uso)

## Requisitos

- Node.js
- npm
- Angular CLI

## Instalación

Para utilizar el programa:

```bash
npm install
```

## Uso
1. **Iniciar la base de datos.** Dirigirse a la carpeta ``obligatorio-web-mobile-2023\database``, y realizar ``docker-compose up``
2. **Cambiar las ip.** Se debe colocar la ip de quien hostee la aplicación en los archivos: ``obligatorio-web-mobile-2023\Frontend\.env`` y en ``obligatorio-web-mobile-2023\Frontend\src\app\enviorment.ts``. Reemplazar la ip colocada.
3. **Iniciar la API.** Se debe iniciar la api colocando el comando ``npm run dev`` en la carpeta ``obligatorio-web-mobile-2023\api``.
4. **Iniciar el Angular.** Para iniciar el Angular, dirigirse a la carpeta Frontend y colocar: ``ng serve --host "tu-ip" --disable-host-check``.


