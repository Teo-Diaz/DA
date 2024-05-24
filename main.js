document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.usuario');
    const dropdownContent = document.querySelector('.dropdown-content');

    button.addEventListener('click', function() {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Cierra el dropdown si se hace clic fuera de él
    window.addEventListener('click', function(event) {
        if (!button.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const decrementarBtns = document.querySelectorAll('.decrementar');
    const incrementarBtns = document.querySelectorAll('.incrementar');
    const agregarBtns = document.querySelectorAll('.agregar');
    const cartBadge = document.querySelector('.cart .numero');

    let productosEnCarrito = {}; 

    decrementarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productoId = obtenerProductoId(btn);
            if (productosEnCarrito[productoId] > 0) {
                productosEnCarrito[productoId]--;
                actualizarCantidadProducto(productoId);
            }
        });
    });

    incrementarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productoId = obtenerProductoId(btn);
            if (!productosEnCarrito[productoId]) {
                productosEnCarrito[productoId] = 0;
            }
            productosEnCarrito[productoId]++;
            actualizarCantidadProducto(productoId);
        });
    });

    agregarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productoId = obtenerProductoId(btn);
            const cantidad = productosEnCarrito[productoId] || 0;
            if (cantidad > 0) {
                alert(`Se agregaron ${cantidad} del producto al carrito.`);
                actualizarBadge();
                actualizarCantidadProducto(productoId);
            } else {
                alert('Por favor, selecciona al menos un producto para agregar al carrito.');
            }
        });
    });

    function actualizarBadge() {
        const totalProductos = Object.values(productosEnCarrito).reduce((total, cantidad) => total + cantidad, 0);
        cartBadge.textContent = totalProductos;
    }

    function obtenerProductoId(btn) {
        const productoDiv = btn.closest('.producto');
        return productoDiv.dataset.id;
    }

    function actualizarCantidadProducto(productoId) {
        const productoDiv = document.querySelector(`.producto[data-id="${productoId}"]`);
        const cantidadSpan = productoDiv.querySelector('.numero');
        cantidadSpan.textContent = productosEnCarrito[productoId] || 0;
    }
});
