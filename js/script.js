// ==========================================
// 1. GESTIÓN GLOBAL DEL SALDO Y TRANSACCIONES
// ==========================================
let saldoActual = parseInt(localStorage.getItem("walletBalance")) || 0;

// Función para actualizar el texto del saldo
const actualizarVistaSaldo = () => {
    const elementoSaldo = document.getElementById("saldo-display");
    if (elementoSaldo) {
        elementoSaldo.innerText = `$${saldoActual.toLocaleString('es-CL')}`;
    }
};

// Función para GUARDAR una transacción en el historial
const registrarTransaccion = (tipo, descripcion, monto) => {
    // 1. Obtenemos el historial actual o creamos uno vacío
    const historial = JSON.parse(localStorage.getItem("walletHistory")) || [];
    
    // 2. Creamos el objeto de la nueva transacción
    const nuevaTransaccion = {
        fecha: new Date().toLocaleDateString(), // Fecha de hoy
        descripcion: descripcion,
        tipo: tipo, // 'Ingreso' o 'Egreso'
        monto: monto
    };

    // 3. Agregamos al principio del array (para que salga la más reciente primero)
    historial.unshift(nuevaTransaccion);

    // 4. Guardamos en localStorage
    localStorage.setItem("walletHistory", JSON.stringify(historial));
};

document.addEventListener('DOMContentLoaded', () => {
    actualizarVistaSaldo();
    cargarTablaTransacciones(); // Intentar cargar la tabla si estamos en esa página
});


// ==========================================
// 2. LÓGICA DE LOGIN
// ==========================================
const btnLogin = document.getElementById('btn-ingresar');
if (btnLogin) {
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        const mensaje = document.getElementById("mensaje");

        if (usuario === "admin" && password === "1234") {
            localStorage.setItem("usuario_logueado", "true");
            if (!localStorage.getItem("walletBalance")) {
                localStorage.setItem("walletBalance", "200000");
            }
            mensaje.innerHTML = '<div class="alert alert-success mt-3">✅ ¡Acceso permitido!</div>';
            setTimeout(() => { window.location.href = "menu.html"; }, 1500);
        } else {
            mensaje.innerHTML = '<div class="alert alert-danger mt-3">❌ Credenciales inválidas</div>';
        }
    });
}


// ==========================================
// 3. LÓGICA DE DEPOSITO
// ==========================================
const btnDepositar = document.querySelector('.btn-realizar-deposito');

if (btnDepositar) {
    btnDepositar.addEventListener('click', () => {
        const inputMonto = document.getElementById('monto-depositar');
        const monto = parseInt(inputMonto.value);
        const mensajeContainer = document.getElementById('mensaje-deposito');

        if (monto > 0) {
            saldoActual += monto;
            localStorage.setItem("walletBalance", saldoActual);
            
            // --- AQUÍ GUARDAMOS LA TRANSACCIÓN ---
            registrarTransaccion('Ingreso', 'Depósito en efectivo', monto);

            mensajeContainer.innerHTML = `<div class="alert alert-success mt-3">💰 Depósito exitoso.</div>`;
            inputMonto.value = "";
        } else {
            mensajeContainer.innerHTML = `<div class="alert alert-danger mt-3">⚠️ Monto inválido.</div>`;
        }
    });
}


// ==========================================
// 4. LÓGICA DE ENVIAR DINERO
// ==========================================
const btnEnviar = document.getElementById('btn-enviar-dinero');

if (btnEnviar) {
    const container = document.querySelector('form');
    let display = document.createElement('p');
    display.className = "text-center fw-bold mt-2";
    display.innerText = `Saldo disponible: $${saldoActual.toLocaleString('es-CL')}`;
    container.insertBefore(display, container.firstChild);

    btnEnviar.addEventListener('click', () => {
        const inputMonto = document.getElementById('monto-enviar');
        const inputDestino = document.getElementById('destinatario');
        const monto = parseInt(inputMonto.value);
        const mensajeContainer = document.getElementById('mensaje-transferencia');

        if (!monto || !inputDestino.value) {
            mensajeContainer.innerHTML = `<div class="alert alert-warning mt-3">⚠️ Completa los campos.</div>`;
            return;
        }

        if (monto > saldoActual) {
            mensajeContainer.innerHTML = `<div class="alert alert-danger mt-3">❌ Fondos insuficientes.</div>`;
            return;
        }

        saldoActual -= monto;
        localStorage.setItem("walletBalance", saldoActual);

        // --- AQUÍ GUARDAMOS LA TRANSACCIÓN ---
        registrarTransaccion('Egreso', `Envío a ${inputDestino.value}`, monto);

        display.innerText = `Saldo disponible: $${saldoActual.toLocaleString('es-CL')}`;
        mensajeContainer.innerHTML = `<div class="alert alert-success mt-3">💸 Envío realizado.</div>`;
        inputMonto.value = "";
        inputDestino.value = "";
    });
}


// ==========================================
// 5. LÓGICA DE VISUALIZACIÓN (transactions.html)
// ==========================================
function cargarTablaTransacciones() {
    const cuerpoTabla = document.getElementById('cuerpo-tabla');
    
    // Si no existe la tabla en esta página, no hacemos nada y salimos
    if (!cuerpoTabla) return;

    // Obtenemos el historial
    const historial = JSON.parse(localStorage.getItem("walletHistory")) || [];

    // Si está vacío, mostramos mensaje
    if (historial.length === 0) {
        cuerpoTabla.innerHTML = '<tr><td colspan="4" class="text-center">No hay transacciones recientes.</td></tr>';
        return;
    }

    // Limpiamos la tabla
    cuerpoTabla.innerHTML = '';

    // Recorremos el historial y creamos las filas (tr)
    historial.forEach(transaccion => {
        const fila = document.createElement('tr');
        
        // Definimos color según si es ingreso o egreso
        const claseColor = transaccion.tipo === 'Ingreso' ? 'text-success' : 'text-danger';
        const signo = transaccion.tipo === 'Ingreso' ? '+' : '-';

        fila.innerHTML = `
            <td>${transaccion.fecha}</td>
            <td>${transaccion.descripcion}</td>
            <td class="${claseColor} fw-bold">${transaccion.tipo}</td>
            <td class="${claseColor} text-end fw-bold">${signo}$${transaccion.monto.toLocaleString('es-CL')}</td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}


// ==========================================
// 6. LOGOUT
// ==========================================
const btnLogout = document.getElementById('btn-logout');
if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario_logueado");
        window.location.href = "login.html";
    });
}
