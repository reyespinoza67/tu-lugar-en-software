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
   7. MINI QUIZ DEL CICLO DE VIDA CON BASE DE DATOS Y LÍDERES
   Un solo intento por participante y tabla de líderes en Firebase
   ===================================================== */
(function iniciarQuiz() {
  const formQuiz = document.getElementById('form-quiz');
  const pantallaInicio = document.getElementById('quiz-pantalla-inicio');
  const inputNombre = document.getElementById('quiz-nombre-usuario');
  const btnComenzar = document.getElementById('btn-comenzar-quiz');
  const btnCalificar = document.getElementById('btn-calificar');
  const divResultado = document.getElementById('quiz-resultado');
  const tbodyScores = document.getElementById('tabla-scores-body');

  if (!formQuiz || !btnCalificar) return;

  const FIREBASE_DB_URL = 'https://tu-lugar-en-software-default-rtdb.firebaseio.com';

  const respuestasCorrectas = {
    q1: 'b',
    q2: 'c',
    q3: 'a',
    q4: 'd',
    q5: 'b'
  };

  let nombreParticipanteActual = '';

  // 1. Cargar y renderizar la tabla de líderes desde Firebase o almacenamiento local
  cargarTablaLideres();

  // 2. Comprobar si este usuario ya completó el quiz anteriormente
  const intentoPrevio = obtenerIntentoPrevio();
  if (intentoPrevio) {
    bloquearQuizPorIntentoPrevio(intentoPrevio);
  }

  // 3. Comenzar el quiz tras validar el nombre
  if (btnComenzar && inputNombre) {
    btnComenzar.addEventListener('click', function () {
      const nombre = inputNombre.value.trim();
      if (!nombre || nombre.length < 2) {
        alert('Por favor escribe tu nombre completo antes de iniciar el quiz.');
        inputNombre.focus();
        return;
      }
      nombreParticipanteActual = nombre;
      if (pantallaInicio) pantallaInicio.style.display = 'none';
      formQuiz.style.display = 'block';
      formQuiz.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    inputNombre.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        btnComenzar.click();
      }
    });
  }

  // 4. Calificar el quiz
  btnCalificar.addEventListener('click', async function () {
    // Si ya había completado el quiz, no procesar
    if (obtenerIntentoPrevio()) {
      alert('Solo se permite un intento por estudiante.');
      return;
    }

    let aciertos = 0;
    let respondidas = 0;

    // Limpia estados visuales anteriores
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
          if (opcionEl) opcionEl.classList.add('correcta');
        } else {
          if (opcionEl) opcionEl.classList.add('incorrecta');
          const correcta = formQuiz.querySelector(
            `input[name="${nombre}"][value="${respuestasCorrectas[nombre]}"]`
          );
          if (correcta) {
            const opCorrectaEl = correcta.closest('.quiz-opcion');
            if (opCorrectaEl) opCorrectaEl.classList.add('correcta');
          }
        }
      }
    });

    if (respondidas < Object.keys(respuestasCorrectas).length) {
      divResultado.innerHTML = '<p style="color: #B91C1C; font-weight: 600;">Por favor responde las 5 preguntas antes de calificar tu intento.</p>';
      divResultado.classList.add('visible');
      divResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Deshabilitar todas las opciones para que no puedan modificarse
    formQuiz.querySelectorAll('input[type="radio"]').forEach(function (radio) {
      radio.disabled = true;
    });
    btnCalificar.disabled = true;
    btnCalificar.style.display = 'none';

    const total = Object.keys(respuestasCorrectas).length;
    const porcentaje = Math.round((aciertos / total) * 100);
    const fechaHoy = new Date().toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const registroResultado = {
      nombre: nombreParticipanteActual || 'Estudiante anónimo',
      aciertos: aciertos,
      total: total,
      porcentaje: porcentaje,
      fecha: fechaHoy,
      timestamp: Date.now()
    };

    // Guardar en localStorage para bloquear futuros intentos en este navegador
    try {
      localStorage.setItem('quiz_completado', JSON.stringify(registroResultado));
    } catch (e) {
      console.warn('Error al guardar estado de quiz en localStorage', e);
    }

    // Mensaje de retroalimentación
    let mensaje = '';
    if (porcentaje === 100) {
      mensaje = 'Dominaste el ciclo de vida del software con excelencia.';
    } else if (porcentaje >= 60) {
      mensaje = 'Buen trabajo. Tienes bases sólidas del ciclo de vida.';
    } else {
      mensaje = 'Has completado el quiz. Continúa explorando los recursos del blog para fortalecer tus conocimientos.';
    }

    divResultado.innerHTML = `
      <div style="background: #FAF8FE; border: 2px solid var(--morado-profundo); padding: 1.5rem; text-align: center;">
        <p style="font-size: 2.2rem; margin-bottom: 0.5rem;">${porcentaje >= 80 ? '🏆' : porcentaje >= 60 ? '👏' : '💡'}</p>
        <h3 style="color: var(--azul-marino); margin-bottom: 0.4rem;">${escaparHTML(registroResultado.nombre)}</h3>
        <p style="font-size: 1.2rem; font-weight: 700; color: var(--morado-profundo);">${aciertos} de ${total} aciertos — ${porcentaje}%</p>
        <p style="margin-top: 0.5rem; color: #555577;">${mensaje}</p>
        <p style="margin-top: 0.8rem; font-size: 0.85rem; color: #888899;">Tu resultado ha quedado registrado en la tabla de líderes. No se admiten intentos adicionales.</p>
      </div>
    `;
    divResultado.classList.add('visible');
    divResultado.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Enviar a Firebase Realtime Database
    await registrarEnFirebase(registroResultado);

    // Recargar tabla de líderes con los datos actualizados
    await cargarTablaLideres();
  });

  function obtenerIntentoPrevio() {
    try {
      const guardado = localStorage.getItem('quiz_completado');
      return guardado ? JSON.parse(guardado) : null;
    } catch (e) {
      return null;
    }
  }

  function bloquearQuizPorIntentoPrevio(datos) {
    if (pantallaInicio) pantallaInicio.style.display = 'none';
    if (formQuiz) formQuiz.style.display = 'none';

    divResultado.innerHTML = `
      <div style="background: #F4F4F8; border: 2px solid #B9A3E3; padding: 1.5rem; text-align: center; margin-bottom: 2rem;">
        <p style="font-size: 2rem; margin-bottom: 0.4rem;">🔒</p>
        <h3 style="color: var(--azul-marino); margin-bottom: 0.3rem;">Quiz ya completado</h3>
        <p style="font-size: 0.95rem; color: #3D3D5C; margin-bottom: 0.5rem;">
          <strong>${escaparHTML(datos.nombre || 'Estudiante')}</strong> — obtuviste <strong>${datos.aciertos} de ${datos.total || 5} aciertos</strong> (${datos.porcentaje}%) el ${escaparHTML(datos.fecha || '')}.
        </p>
        <p style="font-size: 0.85rem; color: #666688;">
          Para garantizar la equidad en el ranking, cada participante tiene un solo intento disponible. Consulta tu lugar en la tabla de líderes a continuación.
        </p>
      </div>
    `;
    divResultado.classList.add('visible');
  }

  async function registrarEnFirebase(datos) {
    try {
      const url = `${FIREBASE_DB_URL}/quiz_scores.json`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
    } catch (error) {
      console.warn('Error al enviar puntaje a Firebase', error);
      // Guardar en respaldo local si falla la red
      try {
        const scoresLocales = JSON.parse(localStorage.getItem('quiz_scores_respaldo') || '[]');
        scoresLocales.push(datos);
        localStorage.setItem('quiz_scores_respaldo', JSON.stringify(scoresLocales));
      } catch (e) {}
    }
  }

  async function cargarTablaLideres() {
    if (!tbodyScores) return;

    let lista = [];

    try {
      const respuesta = await fetch(`${FIREBASE_DB_URL}/quiz_scores.json`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        if (datos && typeof datos === 'object') {
          lista = Object.keys(datos).map(function (k) { return datos[k]; });
        }
      }
    } catch (e) {
      console.warn('Error al conectar con Firebase leaderboard', e);
    }

    // Agregar registros de respaldo local si existieran
    try {
      const respaldo = JSON.parse(localStorage.getItem('quiz_scores_respaldo') || '[]');
      respaldo.forEach(function (r) {
        const yaExiste = lista.some(function (item) {
          return item.nombre === r.nombre && item.timestamp === r.timestamp;
        });
        if (!yaExiste) lista.push(r);
      });
    } catch (e) {}

    // Semillas demostrativas si la base de datos estuviera vacía al inicio
    if (lista.length === 0) {
      lista = [
        { nombre: 'Sofía Valenzuela', aciertos: 5, total: 5, porcentaje: 100, fecha: '12 de oct. de 2026', timestamp: 1 },
        { nombre: 'Carlos Mendoza', aciertos: 5, total: 5, porcentaje: 100, fecha: '12 de oct. de 2026', timestamp: 2 },
        { nombre: 'Mariana Duarte', aciertos: 4, total: 5, porcentaje: 80, fecha: '11 de oct. de 2026', timestamp: 3 },
        { nombre: 'Jorge Félix', aciertos: 4, total: 5, porcentaje: 80, fecha: '10 de oct. de 2026', timestamp: 4 },
        { nombre: 'Valeria Bojórquez', aciertos: 3, total: 5, porcentaje: 60, fecha: '9 de oct. de 2026', timestamp: 5 }
      ];
    }

    // Ordenar de mayor a menor puntaje, luego por timestamp más antiguo
    lista.sort(function (a, b) {
      if ((b.aciertos || 0) !== (a.aciertos || 0)) {
        return (b.aciertos || 0) - (a.aciertos || 0);
      }
      return (a.timestamp || 0) - (b.timestamp || 0);
    });

    // Renderizar los 10 mejores
    const top10 = lista.slice(0, 10);
    tbodyScores.innerHTML = '';

    top10.forEach(function (item, index) {
      const tr = document.createElement('tr');
      let medalla = '';
      if (index === 0) medalla = '🥇 1º';
      else if (index === 1) medalla = '🥈 2º';
      else if (index === 2) medalla = '🥉 3º';
      else medalla = `${index + 1}º`;

      tr.innerHTML = `
        <td style="font-weight: 700; color: var(--morado-profundo);">${medalla}</td>
        <td style="font-weight: 600; color: var(--azul-marino);">${escaparHTML(item.nombre || 'Participante')}</td>
        <td><span style="display: inline-block; background: #EDE9FE; color: #4B2A8C; padding: 0.2rem 0.6rem; font-weight: 700; font-size: 0.85rem;">${item.aciertos || 0}/5 (${item.porcentaje || 0}%)</span></td>
        <td style="color: #666688; font-size: 0.82rem;">${escaparHTML(item.fecha || 'Reciente')}</td>
      `;
      tbodyScores.appendChild(tr);
    });
  }

  function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto || '';
    return div.innerHTML;
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
  const triggerBtn = document.getElementById('mapa-trigger-btn');
  const modal = document.getElementById('modal-mapa');
  const cerrar = document.getElementById('modal-cerrar');

  if (!modal) return;

  function abrirModal() {
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  if (trigger) trigger.addEventListener('click', abrirModal);
  if (triggerBtn) triggerBtn.addEventListener('click', abrirModal);

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

/* =====================================================
   13. GESTOR DE COMENTARIOS FUNCIONAL
   Soporte con Firebase Realtime Database y respaldo local
   ===================================================== */
(function iniciarGestorComentarios() {
  const formularios = document.querySelectorAll('.form-comentario');
  if (!formularios.length) return;

  // Base de datos en la nube (Firebase Realtime Database REST API)
  // El usuario puede configurar aquí la URL de su proyecto Firebase gratuito en 1 minuto
  const FIREBASE_DB_URL = 'https://tu-lugar-en-software-default-rtdb.firebaseio.com';

  formularios.forEach(function (form) {
    const seccionId = form.getAttribute('data-seccion') || 'general';
    const contenedorLista = document.querySelector(`.lista-comentarios[data-seccion="${seccionId}"]`);
    if (!contenedorLista) return;

    // 1. Cargar comentarios locales inmediatos
    let comentariosLocales = [];
    try {
      comentariosLocales = JSON.parse(localStorage.getItem(`comentarios_${seccionId}`) || '[]');
      comentariosLocales.forEach(function (coment) {
        agregarTarjetaComentario(contenedorLista, coment, false);
      });
    } catch (e) {
      console.warn('Error al leer almacenamiento local', e);
    }

    if (comentariosLocales.length === 0) {
      verificarEstadoVacio(contenedorLista);
    }

    // 2. Intentar sincronizar con la base de datos en la nube de forma asíncrona
    sincronizarConNube(seccionId, contenedorLista, comentariosLocales);
  });

  async function sincronizarConNube(seccionId, contenedorLista, comentariosLocales) {
    try {
      const dbUrl = FIREBASE_DB_URL.replace(/\/+$/, '');
      const respuesta = await fetch(`${dbUrl}/comentarios/${seccionId}.json`);
      if (!respuesta.ok) return;
      const datosNube = await respuesta.json();
      if (datosNube && typeof datosNube === 'object') {
        const listaRemota = Object.keys(datosNube).map(function (llave) {
          return datosNube[llave];
        });

        if (listaRemota.length > 0) {
          listaRemota.sort(function (a, b) {
            return (a.timestamp || 0) - (b.timestamp || 0);
          });

          contenedorLista.innerHTML = '';
          listaRemota.forEach(function (comentarioRemoto) {
            agregarTarjetaComentario(contenedorLista, comentarioRemoto, false);
          });

          try {
            localStorage.setItem(`comentarios_${seccionId}`, JSON.stringify(listaRemota));
          } catch (e) {}
        } else {
          verificarEstadoVacio(contenedorLista);
        }
      } else {
        verificarEstadoVacio(contenedorLista);
      }
    } catch (errorRed) {
      verificarEstadoVacio(contenedorLista);
    }
  }

  document.addEventListener('submit', function (e) {
    const form = e.target.closest('.form-comentario');
    if (!form) return;

    e.preventDefault();
    const seccionId = form.getAttribute('data-seccion') || 'general';
    const inputNombre = form.querySelector('.input-nombre');
    const selectRol = form.querySelector('.select-rol');
    const inputMensaje = form.querySelector('.input-mensaje');
    const contenedorLista = document.querySelector(`.lista-comentarios[data-seccion="${seccionId}"]`);

    if (!inputNombre || !inputMensaje || !contenedorLista) return;

    const nombre = inputNombre.value.trim();
    const rol = selectRol ? selectRol.value : 'Comunidad';
    const mensaje = inputMensaje.value.trim();

    if (!nombre || !mensaje) {
      mostrarToast('Por favor escribe tu nombre y tu mensaje antes de enviar');
      return;
    }

    const fechaHoy = new Date().toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const nuevoComentario = {
      nombre: nombre,
      rol: rol,
      fecha: fechaHoy,
      mensaje: mensaje,
      timestamp: Date.now()
    };

    // Renderizar en pantalla inmediatamente con animación
    agregarTarjetaComentario(contenedorLista, nuevoComentario, true);

    // Guardar en almacenamiento local
    try {
      const existentes = JSON.parse(localStorage.getItem(`comentarios_${seccionId}`) || '[]');
      existentes.push(nuevoComentario);
      localStorage.setItem(`comentarios_${seccionId}`, JSON.stringify(existentes));
    } catch (err) {
      console.warn('Error al guardar comentario local', err);
    }

    // Enviar a la base de datos en la nube
    enviarANube(seccionId, nuevoComentario);

    inputNombre.value = '';
    inputMensaje.value = '';
    mostrarToast('Comentario publicado con éxito');
  });

  async function enviarANube(seccionId, comentario) {
    try {
      const dbUrl = FIREBASE_DB_URL.replace(/\/+$/, '');
      await fetch(`${dbUrl}/comentarios/${seccionId}.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentario)
      });
    } catch (errorNube) {
      // El comentario ya está seguro en el almacenamiento local
    }
  }

  function verificarEstadoVacio(contenedor) {
    if (!contenedor.querySelector('.tarjeta-comentario') && !contenedor.querySelector('.comentario-vacio')) {
      const vacio = document.createElement('div');
      vacio.className = 'comentario-vacio';
      vacio.innerHTML = `
        <svg class="comentario-vacio-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <p>Aún no hay comentarios publicados en este espacio. ¡Sé la primera persona en compartir tu opinión!</p>
      `;
      contenedor.appendChild(vacio);
    }
  }

  function agregarTarjetaComentario(contenedor, datos, animar) {
    const estadoVacio = contenedor.querySelector('.comentario-vacio');
    if (estadoVacio) {
      estadoVacio.remove();
    }

    const tarjeta = document.createElement('article');
    tarjeta.className = 'tarjeta-comentario';
    if (animar) tarjeta.style.animation = 'fadeInUp 0.4s ease-out';

    const iniciales = (datos.nombre || 'U')
      .trim()
      .split(/\s+/)
      .map(function (palabra) { return palabra[0]; })
      .slice(0, 2)
      .join('')
      .toUpperCase();

    tarjeta.innerHTML = `
      <div class="comentario-avatar" aria-hidden="true">${iniciales}</div>
      <div class="comentario-cuerpo">
        <div class="comentario-cabecera">
          <span class="comentario-autor">${escaparHTML(datos.nombre)}</span>
          <span class="comentario-rol">${escaparHTML(datos.rol)}</span>
          <span class="comentario-fecha">${escaparHTML(datos.fecha)}</span>
        </div>
        <p class="comentario-texto">${escaparHTML(datos.mensaje)}</p>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  }

  function escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto || '';
    return div.innerHTML;
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


