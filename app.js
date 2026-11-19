// ==========================================
// --- FUNÇÕES DOS MÓDULOS ANTERIORES ---
// ==========================================

function calcularMulta(dias) {
    return dias > 15 ? (dias - 15) * 0.5 : 0;
}

function estaAberta(dia, hora) {
    if (dia === "domingo") {
        return false;
    } else if (dia === "sábado") {
        return hora >= 10 && hora < 13;
    } else {
        return hora >= 9 && hora < 19;
    }
}

function formatarEuros(valor) {
    return valor.toFixed(2).replace(".", ",") + " €";
}

function mensagemMulta(dias) {
    const multa = calcularMulta(dias);
    if (multa === 0) return "Sem multa";
    return `Multa a pagar: ${formatarEuros(multa)}`;
}


// ==========================================
// --- EXERCÍCIO 1 e 2 ---
// ==========================================
console.log("--- Testes Exercício 1 ---");
console.log("Bem-vindos à Biblioteca do Bairro!");

console.log("--- Testes Exercício 2 ---");
const nome = "Biblioteca do Bairro";
const morada = "Rua das Flores, 12";
let livrosDisponiveis = 1250;

livrosDisponiveis = livrosDisponiveis - 3; 
console.log(livrosDisponiveis); 

console.log(`A ${nome} tem ${livrosDisponiveis} livros disponíveis.`);
console.log(typeof nome, typeof morada, typeof livrosDisponiveis);
console.log(nome.toUpperCase());


// ==========================================
// --- EXERCÍCIO 3 ---
// ==========================================
console.log("--- Testes Exercício 3 ---");
const dia = "sábado";
const hora = 11;
let aberta;

if (dia === "domingo") {
    aberta = false;
} else if (dia === "sábado") {
    aberta = hora >= 10 && hora < 13;
} else {
    aberta = hora >= 9 && hora < 19;
}

console.log(aberta ? "Aberta" : "Fechada");


// ==========================================
// --- EXERCÍCIO 4 ---
// ==========================================
console.log("--- Testes Exercício 4 ---");
console.log(mensagemMulta(10)); 
console.log(mensagemMulta(18)); 
console.log(mensagemMulta(22)); 

console.log(estaAberta("domingo", 11)); 
console.log(estaAberta("quarta", 10)); 
console.log(estaAberta("sábado", 14));   


// ==========================================
// --- EXERCÍCIO 5 ---
// ==========================================
console.log("--- Testes Exercício 5 ---");
const livros = ["Os Maias", "Mensagem", "A Sibila", "Os Lusíadas", "Aparição"];

livros.push("Memorial do Convento", "Ensaio sobre a Cegueira");
console.log(`Total de livros: ${livros.length}`); 

console.log("--- Lista Numerada ---");
livros.forEach((titulo, i) => {
    console.log(`${i + 1}. ${titulo}`);
});

const longos = livros.filter(t => t.length > 10);
console.log("--- Livros com mais de 10 letras ---");
console.log(longos);

const maiusculas = livros.map(t => t.toUpperCase());
console.log("--- Títulos em maiúsculas ---");
console.log(maiusculas);


// ==========================================
// --- EXERCÍCIO 6: O catálogo em objetos ---
// ==========================================
console.log("--- Testes Exercício 6 ---");

const catalogo = [
    { titulo: "Os Maias", autor: "Eça de Queirós", ano: 1888, disponivel: true },
    { titulo: "Mensagem", autor: "Fernando Pessoa", ano: 1934, disponivel: false },
    { titulo: "A Sibila", autor: "Agustina Bessa-Luís", ano: 1954, disponivel: true },
    { titulo: "Os Lusíadas", autor: "Luís de Camões", ano: 1572, disponivel: true },
    { titulo: "Aparição", autor: "Vergílio Ferreira", ano: 1959, disponivel: false },
    { titulo: "Memorial do Convento", autor: "José Saramago", ano: 1982, disponivel: true }
];

