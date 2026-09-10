// Array com os dados dos Templos usando imagens da Wikimedia Commons (sem bloqueio de CORS)
const templos = [
  {
    nome: "Campinas Brasil",
    local: "Campinas, SP, Brasil",
    dedicacao: "2002, Maio, 17",
    area: 48100,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Campinas_Brazil_Temple.jpg/640px-Campinas_Brazil_Temple.jpg"
  },
  {
    nome: "San Diego Califórnia",
    local: "San Diego, Califórnia, EUA",
    dedicacao: "1993, Abril, 25",
    area: 72000,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/San_Diego_California_Temple.jpg/640px-San_Diego_California_Temple.jpg"
  },
  {
    nome: "Recife Brasil",
    local: "Recife, Pernambuco, Brasil",
    dedicacao: "2000, Dezembro, 15",
    area: 37200,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Recife_Brazil_Temple.jpg/640px-Recife_Brazil_Temple.jpg"
  },
  {
    nome: "São Paulo Brasil",
    local: "São Paulo, SP, Brasil",
    dedicacao: "1978, Novembro, 2",
    area: 59246,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sao_Paulo_Brazil_Temple_2.jpg/640px-Sao_Paulo_Brazil_Temple_2.jpg"
  },
  {
    nome: "Rio de Janeiro Brasil",
    local: "Rio de Janeiro, RJ, Brasil",
    dedicacao: "2022, Maio, 8",
    area: 29966,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Rio_de_Janeiro_Brazil_Temple.jpg/640px-Rio_de_Janeiro_Brazil_Temple.jpg"
  },
  {
    nome: "Curitiba Brasil",
    local: "Curitiba, PR, Brasil",
    dedicacao: "2008, Junho, 1",
    area: 27850,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Curitiba_Brazil_Temple_by_LDS.jpg/640px-Curitiba_Brazil_Temple_by_LDS.jpg"
  },
  {
    nome: "Salt Lake",
    local: "Salt Lake City, Utah, EUA",
    dedicacao: "1893, Abril, 6",
    area: 382207,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Salt_Lake_Temple_10.jpg/640px-Salt_Lake_Temple_10.jpg"
  },
  {
    nome: "Manaus Brasil",
    local: "Manaus, AM, Brasil",
    dedicacao: "2012, Junho, 10",
    area: 32000,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Manaus_Brazil_Temple_2.jpg/640px-Manaus_Brazil_Temple_2.jpg"
  },
  {
    nome: "Fortaleza Brasil",
    local: "Fortaleza, CE, Brasil",
    dedicacao: "2019, Junho, 2",
    area: 36000,
    imagem: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Fortaleza_Brazil_Temple.jpg/640px-Fortaleza_Brazil_Temple.jpg"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const containerGrid = document.querySelector(".residence-grid");
  const menuButton = document.getElementById("menu");
  const navMenu = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");
  const mainHeading = document.querySelector("main h2");

  // 1. Menu Hambúrguer (Mobile)
  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // 2. Ano e Modificação no Rodapé
  const currentYearSpan = document.getElementById("currentyear");
  const lastModifiedP = document.getElementById("lastModified");

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedP) {
    lastModifiedP.textContent = Última modificação: ${document.lastModified};
  }

  // 3. Renderização das figuras na grade
  function renderizarTemplos(lista) {
    if (!containerGrid) return;
    containerGrid.innerHTML = "";

    lista.forEach((templo) => {
      const figure = document.createElement("figure");
      figure.innerHTML = `
        <img src="${templo.imagem}" alt="Templo de ${templo.nome}" loading="lazy">
        <figcaption>${templo.nome}</figcaption>
      `;
      containerGrid.appendChild(figure);
    });
  }

  // 4. Filtros dos links do menu
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const opcao = link.textContent.trim().toLowerCase();

      if (mainHeading) {
        mainHeading.textContent = link.textContent.trim();
      }

      if (navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
      }

      let templosFiltrados = [];

      switch (opcao) {
        case "antigo":
          templosFiltrados = templos.filter((t) => parseInt(t.dedicacao.split(",")[0]) < 1900);
          break;
        case "novo":
          templosFiltrados = templos.filter((t) => parseInt(t.dedicacao.split(",")[0]) > 2000);
          break;
        case "grande":
          templosFiltrados = templos.filter((t) => t.area > 50000);
          break;
        case "pequeno":
          templosFiltrados = templos.filter((t) => t.area < 30000);
          break;
        case "página inicial":
        default:
          templosFiltrados = templos;
          break;
      }

      renderizarTemplos(templosFiltrados);
    });
  });

  // Renderiza todos na primeira abertura
  renderizarTemplos(templos);
});