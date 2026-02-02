$(document).ready(function() {

    // --- 1. GESTIÓN DE SALDO (Simulación) ---
    // Iniciamos el saldo en 200,000 si no existe
    let saldo = localStorage.getItem('walletBalance');
    if (!saldo) {
        saldo = 200000;
        localStorage.setItem('walletBalance', saldo);
    }
    
    // Función para actualizar cualquier elemento que muestre el saldo
    function actualizarSaldoUI() {
        // Busca cualquier elemento con ID 'saldo-display' y le pone el texto
        $('#saldo-display').text('$' + parseInt(saldo).toLocaleString('es-CL'));
    }

    // Ejecutamos al inicio para mostrar el saldo actual
    actualizarSaldoUI();


    // --- 2. ANIMACIONES EN EL MENÚ (menu.html) ---
    if (window.location.pathname.includes("menu.html")) {
        // Ocultamos las tarjetas al principio para luego mostrarlas con efecto
        $('.card').hide(); 
        
        // Animación de entrada (Fade In en cascada)
        $('.card').each(function(index) {
            $(this).delay(150 * index).fadeIn(1000);
        });

        // Evento Hover con jQuery para animar
        $('.card').hover(
            function() { $(this).animate({ marginTop: "-10px" }, 200); }, // Mouse entra
            function() { $(this).animate({ marginTop: "0px" }, 200); }    // Mouse sale
        );
    }


    // --- 3. AUTOCOMPLETAR EN ENVIAR DINERO (sendmoney.html) ---
    if (window.location.pathname.includes("sendmoney.html")) {
        
        // Lista de contactos simulada
        const contactos = [
            "Juan Perez",
            "Maria Gonzales",
            "César Astorga",
            "Pedro Pascal",
            "Diana Prince",
            "Clark Kent"
        ];

        // Inicializamos el autocompletar de jQuery UI
        $("#destinatario").autocomplete({
            source: contactos
        });

        // Lógica de Enviar Dinero
        $('.btn-success').click(function() {
            let monto = parseInt($('#monto-enviar').val());
            let destinatario = $('#destinatario').val();

            // Validaciones
            if (!monto || !destinatario) {
                alert("Por favor completa todos los campos.");
                return;
            }

            if (monto > saldo) {
                alert("❌ Fondos insuficientes.");
                return;
            }

            // Descontar saldo
            saldo -= monto;
            localStorage.setItem('walletBalance', saldo);
            actualizarSaldoUI();

            // Mensaje de éxito con animación
            alert(`✅ Has enviado $${monto} a ${destinatario} exitosamente.`);
            
            // Limpiar campos
            $('#monto-enviar').val('');
            $('#destinatario').val('');
        });
    }


    // --- 4. DEPOSITAR DINERO (deposit.html) ---
    if (window.location.pathname.includes("deposit.html")) {
        
        // Agregamos un contenedor para mensajes si no existe
        $('form').after('<div id="mensaje-deposito" style="display:none;" class="alert alert-success mt-3 text-center"></div>');

        // Evento Click
        $('.btn-success').click(function() {
            let monto = parseInt($('#monto-depositar').val());

            if (monto > 0) {
                // Sumar saldo
                saldo = parseInt(saldo) + monto;
                localStorage.setItem('walletBalance', saldo);
                
                // Mostrar mensaje con efecto slideDown
                $('#mensaje-deposito')
                    .text(`💰 Depósito de $${monto} realizado con éxito. Nuevo saldo: $${saldo}`)
                    .slideDown()
                    .delay(3000)
                    .slideUp(); // Se oculta solo a los 3 segundos

                $('#monto-depositar').val(''); // Limpiar input
            } else {
                alert("Ingresa un monto válido.");
            }
        });
    }


    // --- 5. TRANSACCIONES (transactions.html) ---
    if (window.location.pathname.includes("transactions.html")) {
        // Mostrar el saldo actual en el título o en algún lugar visible
        $('h1').after(`<h3 class="text-center text-primary mb-4">Saldo Disponible: <span id="saldo-display">$${parseInt(saldo).toLocaleString('es-CL')}</span></h3>`);
    }

});