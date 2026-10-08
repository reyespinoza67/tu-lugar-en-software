/**
 * SCRIPT.JS — Tu lugar en Software
 * Blog educativo del equipo ITSON
 * JavaScript puro, sin dependencias externas
 */

/* =====================================================
   1. MENÚ HAMBURGUESA Y DESPLEGABLES NAVEGACIÓN
   ===================================================== */
(function iniciarMenuHamburguesa() {
  const btnHamburguesa = document.querySelector('.btn-hamburguesa');
  const navLista = document.querySelector('.nav-lista');

  if (!btnHamburguesa || !navLista) return;

  btnHamburguesa.addEventListener('click', function () {
    const estaAbierto = navLista.classList.toggle('abierta');
    btnHamburguesa.classList.toggle('abierto', estaAbierto);
    btnHamburguesa.setAttribute('aria-expanded', estaAbierto);
  });

  /* Manejo de submenús desplegables en móvil y escritorio */
  const elementosConSubmenu = document.querySelectorAll('.nav-item-has-submenu');

  elementosConSubmenu.forEach(function (item) {
    const enlacePrincipal = item.querySelector('.nav-link-padre');
    const submenu = item.querySelector('.nav-submenu');

    if (!enlacePrincipal || !submenu) return;

    /* En pantallas táctiles o móvil, el clic en la flecha abre el submenú */
    const btnToggleSubmenu = item.querySelector('.btn-toggle-sub');
    if (btnToggleSubmenu) {
      btnToggleSubmenu.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const abierto = item.classList.toggle('submenu-abierto');
        btnToggleSubmenu.setAttribute('aria-expanded', abierto);
      });
    }
  });

  /* Cerrar el menú y submenús al hacer clic fuera o presionar Escape */
  document.addEventListener('click', function (evento) {
    if (!evento.target.closest('.barra-nav')) {
      navLista.classList.remove('abierta');
      btnHamburguesa.classList.remove('abierto');
      btnHamburguesa.setAttribute('aria-expanded', 'false');
      elementosConSubmenu.forEach(function (item) {
        item.classList.remove('submenu-abierto');
      });
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      navLista.classList.remove('abierta');
      btnHamburguesa.classList.remove('abierto');
      btnHamburguesa.setAttribute('aria-expanded', 'false');
      elementosConSubmenu.forEach(function (item) {
        item.classList.remove('submenu-abierto');
      });
    }
  });
})();

/* =====================================================
   2. MARCAR PÁGINA ACTIVA EN LA NAVEGACIÓN
   ===================================================== */
(function marcarPaginaActiva() {
  const rutaActual = window.location.pathname.split('/').pop() || 'index.html';
  const enlaces = document.querySelectorAll('.nav-lista > li > a');

  enlaces.forEach(function (enlace) {
    const rutaEnlace = enlace.getAttribute('href').split('#')[0].split('/').pop();
    if (rutaEnlace === rutaActual) {
      enlace.classList.add('activo');
      enlace.setAttribute('aria-current', 'page');
    }
  });
})();

/* =====================================================
   3. ANIMACIÓN AL HACER SCROLL (Intersection Observer)
   ===================================================== */
(function iniciarAnimacionScroll() {
  const elementos = document.querySelectorAll('.reveal, .reveal-izq, .reveal-der');

  if (!elementos.length) return;

  const observador = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach(function (el) {
    observador.observe(el);
  });
})();

/* =====================================================
   4. BOTÓN VOLVER ARRIBA
   ===================================================== */
(function iniciarBtnArriba() {
  const btn = document.getElementById('btn-arriba');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 300);
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* =====================================================
   5. TARJETAS EXPANDIBLES DEL CICLO DE VIDA
   ===================================================== */
(function iniciarFasesExpandibles() {
  const tarjetas = document.querySelectorAll('.fase-card');
  if (!tarjetas.length) return;

  tarjetas.forEach(function (tarjeta) {
    tarjeta.addEventListener('click', function () {
      /* Cierra la que estaba abierta (excepto la actual) */
      tarjetas.forEach(function (otra) {
        if (otra !== tarjeta) otra.classList.remove('expandida');
      });
      tarjeta.classList.toggle('expandida');
    });

    /* Accesibilidad: también funciona con teclado */
    tarjeta.setAttribute('tabindex', '0');
    tarjeta.setAttribute('role', 'button');

    tarjeta.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tarjeta.click();
      }
    });
  });
})();

/* =====================================================
   6. ACORDEÓN DE SEMESTRES
   ===================================================== */
(function iniciarAcordeon() {
  const items = document.querySelectorAll('.acordeon-item');
  if (!items.length) return;

  items.forEach(function (item) {
    const btn = item.querySelector('.acordeon-btn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      const estaAbierto = item.classList.contains('abierto');

      /* Cierra todos */
      items.forEach(function (i) { i.classList.remove('abierto'); });

      /* Abre el seleccionado si estaba cerrado */
      if (!estaAbierto) {
        item.classList.add('abierto');
      }

      btn.setAttribute('aria-expanded', item.classList.contains('abierto'));
    });

    btn.setAttribute('aria-expanded', 'false');
  });
})();

