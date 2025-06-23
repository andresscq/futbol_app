document.addEventListener('DOMContentLoaded', () => {
  const formPartido = document.getElementById('form-partido');
  const tablaBody = document.querySelector('#tabla-partidos tbody');
  const formContacto = document.getElementById('form-contacto');

  // Función para leer un archivo de imagen y devolver DataURL
  function leerImagen(input, callback) {
    const file = input.files[0];
    if (!file) return callback(null);

    const reader = new FileReader();
    reader.onload = e => callback(e.target.result);
    reader.readAsDataURL(file);
  }

  // Mostrar partidos en index.html
  function mostrarPartidos() {
    tablaBody.innerHTML = '';
    const partidos = JSON.parse(localStorage.getItem('partidos') || '[]');
    if (partidos.length === 0) {
      tablaBody.innerHTML = '<tr><td colspan="4">No hay partidos ingresados.</td></tr>';
      return;
    }
    partidos.forEach((p, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${p.logoA || ''}" class="mini-logo">${p.equipoA}</td>
        <td>vs</td>
        <td><img src="${p.logoB || ''}" class="mini-logo">${p.equipoB}</td>
        <td>${p.resultado}<br>
          <button onclick="eliminarPartido(${index})" class="btn eliminar">Eliminar</button>
        </td>
      `;
      tablaBody.appendChild(tr);
    });
  }

  // Manejo del formulario de partido
  if (formPartido) {
    formPartido.addEventListener('submit', e => {
      e.preventDefault();
      // Leer imágenes y luego guardar
      const resultado = document.getElementById('resultado').value.trim();
      if (!/^\d+\s*-\s*\d+$/.test(resultado)) {
        alert('El resultado debe tener solo números y un guion (ejemplo: 2-1).');
        return;
      }
      leerImagen(document.getElementById('logoA'), dataA => {
        leerImagen(document.getElementById('logoB'), dataB => {
          const partidos = JSON.parse(localStorage.getItem('partidos') || '[]');
          partidos.push({
            equipoA: document.getElementById('equipoA').value,
            logoA: dataA,
            equipoB: document.getElementById('equipoB').value,
            logoB: dataB,
            resultado: resultado
          });
          localStorage.setItem('partidos', JSON.stringify(partidos));
          window.location.href = 'index.html';
        });
      });
    });
  }

  // Manejo del formulario de contacto
  if (formContacto) {
    formContacto.addEventListener('submit', e => {
      e.preventDefault();
      alert('¡Gracias por tu mensaje!');
      formContacto.reset();
    });
  }

  // Si estamos en index.html, muestra partidos
  if (tablaBody) {
    mostrarPartidos();
  }
});

function eliminarPartido(index) {
  const partidos = JSON.parse(localStorage.getItem('partidos') || '[]');
  partidos.splice(index, 1);
  localStorage.setItem('partidos', JSON.stringify(partidos));
  location.reload();
}
