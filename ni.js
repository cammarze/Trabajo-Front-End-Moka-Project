document.addEventListener('DOMContentLoaded', () => {
  const esIndex = document.querySelectorAll('.item').length > 0;
  const contador = document.getElementById('contador-productos');
  let carrito = JSON.parse(localStorage.getItem('productos')) || [];
  let precio = parseFloat(localStorage.getItem('total')) || 0;

  if (contador) {
    contador.textContent = carrito.length;
  }

  if (esIndex) {
    const cards = document.querySelectorAll('.item');

    cards.forEach(card => {
      const btn = card.querySelector('button');
      const nombre = card.querySelector('strong').textContent;
      const precioTexto = card.querySelectorAll('strong')[1].textContent.replace('$', '');
      const precioUnitario = parseFloat(precioTexto);

      btn.addEventListener('click', () => {
        const producto = {
          title: nombre,
          price: precioUnitario,
          cantidad: 1
        };

        carrito.push(producto);
        precio += producto.price;

        localStorage.setItem('productos', JSON.stringify(carrito));
        localStorage.setItem('total', precio.toFixed(2));

        if (contador) {
          contador.textContent = carrito.length;
        }
      });
    });
  }
  const btnVaciar = document.getElementById('vaciar-carrito');

    if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
        localStorage.removeItem('productos');
        localStorage.removeItem('total');
        location.reload();
    });
    }

  const contenedor = document.querySelector('.productos');
  if (contenedor) {
    const resumen = {};

    carrito.forEach(prod => {
      if (resumen[prod.title]) {
        resumen[prod.title].cantidad += 1;
      } else {
        resumen[prod.title] = { ...prod };
      }
    });

    for (let nombre in resumen) {
      const prod = resumen[nombre];
      const item = document.createElement('div');
      item.classList.add('item-carrito');

      item.innerHTML = `
        <p>
            <strong>${prod.title}</strong>
            <button class="quitar-uno" data-titulo="${prod.title}"> - </button>
            <strong>${ prod.cantidad }</strong> 
            <button class="agregar-uno" data-titulo="${prod.title}"> + </button>
        </p>
        <p>Precio unitario: $${prod.price.toFixed(2)}</p>
        <p>Total: $${(prod.price * prod.cantidad).toFixed(2)}</p>
        <hr>
        `;
      contenedor.appendChild(item);
    }


    let total = 0;
    for (let nombre in resumen) {
      const prod = resumen[nombre];
      total += prod.price * prod.cantidad;
    }

    const totalElement = document.createElement('div');
    totalElement.classList.add('total-pagar');
    totalElement.innerHTML = `<h3>Total a pagar: $${total.toFixed(2)}</h3>`;
    contenedor.appendChild(totalElement);
  }

    const botonesQuitar = document.querySelectorAll('.quitar-uno');

        botonesQuitar.forEach(boton => {
        boton.addEventListener('click', () => {
            const titulo = boton.getAttribute('data-titulo');

            let carrito = JSON.parse(localStorage.getItem('productos')) || [];


            const index = carrito.findIndex(prod => prod.title === titulo);

            if (index !== -1) {
            carrito.splice(index, 1); //uno solo
            }

            const nuevoTotal = carrito.reduce((acc, prod) => acc + prod.price, 0);

            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('total', nuevoTotal.toFixed(2));

            location.reload();
        });
    });


    const botonesAgregar = document.querySelectorAll('.agregar-uno');

        botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const titulo = boton.getAttribute('data-titulo');

            let carrito = JSON.parse(localStorage.getItem('productos')) || [];


            const prodExistente = carrito.find(prod => prod.title === titulo);

            if (prodExistente) {
            const nuevoProducto = {
                title: prodExistente.title,
                price: prodExistente.price,
                cantidad: 1
            };

            carrito.push(nuevoProducto);
            }

            const nuevoTotal = carrito.reduce((acc, prod) => acc + prod.price, 0);

            localStorage.setItem('productos', JSON.stringify(carrito));
            localStorage.setItem('total', nuevoTotal.toFixed(2));

            location.reload();
        });
    });

});