/* =====================================================
   7. MINI QUIZ DEL CICLO DE VIDA
   ===================================================== */
(function iniciarQuiz() {
  const formQuiz = document.getElementById('form-quiz');
  if (!formQuiz) return;

  /* Respuestas correctas por índice de pregunta (0-4) */
  const respuestasCorrectas = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'd',
    q5: 'b'
  };

  const btnCalificar = document.getElementById('btn-calificar');
  const btnReiniciar = document.getElementById('btn-reiniciar');
  const divResultado = document.getElementById('quiz-resultado');

  if (!btnCalificar) return;

  btnCalificar.addEventListener('click', function () {
    let aciertos = 0;
    let respondidas = 0;

    /* Limpia estado anterior */
    document.querySelectorAll('.quiz-opcion').forEach(function (op) {
      op.classList.remove('correcta', 'incorrecta');
    });

    Object.keys(respuestasCorrectas).forEach(function (nombre) {
      const seleccionada = formQuiz.querySelector(`input[name="${nombre}"]:checked`);

      if (seleccionada) {
        respondidas++;
        const opcionEl = seleccionada.closest('.quiz-opcion');

        if (seleccionada.value === respuestasCorrectas[nombre]) {
          aciertos++;
          opcionEl.classList.add('correcta');
        } else {
          opcionEl.classList.add('incorrecta');
          const correcta = formQuiz.querySelector(
            `input[name="${nombre}"][value="${respuestasCorrectas[nombre]}"]`
          );
          if (correcta) correcta.closest('.quiz-opcion').classList.add('correcta');
        }
      }
    });

    if (respondidas < Object.keys(respuestasCorrectas).length) {
      divResultado.innerHTML = '<p>Responde todas las preguntas antes de calificar.</p>';
      divResultado.classList.add('visible');
      return;
    }

    const porcentaje = Math.round((aciertos / Object.keys(respuestasCorrectas).length) * 100);
    let mensaje = '';

    if (porcentaje === 100) {
      mensaje = '¡Perfecto! Dominaste el ciclo de vida del software. Tienes madera de futuro profesional.';
    } else if (porcentaje >= 60) {
      mensaje = `Muy bien — obtuviste ${aciertos} de 5. Repasa las fases que fallaste y vuelve a intentarlo.`;
    } else {
      mensaje = `Obtuviste ${aciertos} de 5. No te rindas — vuelve a leer las fases y practica de nuevo.`;
    }

    divResultado.innerHTML = `
      <p style="font-size:2rem;margin-bottom:0.5rem;">${porcentaje >= 80 ? '🎉' : porcentaje >= 60 ? '👍' : '💪'}</p>
      <strong>${aciertos}/5 correctas (${porcentaje}%)</strong>
      <p style="margin-top:0.5rem;">${mensaje}</p>
    `;
    divResultado.classList.add('visible');
    divResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  if (btnReiniciar) {
    btnReiniciar.addEventListener('click', function () {
      formQuiz.reset();
      divResultado.classList.remove('visible');
      divResultado.innerHTML = '';
      document.querySelectorAll('.quiz-opcion').forEach(function (op) {
        op.classList.remove('correcta', 'incorrecta');
      });
    });
  }
})();

/* =====================================================
   8. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   ===================================================== */
(function iniciarFormularioContacto() {
  const formulario = document.getElementById('formulario-contacto');
  if (!formulario) return;

  const mensajeExito = document.getElementById('mensaje-exito');

  function validarCampo(grupo) {
    const input = grupo.querySelector('input, textarea');
    if (!input) return true;

    const valor = input.value.trim();
    let valido = true;
    let error = '';

    if (input.required && !valor) {
      valido = false;
      error = 'Este campo es obligatorio.';
    } else if (input.type === 'email' && valor) {
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(valor)) {
        valido = false;
        error = 'Escribe un correo electrónico válido.';
      }
    } else if (input.minLength && valor.length < input.minLength) {
      valido = false;
      error = `Escribe al menos ${input.minLength} caracteres.`;
    }

    const msgEl = grupo.querySelector('.error-msg');
    if (msgEl) msgEl.textContent = error;
    grupo.classList.toggle('invalido', !valido);

    return valido;
  }

  formulario.querySelectorAll('.campo-grupo').forEach(function (grupo) {
    const input = grupo.querySelector('input, textarea');
    if (input) {
      input.addEventListener('blur', function () { validarCampo(grupo); });
      input.addEventListener('input', function () {
        if (grupo.classList.contains('invalido')) validarCampo(grupo);
      });
    }
  });

  formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    const grupos = formulario.querySelectorAll('.campo-grupo');
    let todoValido = true;

    grupos.forEach(function (grupo) {
      if (!validarCampo(grupo)) todoValido = false;
    });

    if (!todoValido) return;

    formulario.style.display = 'none';
    if (mensajeExito) mensajeExito.classList.add('visible');
  });
})();

