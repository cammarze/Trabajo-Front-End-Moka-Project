
// const botonesCarrito = document.querySelectorAll('.info button');

// const contadorProductos = document.getElementById('contador-productos');

// let totalProductos = 0;


// botonesCarrito.forEach((boton) => {
//   boton.addEventListener('click', () => {
//     totalProductos++; 
//     contadorProductos.textContent = totalProductos; 
//   });
// });


const formulario = document.querySelector('.contacto-formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (nombre === '' || email === '' || mensaje === '') {
    alert('Por favor, completa todos los campos');
    return;
  }

  // email valido
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email)) {
    alert('Por favor, ingresa un correo válido');
    return;
  }
  alert(`¡Gracias ${nombre}! Tu mensaje fue enviado correctamente.`);
  formulario.reset();
});
