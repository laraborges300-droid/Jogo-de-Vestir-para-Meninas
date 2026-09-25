const cenario = document.getElementById("cenario");

/* CENÁRIO */

function trocarCenario(caminho) {
  const novaImagem = document.createElement("img");

  novaImagem.src = caminho;
  novaImagem.style.opacity = "0";

  novaImagem.onload = () => {
    cenario.appendChild(novaImagem);

    cenario.classList.add("cenario-carregado");

    requestAnimationFrame(() => {
      novaImagem.style.opacity = "1";
    });

    const imagensAntigas = cenario.querySelectorAll("img");

    if (imagensAntigas.length > 1) {
      imagensAntigas[0].style.opacity = "0";

      setTimeout(() => {
        imagensAntigas[0].remove();
      }, 800);
    }
  };
}

trocarCenario("Assets/Cenários/2.png");

/* ARMÁRIO */

const armario = document.getElementById("armario");

const imagemArmario = document.createElement("img");

imagemArmario.src = "Assets/Cenários/Armário/Armário.png";

armario.appendChild(imagemArmario);

/* PERSONAGEM */

const personagem = document.getElementById("personagem");

let imagemPersonagem = document.createElement("img");

imagemPersonagem.src = "Assets/Personagens + Roupas/Png/2.png";
imagemPersonagem.classList.add("doll");

personagem.appendChild(imagemPersonagem);

function trocarRoupa(caminho, efeitoMagico = false, temGlitter = false) {
  // Remove qualquer glitter da roupa anterior
  removerGlitter();

  const dollAntiga = imagemPersonagem;

  const dollNova = document.createElement("img");

  dollNova.src = caminho;
  dollNova.classList.add("doll", "doll-nova");

  personagem.appendChild(dollNova);

  dollNova.onload = () => {
    dollAntiga.classList.add("doll-antiga", "dissolvendo");
    dollNova.classList.add("dissolvendo");

    if (efeitoMagico) {
      criarEfeitoMagico();
    }

    setTimeout(() => {
      dollAntiga.remove();

      imagemPersonagem = dollNova;
      imagemPersonagem.classList.remove("doll-nova", "dissolvendo");
    }, 350);
  };
}

function criarEfeitoMagico() {
  const brilho = document.createElement("div");

  brilho.classList.add("efeito-magico");

  personagem.appendChild(brilho);

  const pontos = [
    // INÍCIO — mais concentrado
    { x: 14, y: 82, tamanho: 3, intensidade: 0.7, delay: 0.0 },
    { x: 18, y: 84, tamanho: 5, intensidade: 1, delay: 0.02 },
    { x: 12, y: 76, tamanho: 2, intensidade: 0.5, delay: 0.04 },
    { x: 21, y: 80, tamanho: 7, intensidade: 0.9, delay: 0.06 },
    { x: 16, y: 88, tamanho: 3, intensidade: 0.6, delay: 0.0 },

    // PRIMEIRO TRECHO
    { x: 23, y: 76, tamanho: 4, intensidade: 0.8, delay: 0.1 },
    { x: 27, y: 72, tamanho: 8, intensidade: 1, delay: 0.12 },
    { x: 25, y: 67, tamanho: 2, intensidade: 0.5, delay: 0.14 },
    { x: 31, y: 70, tamanho: 5, intensidade: 0.9, delay: 0.16 },
    { x: 34, y: 65, tamanho: 3, intensidade: 0.7, delay: 0.18 },

    // MEIO
    { x: 37, y: 61, tamanho: 6, intensidade: 1, delay: 0.2 },
    { x: 41, y: 57, tamanho: 3, intensidade: 0.6, delay: 0.22 },
    { x: 44, y: 53, tamanho: 9, intensidade: 1, delay: 0.24 },
    { x: 40, y: 50, tamanho: 2, intensidade: 0.4, delay: 0.26 },
    { x: 48, y: 48, tamanho: 5, intensidade: 0.8, delay: 0.28 },
    { x: 51, y: 44, tamanho: 3, intensidade: 0.7, delay: 0.3 },

    // SEGUNDO TRECHO
    { x: 55, y: 41, tamanho: 7, intensidade: 1, delay: 0.32 },
    { x: 58, y: 36, tamanho: 3, intensidade: 0.5, delay: 0.34 },
    { x: 62, y: 35, tamanho: 5, intensidade: 0.9, delay: 0.36 },
    { x: 65, y: 30, tamanho: 8, intensidade: 1, delay: 0.38 },
    { x: 61, y: 27, tamanho: 2, intensidade: 0.5, delay: 0.4 },
    { x: 70, y: 27, tamanho: 4, intensidade: 0.8, delay: 0.42 },

    // FINAL — partículas começam a se espalhar
    { x: 72, y: 23, tamanho: 6, intensidade: 1, delay: 0.44 },
    { x: 68, y: 19, tamanho: 3, intensidade: 0.6, delay: 0.46 },
    { x: 70, y: 17, tamanho: 8, intensidade: 1, delay: 0.48 },
    { x: 64, y: 16, tamanho: 2, intensidade: 0.4, delay: 0.5 },
  ];

  pontos.forEach((ponto, index) => {
    const particula = document.createElement("span");

    particula.classList.add("particula-magica");

    if (index === 2 || index === 5 || index === 8 || index === 10) {
      particula.classList.add("estrela");
      particula.textContent = "✦";
    }

    particula.style.left = `${ponto.x}%`;
    particula.style.top = `${ponto.y}%`;
    particula.style.setProperty("--delay", `${ponto.delay}s`);

    brilho.appendChild(particula);
  });

  setTimeout(() => {
    brilho.remove();
  }, 1500);
}