/* =====================================================
   9. MODAL DEL MAPA CURRICULAR
   ===================================================== */
(function iniciarModalMapa() {
  const trigger = document.getElementById('mapa-trigger');
  const modal = document.getElementById('modal-mapa');
  const cerrar = document.getElementById('modal-cerrar');

  if (!trigger || !modal) return;

  trigger.addEventListener('click', function () {
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });

  function cerrarModal() {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
  }

  if (cerrar) cerrar.addEventListener('click', cerrarModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) cerrarModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarModal();
  });
})();

/* =====================================================
   10. VALIDACIÓN DE FORMULARIOS DE NEWSLETTER
   ===================================================== */
(function iniciarNewsletters() {
  const formularios = document.querySelectorAll('.form-newsletter');
  if (!formularios.length) return;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formularios.forEach(function (form) {
    const input = form.querySelector('input[type="email"]');
    const msgBox = form.querySelector('.newsletter-msg');

    if (!input || !msgBox) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const correo = input.value.trim();

      if (!correo) {
        msgBox.textContent = 'Por favor escribe tu correo electrónico.';
        msgBox.className = 'newsletter-msg error-msg visible';
        return;
      }

      if (!regexEmail.test(correo)) {
        msgBox.textContent = 'Escribe una dirección de correo válida.';
        msgBox.className = 'newsletter-msg error-msg visible';
        return;
      }

      msgBox.textContent = '¡Gracias por suscribirte! Recibirás nuestras novedades.';
      msgBox.className = 'newsletter-msg exito-msg visible';
      input.value = '';
    });
  });
})();

/* =====================================================
   11. BOTONES DE COMPARTIR Y COPIAR ENLACE
   ===================================================== */
(function iniciarBotonesCompartir() {
  document.addEventListener('click', function (e) {
    const btnCopiar = e.target.closest('.btn-copiar-enlace');
    if (btnCopiar) {
      e.preventDefault();
      const urlACompartir = btnCopiar.dataset.url || window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlACompartir).then(function () {
          mostrarToast('Enlace copiado');
        }).catch(function () {
          copiarAlPortapapelesFallBack(urlACompartir);
        });
      } else {
        copiarAlPortapapelesFallBack(urlACompartir);
      }
    }
  });

  function copiarAlPortapapelesFallBack(texto) {
    const tempInput = document.createElement('input');
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    mostrarToast('Enlace copiado');
  }

  function mostrarToast(mensaje) {
    let toast = document.getElementById('toast-notificacion');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notificacion';
      toast.className = 'toast-notificacion';
      document.body.appendChild(toast);
    }
    toast.textContent = mensaje;
    toast.classList.add('visible');

    setTimeout(function () {
      toast.classList.remove('visible');
    }, 2500);
  }
})();

/* =====================================================
   12. VISTA INDIVIDUAL DE ARTÍCULOS EN EL BLOG
   ===================================================== */
(function iniciarLectorBlog() {
  const vistaLista = document.getElementById('vista-lista-articulos');
  const vistaDetalle = document.getElementById('vista-articulo-detalle');

  if (!vistaLista || !vistaDetalle) return;

  function gestionarRutaArticulo() {
    const hash = window.location.hash.replace('#', '');
    const articulos = vistaDetalle.querySelectorAll('.articulo-item-completo');

    if (!hash || hash === 'todos' || hash === 'contenido-principal') {
      vistaLista.style.display = 'block';
      vistaDetalle.style.display = 'none';
      articulos.forEach(function (art) { art.style.display = 'none'; });
      return;
    }

    const articuloSeleccionado = vistaDetalle.querySelector(`#${hash}`);
    if (articuloSeleccionado) {
      vistaLista.style.display = 'none';
      vistaDetalle.style.display = 'block';
      articulos.forEach(function (art) { art.style.display = 'none'; });
      articuloSeleccionado.style.display = 'block';
      window.scrollTo({ top: vistaDetalle.offsetTop - 80, behavior: 'smooth' });
    } else {
      vistaLista.style.display = 'block';
      vistaDetalle.style.display = 'none';
    }
  }

  window.addEventListener('hashchange', gestionarRutaArticulo);
  window.addEventListener('DOMContentLoaded', gestionarRutaArticulo);
  gestionarRutaArticulo();

  document.addEventListener('click', function (e) {
    const btnVolver = e.target.closest('.btn-volver-blog');
    if (btnVolver) {
      e.preventDefault();
      history.pushState(null, '', window.location.pathname);
      gestionarRutaArticulo();
      window.scrollTo({ top: vistaLista.offsetTop - 80, behavior: 'smooth' });
    }
  });

  document.querySelectorAll('a[href="blog.html"]').forEach(function (enlace) {
    enlace.addEventListener('click', function () {
      if (window.location.hash) {
        setTimeout(function () {
          history.pushState(null, '', window.location.pathname);
          gestionarRutaArticulo();
        }, 10);
      }
    });
  });
})();

