/**
 * BUSQUEDA.JS — Tu lugar en Software
 * Motor de búsqueda local en JavaScript puro
 * Sin dependencias externas ni backend
 */

(function iniciarBusquedaGlobal() {
  /* =====================================================
     1. ÍNDICE COMPLETO DEL SITIO WEB
     ===================================================== */
  const INDICE_BUSQUEDA = [
    /* Página de Inicio */
    {
      titulo: 'Bienvenida al blog Tu lugar en Software',
      descripcion: 'Conoce todo sobre la carrera de Ingeniería en Software en ITSON y el ciclo de vida de los sistemas',
      url: 'index.html#contenido-principal',
      tags: ['inicio', 'bienvenida', 'itson', 'software', 'carrera', 'presentacion']
    },
    {
      titulo: 'Por qué estudiar Ingeniería en Software',
      descripcion: 'Descubre las razones para elegir esta carrera apasionante y con gran futuro profesional',
      url: 'index.html#tarjetas-destacadas',
      tags: ['estudiar', 'por que', 'futuro', 'carrera', 'beneficios', 'oportunidades']
    },

    /* El ciclo de vida */
    {
      titulo: 'Qué es el ciclo de vida del software',
      descripcion: 'Concepto fundamental y visión general del proceso de creación de aplicaciones',
      url: 'ciclo-de-vida.html#que-es',
      tags: ['ciclo de vida', 'definicion', 'que es', 'fundamentos', 'proceso']
    },
    {
      titulo: 'Las 8 fases del ciclo de vida',
      descripcion: 'Explora desde la comunicación inicial hasta el mantenimiento continuo de un sistema',
      url: 'ciclo-de-vida.html#fases',
      tags: ['fases', '8 fases', 'analisis', 'diseno', 'codificacion', 'pruebas', 'despliegue', 'mantenimiento']
    },
    {
      titulo: 'Ventajas y desventajas del ciclo de vida',
      descripcion: 'Comparativa clara sobre los beneficios de estructurar el desarrollo de software',
      url: 'ciclo-de-vida.html#ventajas-desventajas',
      tags: ['ventajas', 'desventajas', 'beneficios', 'pros', 'contras', 'metodologia']
    },
    {
      titulo: 'Quiz interactivo del ciclo de vida',
      descripcion: 'Pone a prueba tus conocimientos sobre las fases del desarrollo de software',
      url: 'ciclo-de-vida.html#quiz-seccion',
      tags: ['quiz', 'evaluacion', 'preguntas', 'interactivo', 'test', 'repaso']
    },

    /* Roles del equipo */
    {
      titulo: 'Analista de sistemas',
      descripcion: 'Descubre las necesidades del usuario y las transforma en requerimientos claros',
      url: 'roles.html#analista',
      tags: ['analista', 'requerimientos', 'cliente', 'sistemas', 'entrevistas', 'negocio']
    },
    {
      titulo: 'Tester de software',
      descripcion: 'Asegura la calidad del producto probando cada función antes del lanzamiento',
      url: 'roles.html#tester',
      tags: ['tester', 'pruebas', 'qa', 'calidad', 'bugs', 'errores', 'testing']
    },
    {
      titulo: 'Arquitecto y programador de software',
      descripcion: 'Diseña la estructura del sistema y escribe el código fuente que le da vida',
      url: 'roles.html#arquitecto-programador',
      tags: ['arquitecto', 'programador', 'desarrollador', 'codigo', 'estructura', 'backend', 'frontend']
    },
    {
      titulo: 'Líder de proyecto',
      descripcion: 'Coordina los tiempos y el talento del equipo para lograr el éxito del software',
      url: 'roles.html#lider',
      tags: ['lider', 'gestor', 'project manager', 'coordinador', 'scrum', 'equipo']
    },
    {
      titulo: 'Diseñador de sistemas interactivos',
      descripcion: 'Crea interfaces visuales atractivas y experiencias sencillas de usar',
      url: 'roles.html#disenador',
      tags: ['disenador', 'ux', 'ui', 'experiencia de usuario', 'interfaz', 'grafico']
    },

    /* Recursos y plan de estudios */
    {
      titulo: 'Plan de estudios 2023 de Ingeniería en Software ITSON',
      descripcion: 'Revisa la estructura curricular moderna diseñada para los retos actuales de la industria',
      url: 'recursos.html#plan-estudios',
      tags: ['plan de estudios', '2023', 'itson', 'carrera', 'competencias', 'perfil']
    },
    {
      titulo: 'Materias por semestre',
      descripcion: 'Desglose detallado de las asignaturas que llevarás del primer al octavo semestre',
      url: 'recursos.html#materias-semestre',
      tags: ['materias', 'semestre', 'acordeon', 'asignaturas', 'programacion', 'base de datos']
    },
    {
      titulo: 'Requisitos de titulación',
      descripcion: 'Conoce los créditos y proyectos necesarios para obtener tu título profesional',
      url: 'recursos.html#requisitos-titulacion',
      tags: ['titulacion', 'requisitos', 'creditos', 'practicas', 'servicio social', 'egreso']
    },
    {
      titulo: 'Mapa curricular visual',
      descripcion: 'Visualiza la ruta completa de tu aprendizaje universitario en una sola imagen',
      url: 'recursos.html#mapa-curricular',
      tags: ['mapa curricular', 'diagrama', 'reticula', 'materias', 'modal']
    },

    /* Entradas del Blog */
    {
      titulo: 'ITSON y la carrera de Ingeniería en Software',
      descripcion: 'Conoce por qué el Instituto Tecnológico de Sonora es la mejor opción para formarte',
      url: 'blog.html#itson-carrera',
      tags: ['itson', 'carrera', 'articulo', 'universidad', 'sonora', 'prestigio']
    },
    {
      titulo: 'Cómo nace una aplicación de software',
      descripcion: 'Desde la primera idea hasta que los usuarios la descargan en sus teléfonos',
      url: 'blog.html#como-nace-app',
      tags: ['nace app', 'creacion', 'articulo', 'proceso', 'aplicaciones', 'movil']
    },
    {
      titulo: 'Aprende semestre a semestre en ITSON',
      descripcion: 'Guía práctica para aprovechar cada materia y proyecto durante tu estancia estudiantil',
      url: 'blog.html#aprende-semestre',
      tags: ['aprende', 'consejos', 'estudiantes', 'guia', 'consejos estudiantiles']
    },
    {
      titulo: 'Mitos y realidades sobre aprender a programar',
      descripcion: 'Desmontamos las creencias falsas sobre las matemáticas y el trabajo en el mundo del desarrollo',
      url: 'blog.html#mitos-programacion',
      tags: ['mitos', 'programar', 'matematicas', 'soledad', 'creatividad', 'aprender']
    },
    {
      titulo: 'Frontend y Backend — Dos mundos que construyen una app',
      descripcion: 'Conoce la interacción entre el diseño visual de las interfaces y la seguridad de los servidores',
      url: 'blog.html#frontend-backend',
      tags: ['frontend', 'backend', 'fullstack', 'servidores', 'css', 'javascript', 'interfaz']
    },
    {
      titulo: 'Cómo prepararte para tu primer año de universidad',
      descripcion: 'Estrategias de organización del tiempo y formación de equipos de estudio para triunfar en ITSON',
      url: 'blog.html#primer-ano-universidad',
      tags: ['primer ano', 'universidad', 'adaptacion', 'estudio', 'habitos', 'itson']
    },
    {
      titulo: 'El papel de la Inteligencia Artificial en el software',
      descripcion: 'Descubre por qué las herramientas inteligentes impulsan la productividad sin reemplazar a los ingenieros',
      url: 'blog.html#inteligencia-artificial',
      tags: ['inteligencia artificial', 'ia', 'futuro', 'copiloto', 'automatizacion', 'tecnologia']
    },
    {
      titulo: 'De estudiante a profesional — Construye tu portafolio',
      descripcion: 'Aprende a transformar tus proyectos escolares en una carta de presentación que atraiga a reclutadores',
      url: 'blog.html#construir-portafolio',
      tags: ['portafolio', 'empleo', 'github', 'linkedin', 'proyectos', 'profesional']
    },

    /* Contacto */
    {
      titulo: 'Formulario de contacto',
      descripcion: 'Envía tus dudas o comentarios al equipo universitario',
      url: 'contacto.html#formulario-contacto',
      tags: ['contacto', 'formulario', 'mensaje', 'dudas', 'preguntas']
    },
    {
      titulo: 'Voces invitadas de la comunidad ITSON',
      descripcion: 'Testimonios reales de egresados y docentes de la carrera',
      url: 'contacto.html#voces-invitadas',
      tags: ['voces', 'testimonios', 'egresados', 'docentes', 'experiencias']
    },
    {
      titulo: 'Equipo de desarrollo del blog',
      descripcion: 'Conoce a los estudiantes de Ingeniería en Software creadores de este sitio',
      url: 'contacto.html#equipo-desarrollo',
      tags: ['equipo', 'creadores', 'estudiantes', 'itson', 'autores']
    }
  ];

  /* =====================================================
     2. FUNCIONES DE BÚSQUEDA Y NORMALIZACIÓN
     ===================================================== */
  function normalizarTexto(texto) {
    if (!texto) return '';
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function buscarEnIndice(consulta) {
    const termino = normalizarTexto(consulta).trim();
    if (!termino) return [];

    return INDICE_BUSQUEDA.filter(function (item) {
      const tituloNorm = normalizarTexto(item.titulo);
      const descNorm = normalizarTexto(item.descripcion);
      const tagsNorm = item.tags.map(normalizarTexto);

      return (
        tituloNorm.includes(termino) ||
        descNorm.includes(termino) ||
        tagsNorm.some(function (tag) { return tag.includes(termino); })
      );
    });
  }

  /* =====================================================
     3. VINCULACIÓN CON EL DOM Y EVENTOS
     ===================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    const inputBusqueda = document.getElementById('input-busqueda-global');
    const panelResultados = document.getElementById('panel-busqueda-resultados');
    const btnToggleMovil = document.getElementById('btn-buscar-toggle');
    const contenedorBusqueda = document.querySelector('.busqueda-contenedor');

    if (!inputBusqueda || !panelResultados) return;

    let indiceSeleccionado = -1;

    /* Desplegar búsqueda en móvil */
    if (btnToggleMovil && contenedorBusqueda) {
      btnToggleMovil.addEventListener('click', function () {
        const estaAbierta = contenedorBusqueda.classList.toggle('activa-movil');
        btnToggleMovil.setAttribute('aria-expanded', estaAbierta);
        if (estaAbierta) {
          inputBusqueda.focus();
        }
      });
    }

    /* Evento de escritura */
    inputBusqueda.addEventListener('input', function () {
      const resultados = buscarEnIndice(this.value);
      renderizarResultados(resultados, this.value.trim());
    });

    /* Renderizar resultados en el panel */
    function renderizarResultados(resultados, consulta) {
      indiceSeleccionado = -1;

      if (!consulta) {
        panelResultados.classList.remove('visible');
        panelResultados.innerHTML = '';
        inputBusqueda.setAttribute('aria-expanded', 'false');
        return;
      }

      panelResultados.classList.add('visible');
      inputBusqueda.setAttribute('aria-expanded', 'true');

      if (resultados.length === 0) {
        panelResultados.innerHTML = `
          <div class="busqueda-sin-resultados" role="status">
            <p>No encontramos resultados para <strong>"${escaparHTML(consulta)}"</strong></p>
          </div>
        `;
        return;
      }

      let html = '<ul class="busqueda-lista-resultados" role="listbox">';
      resultados.forEach(function (item, index) {
        html += `
          <li role="option" id="res-opt-${index}" class="busqueda-item-opcion">
            <a href="${item.url}" class="busqueda-enlace-resultado" tabindex="-1">
              <strong class="busqueda-titulo-res">${escaparHTML(item.titulo)}</strong>
              <span class="busqueda-desc-res">${escaparHTML(item.descripcion)}</span>
            </a>
          </li>
        `;
      });
      html += '</ul>';

      panelResultados.innerHTML = html;
    }

    function escaparHTML(str) {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    /* Navegación por teclado (Flechas, Enter, Escape) */
    inputBusqueda.addEventListener('keydown', function (e) {
      const items = panelResultados.querySelectorAll('.busqueda-item-opcion');
      if (!items.length) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        indiceSeleccionado = (indiceSeleccionado + 1) % items.length;
        actualizarSeleccionTeclado(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        indiceSeleccionado = (indiceSeleccionado - 1 + items.length) % items.length;
        actualizarSeleccionTeclado(items);
      } else if (e.key === 'Enter') {
        if (indiceSeleccionado >= 0 && items[indiceSeleccionado]) {
          e.preventDefault();
          const enlace = items[indiceSeleccionado].querySelector('a');
          if (enlace) window.location.href = enlace.href;
        } else if (items.length > 0) {
          e.preventDefault();
          const enlace = items[0].querySelector('a');
          if (enlace) window.location.href = enlace.href;
        }
      } else if (e.key === 'Escape') {
        cerrarBusqueda();
      }
    });

    function actualizarSeleccionTeclado(items) {
      items.forEach(function (el, i) {
        if (i === indiceSeleccionado) {
          el.classList.add('seleccionado');
          el.scrollIntoView({ block: 'nearest' });
          inputBusqueda.setAttribute('aria-activedescendant', `res-opt-${i}`);
        } else {
          el.classList.remove('seleccionado');
        }
      });
    }

    function cerrarBusqueda() {
      panelResultados.classList.remove('visible');
      inputBusqueda.setAttribute('aria-expanded', 'false');
      if (contenedorBusqueda) contenedorBusqueda.classList.remove('activa-movil');
    }

    /* Cerrar al presionar Escape en cualquier lado */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') cerrarBusqueda();
    });

    /* Cerrar al hacer clic fuera de la búsqueda */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.busqueda-contenedor')) {
        cerrarBusqueda();
      }
    });
  });
})();
