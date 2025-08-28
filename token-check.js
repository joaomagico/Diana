document.addEventListener("DOMContentLoaded", () => {
  const TOKEN_VALIDO = "abc123";
  //const TOKEN_VALIDO = "Q15qxgcvQImhc1uDYwUIycyK5L3D01AW5cihRTzr3ViTxuVVWv8F13soryEYcYHV";
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

// Função para configurar o fundo
function setBackground(imagePath) {
  document.body.style.backgroundImage = `url('${imagePath}')`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.backgroundAttachment = "fixed";
}

// Função para configurar a galeria de imagens
function setGaleria(numFotos, extensao) {
  const imagens = [];
  
  for (let i = 1; i <= numFotos; i++) {
    imagens.push(`${i}.${extensao}`);
  }

  const galeria = document.getElementById("galeria");
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("modalImage");
  let currentIndex = 0;

  imagens.forEach((nome, i) => {
    const img = document.createElement("img");
    img.src = nome;
    img.alt = nome;
    img.onclick = () => openModal(i);
    galeria.appendChild(img);
  });

  function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    modalImg.src = imagens[currentIndex];
  }

  function closeModal() {
    modal.style.display = "none";
  }

  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowLeft") {
        currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
        modalImg.src = imagens[currentIndex];
      } else if (e.key === "ArrowRight") {
        currentIndex = (currentIndex + 1) % imagens.length;
        modalImg.src = imagens[currentIndex];
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
  });

  // Suporte a swipe (móvel)
  let startX = 0;
  let endX = 0;

  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = startX - endX;
    const threshold = 50; // mínimo necessário para considerar swipe

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // swipe para a esquerda → próxima imagem
        currentIndex = (currentIndex + 1) % imagens.length;
      } else {
        // swipe para a direita → imagem anterior
        currentIndex = (currentIndex - 1 + imagens.length) % imagens.length;
      }
      modalImg.src = imagens[currentIndex];
    }
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const video = document.getElementById("meuVideo");
  video.addEventListener("ended", function() {
    video.load();
  });
});