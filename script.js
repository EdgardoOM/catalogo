document.addEventListener('DOMContentLoaded', function () {
  // --- Buscador y filtros ---
  const buscador = document.getElementById('buscador');
  const productos = document.querySelectorAll('.producto');
  const btnBlanqueria = document.querySelector('.btnBlanqueria');
  const btnIndumentaria = document.querySelector('.btnIndumentaria');
  const btnTodos = document.querySelector('.btnTodos');

  if (buscador && productos.length) {
    buscador.addEventListener('input', function () {
      const texto = buscador.value.toLowerCase().split(' ').filter(Boolean);
      productos.forEach(producto => {
        const nombre = producto.querySelector('.nombreProducto').textContent.toLowerCase();
        const talle = producto.querySelector('.talleProducto') ? producto.querySelector('.talleProducto').textContent.toLowerCase() : '';
        // El producto aparece si TODAS las palabras están en nombre o talle
        const coincide = texto.every(palabra =>
          nombre.includes(palabra) || talle.includes(palabra)
        );
        producto.style.display = coincide ? '' : 'none';
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

  // --- Carrusel por producto y botón WhatsApp ---
  productos.forEach(producto => {
    const carrusel = producto.querySelector('.carrusel-imagenes');
    const prevBtn = producto.querySelector('.carrusel-btn.prev');
    const nextBtn = producto.querySelector('.carrusel-btn.next');
    const images = carrusel ? carrusel.querySelectorAll('img') : [];
    let index = 0;

    function showImage(idx) {
      if (!carrusel) return;
      carrusel.style.transform = `translateX(-${idx * 100}%)`;
    }

    if (carrusel && prevBtn && nextBtn && images.length > 0) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
      });
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % images.length;
        showImage(index);
      });
      showImage(index);
    }

    // --- Botón WhatsApp ---
    const btnWhatsapp = producto.querySelector('.consultaWhatsapp');
    btnWhatsapp.addEventListener('click', function () {
      const nombre = producto.querySelector('.nombreProducto').textContent;
      const descripcion = producto.querySelector('.descripcionProducto') ? producto.querySelector('.descripcionProducto').textContent : '';
      const precio = producto.querySelector('.precioProducto').textContent;
      const imagenActiva = images[index] ? images[index].src : '';

      let mensaje = imagenActiva + "\n";
      mensaje += `🛒 *Consulta de producto*\n\n`;
      mensaje += `*${nombre}*\n`;
      mensaje += `${descripcion}\n`;
      mensaje += `💲 *Precio:* ${precio}\n`;

      const numeroWhatsapp = '5492477316189'; // Cambia por tu número
      const url = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;
      window.open(url, '_blank');
    });
  });
});