for (const l of catalogo) {
    console.log(`${l.titulo} — ${l.autor} (${l.ano})`);
}

const totalDisponiveis = catalogo.filter(l => l.disponivel).length;
console.log(`Livros disponíveis: ${totalDisponiveis}`);

let antigo = catalogo[0];
for (const l of catalogo) {
    if (l.ano < antigo.ano) {
        antigo = l;
    }
}
console.log(`Livro mais antigo: ${antigo.titulo} (${antigo.ano})`);

function emprestar(titulo) {
    const livro = catalogo.find(l => l.titulo === titulo);
    if (!livro) return "Livro não encontrado.";
    if (!livro.disponivel) return "Já está emprestado.";
    
    livro.disponivel = false;
    return "Emprestado!";
}

console.log(emprestar("Os Maias"));
console.log(emprestar("Os Maias"));


// ==========================================
// --- EXERCÍCIO 7: O catálogo na página ---
// ==========================================
const lista = document.querySelector("#lista-livros");
const resumo = document.querySelector("h2");

function mostrarLivros(livrosLista) {
    if (!lista) return; 
    lista.replaceChildren();

    for (const l of livrosLista) {
        const item = document.createElement("li");
        item.textContent = `${l.titulo} — ${l.autor} (${l.ano})`;
        
        if (!l.disponivel) {
            item.classList.add("indisponivel");
            item.append(" — emprestado");
        }
        lista.append(item);
    }

    if (resumo) {
        const n = livrosLista.filter(l => l.disponivel).length;
        resumo.textContent = `${livrosLista.length} livros, ${n} disponíveis`;
    }
}

mostrarLivros(catalogo);


// =============================================
// --- EXERCÍCIO 8: Pesquisar e inscrever ---
// =============================================
const pesquisa = document.querySelector("#pesquisa");
const botaoDisponiveis = document.querySelector("#so-disponiveis");
const form = document.querySelector("#inscricao");
const mensagemForm = document.querySelector("#mensagem");

let soDisponiveis = false;
let dadosCatalogo = [...catalogo];

function atualizar() {
    if (!pesquisa || !lista) return;

    const texto = pesquisa.value.trim().toLowerCase();
    let res = dadosCatalogo.filter(l => l.titulo.toLowerCase().includes(texto));

    if (soDisponiveis) {
        res = res.filter(l => l.disponivel);
    }

    mostrarLivros(res);

    if (!res.length) {
        lista.textContent = "Nenhum livro encontrado.";
    }
}

if (pesquisa) {
    pesquisa.addEventListener("input", atualizar);
}

if (botaoDisponiveis) {
    botaoDisponiveis.addEventListener("click", () => {
        soDisponiveis = !soDisponiveis;
        atualizar();
    });
}

if (form && mensagemForm) {
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        const nomeInscrito = form.nome.value.trim();
        const emailInscrito = form.email.value.trim();

        if (nomeInscrito === "" || !emailInscrito.includes("@")) {
            mensagemForm.textContent = "Preencha o nome e um e-mail válido.";
            return;
        }
        mensagemForm.textContent = `Obrigado, ${nomeInscrito}! Inscrição feita.`;
    });
}


// =============================================
// --- EXERCÍCIO 9: Lembrar e carregar ---
// =============================================
const botaoTema = document.querySelector("#tema");

const temaGuardado = localStorage.getItem("tema");
document.body.classList.toggle("escuro", temaGuardado === "escuro");

if (botaoTema) {
    botaoTema.addEventListener("click", () => {
        const escuro = document.body.classList.toggle("escuro");
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    });
}

async function carregarLivros() {
    if (!lista) return;
    try {
        const resposta = await fetch("livros.json");
        if (!resposta.ok) throw new Error("Erro HTTP");
        dadosCatalogo = await resposta.json();
        atualizar();
    } catch (erro) {
        lista.textContent = "Erro ao carregar o catálogo.";
    }
}

// carregarLivros(); // Descomenta quando criares o ficheiro livros.json no Módulo 9