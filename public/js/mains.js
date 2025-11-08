document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("listaJuguetes");
  const API_URL = "http://localhost:3000/api/producto";

  function renderProductos(juguetes) {
    if (!juguetes || juguetes.length === 0) {
      contenedor.innerHTML = "<p class='text-muted'>No hay juguetes disponibles.</p>";
      return;
    }

    contenedor.innerHTML = juguetes
      .map((j) => {
        const img = j.imagen ? `http://localhost:3000${j.imagen}` : "./img/placeholder.png";
        const nombre = j.nombre || "Sin nombre";
        const descripcion = j.descripcion || "";
        const precio = typeof j.precio === "number" ? j.precio : Number(j.precio) || 0;

        return `
        <div class="col-6 col-md-4 col-lg-3">
          <div class="card h-100 shadow-sm border-0">
            <div style="height:200px;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#f8f9fa;">
              <img src="${img}" class="card-img-top" alt="${escapeHtml(nombre)}" style="max-height:100%;width:auto;">
            </div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title fw-bold">${escapeHtml(nombre)}</h5>
              <p class="card-text small text-muted mb-2">${escapeHtml(descripcion)}</p>
              <div class="mt-auto">
                <span class="text-danger fw-bold fs-5">$${precio.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        `;
      })
      .join("");
  }

  async function cargarProductos() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        contenedor.innerHTML = "<p class='text-danger'>No ahi jueguetes disponibles.</p>";
        return;
      }
      const data = await res.json();
      const lista = data.productos || [];
      renderProductos(lista);
    } catch (error) {
      console.error("Error cargando productos:", error);
      contenedor.innerHTML = "<p class='text-danger'>No ahi jueguetes disponibles.</p>";
    }
  }

  function escapeHtml(text) {
    if (!text) return "";
    return String(text)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  cargarProductos();
  setInterval(cargarProductos, 5000);
  window.addEventListener("focus", cargarProductos);
});
