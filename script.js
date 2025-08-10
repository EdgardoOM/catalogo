document.addEventListener('DOMContentLoaded', function () {
  // --- Carrusel de imágenes ---
  const carrusel = document.querySelector('.carrusel-imagenes');
  const prevBtn = document.querySelector('.carrusel-btn.prev');
  const nextBtn = document.querySelector('.carrusel-btn.next');
  let index = 0;

  function showImage(idx) {
    if (!carrusel) return;
    carrusel.style.transform = `translateX(-${idx * 100}%)`;
  }

  if (carrusel && prevBtn && nextBtn) {
    setTimeout(() => {
      const images = carrusel.querySelectorAll('img');
      if (images.length === 0) return;
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
      });
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        showImage(index);
      });
      showImage(index);
    }, 100);
  }

  // --- Buscador y filtros (solo si existen en la página) ---
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.producto');
  const btnBlanqueria = document.querySelector('.btnBlanqueria');
  const btnIndumentaria = document.querySelector('.btnIndumentaria');
  const btnTodos = document.querySelector('.btnTodos');

  if (buscador && productos.length) {
    buscador.addEventListener('input', function () {
      const texto = buscador.value.toLowerCase();
      productos.forEach(producto => {
        const nombre = producto.querySelector('.nombreProducto').textContent.toLowerCase();
        const descripcion = producto.querySelector('.descripcionProducto').textContent.toLowerCase();
        if (nombre.includes(texto) || descripcion.includes(texto)) {
          producto.style.display = '';
        } else {
          producto.style.display = 'none';
        }
      });
    });
  }

  if (btnBlanqueria && btnIndumentaria && btnTodos && productos.length) {
    btnBlanqueria.addEventListener('click', function () {
      productos.forEach(producto => {
        if (producto.classList.contains('blanqueria')) {
          producto.style.display = '';
        } else {
          producto.style.display = 'none';
        }
      });
      btnBlanqueria.classList.add('activo');
      btnIndumentaria.classList.remove('activo');
      btnTodos.classList.remove('activo');
    });

    btnIndumentaria.addEventListener('click', function () {
      productos.forEach(producto => {
        if (producto.classList.contains('indumentaria')) {
          producto.style.display = '';
        } else {
          producto.style.display = 'none';
        }
      });
      btnIndumentaria.classList.add('activo');
      btnBlanqueria.classList.remove('activo');
      btnTodos.classList.remove('activo');
    });

    btnTodos.addEventListener('click', function () {
      productos.forEach(producto => {
        producto.style.display = '';
      });
      btnTodos.classList.add('activo');
      btnBlanqueria.classList.remove('activo');
      btnIndumentaria.classList.remove('activo');
    });
  }
});