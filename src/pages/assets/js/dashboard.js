import { Api } from "../../../controller/Api.js";
import { Data } from "../../../models/DadosFormulario.js";
import { Templates } from "../../../models/DashboardTemplates.js";

const token = localStorage.getItem("token");

const meusProdutos = await Api.produtosCriados(JSON.parse(token));

Templates.listarMeusProdutos(meusProdutos);

function filtrarProdutos() {
    const input = document.getElementById("buscarProduto");

    input.addEventListener("keyup", buscar);
}

function buscar(event) {
    const campoDeBusca = event.target.value;

    const campoDeBuscaFormatado = campoDeBusca.toLowerCase();

    const filtro = meusProdutos.filter(produto => {
        const nomeProdutoFormatado = produto.nome.toLowerCase();

        return nomeProdutoFormatado.includes(campoDeBuscaFormatado);
    });

    Templates.listarMeusProdutos(filtro);
    editarProduto();
    excluirProduto();
}
filtrarProdutos();

function adicionarProduto() {
    const btnAdicionarProduto = document.getElementById("btnAdicionarProduto");
    btnAdicionarProduto.addEventListener("click", abrirFormularioAdicionar);
}

function abrirFormularioAdicionar() {
    Templates.adicionarProduto();

    const botaoFechar = document.getElementById("btnFechar");
    botaoFechar.addEventListener("click", () => {
        const container = document.querySelector(".container");
        document.body.removeChild(container);
    });

    Data.novoProduto();
}
adicionarProduto();

function mostrarMenuUsuario() {
    const menuUsuario = Templates.perfilUsuario();

    const menu = document.getElementById('perfilUsuario');
    const divPai = menu.parentNode;
    divPai.insertBefore(menuUsuario, menu.nextSibling);

    menu.addEventListener('mouseover', () => {
        menuUsuario.style.animation = 'modal 500ms linear forwards';
        menuUsuario.style.display = 'block';
    });
}
mostrarMenuUsuario();

function fecharMenu() {
    const main = document.querySelector('main');
    const menu = document.querySelector('.menu__usuario');

    main.addEventListener('mousemove', () => {
        menu.style.opacity = 0;
        menu.style.display = 'none';
    });
}
fecharMenu();

function editarProduto() {
    const btnEditar = document.querySelectorAll("#btnEditar");

    btnEditar.forEach(botao => {
        botao.addEventListener("click", abrirFormularioEditar);
    });
}

function abrirFormularioEditar(event) {
    Templates.atualizarProduto();
    Data.editarProduto(event, meusProdutos);

    const botaoFechar = document.getElementById("btnFechar");
    botaoFechar.addEventListener("click", () => {
        const container = document.querySelector(".container");
        document.body.removeChild(container);
    });
}
editarProduto();

function excluirProduto() {
    const btnRemover = document.querySelectorAll("#btnRemover");
    btnRemover.forEach(botao => {
        botao.addEventListener("click", mensagemDeConfirmacao);
    });
}

function mensagemDeConfirmacao(event) {
    Templates.removerProduto();
    Data.removerProduto(event);

    const botaoFechar = document.getElementById("btnFechar");
    botaoFechar.addEventListener("click", () => {
        const container = document.querySelector(".container");
        document.body.removeChild(container);
    });
}
excluirProduto();

function logout() {
    const btnLogout = document.getElementById('btnLogout');
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location = '../../../../index.html'
        }, 1000);
    });
}
logout();

export { editarProduto, excluirProduto }