let nomeTarefa = document.querySelector('#nomeTarefa');
let addTarefa = document.querySelector('#addTarefa');
let listaTarefas = document.querySelector('#listaTarefas');
let janelaEdicao = document.querySelector('#janelaEdicao');
let janelaEdicaoFundo = document.querySelector('#janelaEdicaoFundo');
let janelaEdicaoBtnFechar = document.querySelector('#janelaEdicaoBtnFechar');
let btnAtualizarTarefa = document.querySelector('#btnAtualizarTarefa');
let idTarefaEdicao = document.querySelector('#idTarefaEdicao');
let inputTarefaNomeEdicao = document.querySelector('#inputTarefaNomeEdicao');
let edicao = document.querySelector('#edicao');
let conteudo = document.querySelector('.conteudo');

nomeTarefa.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        let tarefa = {
            nome: nomeTarefa.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);
    }
});

janelaEdicaoBtnFechar.addEventListener('click', (e) => {
    alternarJanelaEdicao();
});

addTarefa.addEventListener('click', (e) => {
    let tarefa = {
        nome: nomeTarefa.value,
        id: gerarId(),
    }
    if(tarefa.nome === ''){
        preventDefault();
    }else{
        adicionarTarefa(tarefa);
    }
});

btnAtualizarTarefa.addEventListener('click', (e) => {
    let idTarefa = idTarefa.innerHTML.replace('#', '');

    let tarefa = {
        nome: inputTarefaNomeEdicao.value,
        id: idTarefa,
    }

    let tarefaAtual = document.getElementById('' + idTarefa + '');

    if(tarefaAtual){
        let li = criarTagLI(tarefa);
        listaTarefas.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado!');
    }
});

function gerarId(){
    return Math.floor(Math.random() * 3000);
}

function adicionarTarefa(tarefa){
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);
    nomeTarefa.value = '';
}

function criarTagLI(tarefa){
    let li = document.createElement('li');
    li.id = tarefa.id;

    let span = document.createElement('span');
    span.classList.add('textoTarefa');
    span.innerHTML = tarefa.nome;

    let div = document.createElement('div');

    let btnExcluir = document.createElement('button');
    btnExcluir.classList.add('acao');
    btnExcluir.innerHTML = '<i class="fa fa-trash"></i>';
    btnExcluir.setAttribute('onClick', 'excluir('+tarefa.id+')');

    div.appendChild(btnEditar);
    div.appendChild(btnExcluir);

    li.appendChild(span);
    li.appendChild(div);

    return li;
}

function editar(idTarefa){
    displayTelaEdicao();
    let li = document.getElementById('' +idTarefa+ '');
    if(li){
        idTarefaEdicao.innerHTML = '#' + idTarefa;
        inputTarefaNomeEdicao.value = li.innerText;
        alternarJanelaEdicao();
    }else{
        alert('Elemento HTML não encontrado!');
    }
}

function excluir(idTarefa){
    let li = document.getElementById('' +idTarefa+ '');
    if(li){
        listaTarefas.removeChild(li);
    }else{
        alert('Elemento HTML não encontrado!');
    }
}

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle('abrir');
    janelaEdicaoFundo.classList.toggle('abrir');
}

function displayTelaEdicao(){
    conteudo.style.display = "none";
    edicao.style.display = "initial";
}