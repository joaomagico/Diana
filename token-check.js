document.addEventListener("DOMContentLoaded", () => {
  const TOKEN_VALIDO = "abc123";
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token !== TOKEN_VALIDO) {
    document.body.innerHTML = `
      <div style="
        background: black;
        color: red;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
      ">
        ⛔ Acesso não autorizado
      </div>
    `;
    throw new Error("Token inválido");
  }
});
