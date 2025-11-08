const form = document.getElementById('formAgregar');
const listaPanel = document.getElementById('listaPanel');
const API_URL = 'http://localhost:3000/api/producto';

let editando = false;
let idEditando = null;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombre').value);
  formData.append('descripcion', document.getElementById('descripcion').value);
  formData.append('precio', document.getElementById('precio').value);

  const imagen = document.getElementById('imagen').files[0];
  if (imagen) formData.append('imagen', imagen);

  let res;

  try {
    if (!editando) {
      res = await fetch(API_URL, { method: 'POST', body: formData });
    } else {
      res = await fetch(`${API_URL}/${idEditando}`, { method: 'PUT', body: formData });
    }

    if (res.ok) {
      alert(editando ? 'Producto actualizado correctamente' : 'Producto agregado correctamente');
      form.reset();
      editando = false;
      idEditando = null;
      form.querySelector('button').textContent = 'Agregar Producto';
      cargarProductos();
    } else {
      alert('Error al guardar');
    }
  } catch (error) {
    console.error(error);
    alert('Error al guardar producto');
  }
});

async function cargarProductos() {
  listaPanel.innerHTML = '';
  const res = await fetch(API_URL);
  const data = await res.json();

  if (res.status === 200) {
    data.productos.forEach((p) => {
      const card = `
        <div class="col-md-4">
          <div class="card shadow-sm">
            <img src="${p.imagen}" class="card-img-top" height="200">
            <div class="card-body">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">${p.descripcion}</p>
              <p class="fw-bold">$${p.precio}</p>
              <button class="btn btn-warning btn-sm me-2" onclick="editarProducto('${p._id}')">Editar</button>
              <button class="btn btn-danger btn-sm" onclick="eliminarProducto('${p._id}')">Eliminar</button>
            </div>
          </div>
        </div>
      `;
      listaPanel.innerHTML += card;
    });
  } else {
    listaPanel.innerHTML = `<p class="text-center text-muted">No hay productos guardados</p>`;
  }
}

async function editarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();

  if (res.ok) {
    const p = data.producto;
    document.getElementById('nombre').value = p.nombre;
    document.getElementById('descripcion').value = p.descripcion;
    document.getElementById('precio').value = p.precio;

    editando = true;
    idEditando = id;
    form.querySelector('button').textContent = 'Actualizar Producto';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    alert('Error al cargar el producto');
  }
}

async function eliminarProducto(id) {
  if (!confirm('¿Seguro de eliminar este producto?')) return;

  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    alert('Producto eliminado');
    cargarProductos();
  }
}

cargarProductos();
