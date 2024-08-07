import './sass/main.scss';
import Handlebars from 'handlebars';

const start = async () => {
  try {
    const respuesta = await fetch('templates/card.hbs');

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la plantilla');
    }

    const plantilla = await respuesta.text();

    const template = Handlebars.compile(plantilla);

    //const respuestaBack = await fetch('http://localhost:8080/productos/');

    const respuestaBack = await fetch(
      'https://66b2d8d47fba54a5b7ea9912.mockapi.io/api/integrador/backend/',
    );

    if (!respuestaBack.ok) {
      throw new Error('Algo paso con los productos', respuestaBack.status);
    }

    const dataProductos = await respuestaBack.json();

    const data = { productos: dataProductos };

    const html = template(data);

    console.log(html);

    const contenedorCards = document.querySelector('#contenedor-cards');

    contenedorCards.innerHTML = html;
  } catch (error) {
    console.log('[start]:', error);
  }
};

window.addEventListener('DOMContentLoaded', start);
