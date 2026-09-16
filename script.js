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

function trocarRoupa(caminho, efeitoMagico = false) {
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
    { x: 15, y: 80, delay: 0.00 },
    { x: 18, y: 85, delay: 0.00 },
    { x: 13, y: 75, delay: 0.00 },
    { x: 21, y: 75, delay: 0.05 },
    { x: 27, y: 70, delay: 0.08 },
    { x: 34, y: 65, delay: 0.11 },
    { x: 41, y: 54, delay: 0.15 },
    { x: 48, y: 46, delay: 0.18 },
    { x: 55, y: 39, delay: 0.21 },
    { x: 62, y: 33, delay: 0.24 },
    { x: 69, y: 28, delay: 0.27 },
    { x: 76, y: 24, delay: 0.30 },
    { x: 71, y: 20, delay: 0.33 },
    { x: 33, y: 16, delay: 0.35 },
    { x: 30, y: 15, delay: 0.40 },
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

const roupas = [
  { arquivo: "1 - Clara.png", classe: "roupa1" },
  { arquivo: "2 - Clara.png", classe: "roupa2" },
  { arquivo: "3 - Odette.png", classe: "roupa3" },
];

const bonecasVestidas = ["Clara P1.png", "Clara P2.png", "Odette P2.png"];

const looksSurpresa = [
  "Surpresa 1.png",
  "Surpresa 2.png",
  "Surpresa 3.png",
  "Surpresa 4.png",
  "Surpresa 5.png",
  "Surpresa 6.png",
];

let surpresaAtual = 0;

let roupaAtual = null;
roupas.forEach((roupa, index) => {
  /* IMAGEM DA ROUPA */

  const imagemRoupa = document.createElement("img");

  imagemRoupa.src = `Assets/Personagens + Roupas/Roupas/Png/${roupa.arquivo}`;

  imagemRoupa.classList.add("roupa", roupa.classe);

  /* A imagem é apenas visual */
  imagemRoupa.style.pointerEvents = "none";

  armario.appendChild(imagemRoupa);

  /* ÁREA DE CLIQUE */

  const areaClique = document.createElement("div");

  areaClique.classList.add("area-clique", roupa.classe);

  areaClique.addEventListener("mouseenter", () => {
    imagemRoupa.classList.add("destaque");
  });

  areaClique.addEventListener("mouseleave", () => {
    imagemRoupa.classList.remove("destaque");
  });
  areaClique.addEventListener("click", () => {
    // Reinicia a animação
    imagemPersonagem.classList.remove("personagem-trocando");
    void imagemPersonagem.offsetWidth;
    imagemPersonagem.classList.add("personagem-trocando");

    // Se clicar novamente na roupa que já está sendo usada
    if (roupaAtual === index) {
      imagemPersonagem.src = "Assets/Personagens + Roupas/Png/2.png";
      roupaAtual = null;
    }

    // Se clicar em uma roupa diferente
    else {
      trocarRoupa(`Assets/Personagens + Roupas/Png/${bonecasVestidas[index]}`);
      roupaAtual = index;
    }
  });

  armario.appendChild(areaClique);
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

document.getElementById("botao-voltar").addEventListener("click", () => {
  console.log("Voltar");
});

document.getElementById("botao-avancar").addEventListener("click", () => {
  console.log("Avançar");
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