/* ROUPAS 1*/

// PÁGINA 1
const roupas = [
  { arquivo: "7 - Clara.png", classe: "roupa4", pagina: 1 },
  { arquivo: "8 - Odette.png", classe: "roupa6", pagina: 1 },
  { arquivo: "8 - Rapunzel.png", classe: "roupa5", pagina: 1 },

  // PÁGINA 2
  { arquivo: "4 - Genevieve.png", classe: "roupa1", pagina: 2 },
  { arquivo: "4 - Anika.png", classe: "roupa2", pagina: 2 },
  { arquivo: "6 - Corinne .png", classe: "roupa3", pagina: 2 },

  // PÁGINA 3
  { arquivo: "8 - Anneliese.png", classe: "roupa10", pagina: 3 },
  { arquivo: "7 - Liana.png", classe: "roupa12", pagina: 3 },
  { arquivo: "11 - Rosella.png", classe: "roupa11", pagina: 3 },

  // PÁGINA 4
  { arquivo: "2 - Clara.png", classe: "roupa7", pagina: 4 },
  { arquivo: "7 - Odette.png", classe: "roupa8", pagina: 4 },
  { arquivo: "10 - Rapunzel.png", classe: "roupa9", pagina: 4 },
];

const bonecasVestidas = [
  "Clara P1.png",
  "Odette P1.png",
  "Rapunzel P1.png",
  "Genevieve P1.png",
  "Anika P1.png",
  "Corinne P1.png",
  "Anneliese P1.png",
  "Liana P1.png",
  "Rosella P1.png",
  "Clara P2.png",
  "Odette P3.png",
  "Rapunzel P3.png",
];

const looksSurpresa = [
  "Surpresa 1.png",
  "Surpresa 3.png",
  "Surpresa 4.png",
  "Surpresa 5.png",
  "Surpresa 6.png",
];

let surpresaAtual = 0;

let roupaAtual = null;
const roupasComGlitter = [7, 8, 9, 10, 11, 12];

roupas.forEach((roupa, index) => {
  /* IMAGEM DA ROUPA */

  const imagemRoupa = document.createElement("img");

  imagemRoupa.src = `Assets/Personagens + Roupas/Roupas/Png/${roupa.arquivo}`;

  imagemRoupa.classList.add("roupa", roupa.classe, `pagina-${roupa.pagina}`);

  if (roupa.pagina !== 1) {
    imagemRoupa.style.display = "none";
  }

  /* A imagem é apenas visual */
  imagemRoupa.style.pointerEvents = "none";

  armario.appendChild(imagemRoupa);

  /* ÁREA DE CLIQUE ROUPAS */

  const areaClique = document.createElement("div");

  areaClique.classList.add(
    "area-clique",
    roupa.classe,
    `pagina-${roupa.pagina}`,
  );

  if (roupa.pagina !== 1) {
    areaClique.style.display = "none";
  }

  areaClique.addEventListener("mouseenter", () => {
    imagemRoupa.classList.add("destaque");
  });

  areaClique.addEventListener("mouseleave", () => {
    imagemRoupa.classList.remove("destaque");
  });

  areaClique.addEventListener("click", () => {
    const glitterAtual = personagem.querySelector(".glitter-vestido");

    if (glitterAtual) {
      glitterAtual.remove();
    }

    /* Reinicia a animação */
    imagemPersonagem.classList.remove("personagem-trocando");
    void imagemPersonagem.offsetWidth;
    imagemPersonagem.classList.add("personagem-trocando");

    /* Se clicar novamente na roupa que já está sendo usada */
    if (roupaAtual === index) {
      imagemPersonagem.src = "Assets/Personagens + Roupas/Png/2.png";

      roupaAtual = null;

      const glitterAtual = personagem.querySelector(".glitter-vestido");

      if (glitterAtual) {
        glitterAtual.remove();
      }
    } else {
      /* Se clicar em uma roupa diferente */
      const glitterAtual = personagem.querySelector(".glitter-vestido");

      if (glitterAtual) {
        glitterAtual.remove();
      }

      trocarRoupa(`Assets/Personagens + Roupas/Png/${bonecasVestidas[index]}`);

      roupaAtual = index;

      if (roupasComGlitter.includes(index + 1)) {
        criarGlitterVestido(index + 1);
      }
    }
  });

  armario.appendChild(areaClique);
}); // ← FECHA roupas.forEach AQUI

