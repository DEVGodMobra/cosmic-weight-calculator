const factores = {
  Mercury: 0.38,
  Earth: 1,
  Jupiter: 2.34,
  Moon: 0.165,
  Sun: 27.9
};

const añosOrbitales = {
  Mercury: 88,
  Earth: 365,
  Jupiter: 4333,
  Moon: null,
  Sun: null
};

const imagenes = {
  Mercury: "imagenes/mercury.gif",
  Earth: "imagenes/earth.gif",
  Jupiter: "imagenes/jupiter.gif",
  Moon: "imagenes/moon.gif",
  Sun: "imagenes/sun.gif"
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formDatos');
  const edadInput = document.getElementById('edadInput');
  const pesoInput = document.getElementById('pesoInput');
  const modal = document.getElementById('modal');
  const cerrar = document.getElementById('cerrarModal');
  const carousel = document.querySelector('.carousel');
  const prev = document.getElementById('prevSlide');
  const next = document.getElementById('nextSlide');

  let slides = [];
  let index = 0;

  form.onsubmit = e => {
    e.preventDefault();
    generarSlides(+edadInput.value, +pesoInput.value);
    mostrarSlide(0);
    modal.style.display = 'block';
  };

  cerrar.onclick = () => modal.style.display = 'none';

  prev.onclick = () => mostrarSlide(index = (index - 1 + slides.length) % slides.length);
  next.onclick = () => mostrarSlide(index = (index + 1) % slides.length);

  function generarSlides(edad, peso) {
    carousel.innerHTML = '';
    slides = [];

    for (const p in factores) {
      const pesoRel = (peso * factores[p]).toFixed(2);
      const edadRel = añosOrbitales[p]
        ? (edad * 365 / añosOrbitales[p]).toFixed(2)
        : "N/A";

      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.innerHTML = `
        <h2>${p.toUpperCase()}</h2>
        <img src="${imagenes[p]}">
        <div class="peso-cuerpo">
          YOUR WEIGHT IS: ${pesoRel} kg<br>
          YOUR AGE IS: ${edadRel} OLD
        </div>
      `;

      carousel.appendChild(slide);
      slides.push(slide);
    }
  }

  function mostrarSlide(i) {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
  }

  /* ⭐ EFECTO ESTELA */
  document.body.addEventListener('mousemove', e => {
    if (e.target.closest('.modal')) return;
    const st = document.createElement('div');
    st.className = 'stela';
    st.style.left = `${e.clientX - 20}px`;
    st.style.top = `${e.clientY - 20}px`;
    document.body.appendChild(st);
    setTimeout(() => st.remove(), 800); // ✅ corregido
  });
});
