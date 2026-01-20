const btn = document.getElementById('btn-ingresar');

const login = (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;
    const mensaje = document.getElementById("mensaje");

    // Lógica de validación
    if (usuario === "admin" && password === "1234") {
        
        localStorage.setItem("usuario_logueado", "true");
        
        mensaje.innerHTML = '<div class="alert alert-success mt-3">✅ ¡Acceso permitido! Redirigiendo...</div>';
        
        setTimeout(() => {
            window.location.href = "menu.html";
        }, 1500);

    } else {
        // Mensaje de error
        mensaje.innerHTML = '<div class="alert alert-danger mt-3">❌ ¡Credenciales inválidas! Intente nuevamente</div>';
        
        document.getElementById("password").value = "";
    }
}
const botonCerrarSesion = document.getElementById('btn-logout');

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener('click', (e) => {
        e.preventDefault();

        localStorage.removeItem("usuario_logueado");

        window.location.href = "login.html";
    });
}


// Agregamos el "escuchador" de eventos al botón
if (btn) {
    btn.addEventListener('click', login);
}