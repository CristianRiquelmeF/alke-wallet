# Alke Wallet 💰

Simulación de una billetera virtual (E-wallet). Este proyecto es una aplicación web frontend que replica las funcionalidades básicas de una billetera digital, enfocándose en el diseño responsivo y la lógica de navegación y sesión.

## Tecnologías Utilizadas

*   **HTML5:** Estructura semántica del sitio.
*   **CSS3:** Estilos personalizados (`assets/css/style.css`).
*   **Bootstrap 5.3:** Framework para la maquetación responsiva, grillas y componentes.
*   **JavaScript (ES6):** Lógica del DOM, validación de formularios y manejo de sesión con `localStorage`.
*   **FontAwesome 6:** Iconografía para menús y acciones.

## Funcionalidades

1.  **Control de Acceso:**
    *   Página de Login con validación de credenciales.
    *   Redirección automática (`index.html`) dependiendo si el usuario está logueado o no.
    *   Funcionalidad de Cerrar Sesión (Logout).
2.  **Navegación:**
    *   Menú principal con accesos directos.
    *   Barra de navegación superior con avatar y botón de salir.
3.  **Vistas:**
    *   Ver saldo y transacciones recientes.
    *   Formularios simulados para depositar y enviar dinero.
4.  **Diseño Responsivo:** Adaptable a dispositivos móviles y escritorio.

## Cómo ejecutar el proyecto

1.  Clona este repositorio o descarga el archivo ZIP.
2.  Asegúrate de que la estructura de carpetas sea correcta (imágenes en `assets/img`, estilos en `assets/css`, scripts en `js/`).
3.  Abre el archivo **`index.html`** en tu navegador web de preferencia.

Para ingresar a la aplicación, utiliza los siguientes datos simulados:

*   **Usuario:** `admin`
*   **Contraseña:** `1234`

## Estructura

```text
├── assets/
│   ├── css/
│   │   └── style.css
│   └── img/
│       └── avatar.webp
├── js/
│   ├── login.js
│   └── logout.js
├── index.html       (Lógica de redirección)
├── login.html       (Formulario de acceso)
├── menu.html        (Dashboard principal)
├── deposit.html     (Vista de depósitos)
├── sendmoney.html   (Vista de envíos)
└── transactions.html (Historial)