/* ESPECIAIS */

const especiais = [
  // ESPECIAL 1
  { arquivo: "1 - Elina.png", classe: "especial1", pagina: 1 },
  { arquivo: "2 - Elina.png", classe: "especial2", pagina: 1 },
  { arquivo: "3 - Elina.png", classe: "especial3", pagina: 1 },
];

const bonecasVestidasEspeciais = [
  "Elina P1 - Asas.png",
  "Elina P2 - Asas.png",
  "Elina P3 - Asas.png",
];
/* RENDERIZAÇÃO DOS ESPECIAIS */

especiais.forEach((especial, index) => {
  /* IMAGEM DO ESPECIAL */

  const imagemEspecial = document.createElement("img");

  imagemEspecial.src = `Assets/Personagens + Roupas/Roupas/Png/${especial.arquivo}`;

  imagemEspecial.classList.add(
    "roupa",
    especial.classe,
    `pagina-especial-${especial.pagina}`,
  );

  imagemEspecial.style.display = "none";

  // A imagem não recebe clique
  imagemEspecial.style.pointerEvents = "none";

  armario.appendChild(imagemEspecial);

  /* ÁREA DE CLIQUE DO ESPECIAL */

  const areaCliqueEspecial = document.createElement("div");

  areaCliqueEspecial.classList.add(
    "area-clique",
    especial.classe,
    `pagina-especial-${especial.pagina}`,
  );

  areaCliqueEspecial.style.display = "none";

  areaCliqueEspecial.addEventListener("click", () => {
    const glitterAtual = personagem.querySelector(".glitter-vestido");

    if (glitterAtual) {
      glitterAtual.remove();
    }

    imagemPersonagem.classList.remove("personagem-trocando");
    void imagemPersonagem.offsetWidth;
    imagemPersonagem.classList.add("personagem-trocando");

    trocarRoupa(
      `Assets/Personagens + Roupas/Png/${bonecasVestidasEspeciais[index]}`,
    );
  });

  armario.appendChild(areaCliqueEspecial);
});

/* ÍCONES */

/* ÍCONES QUE ENTRAM COM O ARMÁRIO */

const iconesArmario = [
  { arquivo: "roupas.png", id: "botao-roupas" },
  { arquivo: "especiais.png", id: "botao-especiais" },
  { arquivo: "look aleatório.png", id: "botao-aleatorio" },
  { arquivo: "voltar.png", id: "botao-voltar" },
  { arquivo: "avançar.png", id: "botao-avancar" },
];

iconesArmario.forEach((icone) => {
  const imagemIcone = document.createElement("img");

  imagemIcone.src = `Assets/Ícones/Png/${icone.arquivo}`;

  imagemIcone.id = icone.id;
  imagemIcone.classList.add("icone", "icone-armario");

  armario.appendChild(imagemIcone);
});

document.getElementById("botao-aleatorio").addEventListener("click", () => {
  roupaAtual = null;

  trocarRoupa(
    `Assets/Personagens + Roupas/Png/${looksSurpresa[surpresaAtual]}`,
    true,
  );

  surpresaAtual++;

  if (surpresaAtual >= looksSurpresa.length) {
    surpresaAtual = 0;
  }
});

/* ÍCONES QUE ENTRAM COM A DOLL */

const iconesPersonagem = [
  { arquivo: "selecionar.png", id: "botao-selecionar" },
  { arquivo: "limpar.png", id: "botao-limpar" },
  { arquivo: "configurações.png", id: "botao-configuracoes" },
];

iconesPersonagem.forEach((icone) => {
  const imagemIcone = document.createElement("img");

  imagemIcone.src = `Assets/Ícones/Png/${icone.arquivo}`;

  imagemIcone.id = icone.id;
  imagemIcone.classList.add("icone", "icone-personagem");

  personagem.appendChild(imagemIcone);
});

/* CATEGORIAS DO ARMÁRIO */

