/* ===== NAV ==== */
function abrirMenu() {
    let flexNav = document.querySelector('ul')
    flexNav.classList.toggle('flexNav')
}

document.addEventListener('DOMContentLoaded', function () {

    /* ===== Carrusel ===== */
    // Solo inicializa el carrusel si los elementos existen (no están en donar.html)
    const imgDisplay = document.getElementById("carrusel-img");
    const btnSiguiente = document.getElementById("btn-sig");
    const btnAnterior = document.getElementById("btn-ant");

    if (imgDisplay && btnSiguiente && btnAnterior) {
        const imagenes = ["./Imagenes_ong/marcontaminado.jpg", "./Imagenes_ong/aguapotable.jpg", "./Imagenes_ong/aguaplantita.jpg"];
        let indiceActual = 0;

        function actualizarImagen() {
            imgDisplay.src = imagenes[indiceActual];
        }

        btnSiguiente.addEventListener("click", function() {
            indiceActual++;
            if (indiceActual >= imagenes.length) indiceActual = 0;
            actualizarImagen();
        });

        btnAnterior.addEventListener("click", function() {
            indiceActual--;
            if (indiceActual < 0) indiceActual = imagenes.length - 1;
            actualizarImagen();
        });

        setInterval(() => {
            indiceActual++;
            if (indiceActual >= imagenes.length) indiceActual = 0;
            actualizarImagen();
        }, 3000);

        actualizarImagen();
    }

    /* ===== Valores FORMULARIO ===== */
    const formulario = document.getElementById('contact-form');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
        });
    }

    /* ===== DONAR ===== */
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.innerHTML = `
          <div class="modal">
            <button class="close-btn">X</button>
            <h2>Sumate a la causa</h2>
            <p>Tu ayuda permite seguir desarrollando proyectos educativos y sociales.</p>
            
            <form>
              <div class="form-group">
                <label>Nombre</label>
                <input type="text" placeholder="Tu nombre">
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="correo@email.com">
              </div>
              <div class="form-group">
                <label>Monto de donación (ARS)</label>
                <input type="number" id="montoDonacion" placeholder="Ej. 5000">
              </div>
              <button type="submit" class="submit-btn">Donar ahora</button>
            </form>

            <div class="impact-calc">
              <h3>Calculadora de Impacto</h3>
              <button id="calcularImpacto">Calcular impacto</button>
              <p id="resultadoImpacto"></p>
            </div>
          </div>
        `;
        document.body.appendChild(modalOverlay);

        const closeBtn = modalOverlay.querySelector('.close-btn');
        const inputMonto = modalOverlay.querySelector('#montoDonacion');
        const botonCalcular = modalOverlay.querySelector('#calcularImpacto');
        const resultadoImpacto = modalOverlay.querySelector('#resultadoImpacto');

        donateBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        function calcularImpacto(monto) {
            let precioAgua = 1000;
            let cantidadLitros = Math.floor(monto / precioAgua);
            resultadoImpacto.textContent = `Con tu donación se pueden entregar ${cantidadLitros} litros de agua potable.`;
        }

        botonCalcular.addEventListener('click', () => {
            let monto = parseInt(inputMonto.value);
            if (!isNaN(monto) && monto > 0) {
                calcularImpacto(monto);
            } else {
                resultadoImpacto.textContent = "Por favor ingresá un monto válido.";
            }
        });
    }

});