let categoriaArmario = "roupas";

function atualizarCategoriaArmario() {
  const roupasVisiveis = document.querySelectorAll(".roupa, .area-clique");

  roupasVisiveis.forEach((elemento) => {
    if (categoriaArmario === "roupas") {
      elemento.style.display = "";
    } else {
      elemento.style.display = "none";
    }
  });
}

/* TROCA DE CATEGORIA */

document.getElementById("botao-roupas").addEventListener("click", () => {
  categoriaArmario = "roupas";

  atualizarCategoriaArmario();
  atualizarPaginaArmario();
});

document.getElementById("botao-especiais").addEventListener("click", () => {
  categoriaArmario = "especiais";

  atualizarCategoriaArmario();
  atualizarPaginaArmario();
});

/* NAVEGAÇÃO ENTRE PÁGINAS DO ARMÁRIO */

let paginaArmario = 1;
let paginaEspeciais = 1;

function atualizarPaginaArmario() {
  document.querySelectorAll(".roupa, .area-clique").forEach((elemento) => {
    if (categoriaArmario === "roupas") {
      if (elemento.classList.contains(`pagina-${paginaArmario}`)) {
        elemento.style.display = "";
      } else {
        elemento.style.display = "none";
      }
    } else if (categoriaArmario === "especiais") {
      if (elemento.classList.contains(`pagina-especial-${paginaEspeciais}`)) {
        elemento.style.display = "";
      } else {
        elemento.style.display = "none";
      }
    }
  });
}

/* BOTÃO VOLTAR */

document.getElementById("botao-voltar").addEventListener("click", () => {
  if (categoriaArmario === "roupas") {
    if (paginaArmario === 1) {
      paginaArmario = 4;
    } else {
      paginaArmario--;
    }

    atualizarPaginaArmario();
  } else if (categoriaArmario === "especiais") {
    // Especiais ainda não terá navegação
  }
});

/* BOTÃO AVANÇAR */

document.getElementById("botao-avancar").addEventListener("click", () => {
  if (categoriaArmario === "roupas") {
    if (paginaArmario === 4) {
      paginaArmario = 1;
    } else {
      paginaArmario++;
    }

    atualizarPaginaArmario();
  } else if (categoriaArmario === "especiais") {
    // Especiais ainda não terá navegação
  }
});
/* GLITTER DOS VESTIDOS */

function criarGlitterVestido(numeroRoupa) {
  const glitterAntigo = personagem.querySelector(".glitter-vestido");

  if (glitterAntigo) {
    glitterAntigo.remove();
  }

  const glitter = document.createElement("div");
  glitter.classList.add("glitter-vestido");

  personagem.appendChild(glitter);

  const imagemRoupa = new Image();

  imagemRoupa.src = `Assets/Personagens + Roupas/Roupas/Png/${roupas[numeroRoupa - 1].arquivo}`;

  imagemRoupa.onload = () => {
    const canvas = document.createElement("canvas");
    const contexto = canvas.getContext("2d");

    canvas.width = imagemRoupa.naturalWidth;
    canvas.height = imagemRoupa.naturalHeight;

    contexto.drawImage(imagemRoupa, 0, 0);

    const pixels = contexto.getImageData(
      0,
      0,
      canvas.width,
      canvas.height,
    ).data;

    const pontosRoupa = [];

    // Procura somente áreas NÃO transparentes do PNG
    for (let y = 0; y < canvas.height; y += 3) {
      for (let x = 0; x < canvas.width; x += 3) {
        const indice = (y * canvas.width + x) * 4;

        const alpha = pixels[indice + 3];

        if (alpha > 40) {
          pontosRoupa.push({
            x: (x / canvas.width) * 100,
            y: (y / canvas.height) * 100,
          });
        }
      }
    }

    const quantidade = 70;

    for (let i = 0; i < quantidade; i++) {
      const ponto = pontosRoupa[Math.floor(Math.random() * pontosRoupa.length)];

      const particula = document.createElement("span");

      particula.classList.add("particula-glitter");

      particula.style.left = `${ponto.x}%`;
      particula.style.top = `${ponto.y}%`;

      const tamanho = 0.5 + Math.random() * 3;

      particula.style.width = `${tamanho}px`;
      particula.style.height = `${tamanho}px`;

      particula.style.animationDelay = `${Math.random() * 2}s`;

      if (Math.random() > 0.82) {
        particula.classList.add("estrela-glitter");
        particula.textContent = "✦";
      }

      glitter.appendChild(particula);
    }
  };
}

function removerGlitter() {
  document.querySelectorAll(".glitter-vestido").forEach((glitter) => {
    glitter.remove();
  });
}
