/*Criando as variáveis do tipo constante e let */
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sIdade = document.querySelector('#m-idade')
const btnSalvar = document.querySelector('#btnSalvar')
/*A variável itens será utilizada para armazenar os itens no db */
let itens
/*A variável id para armazenar o index, para executar as ações de edição */
let id



// Função para abrir a modal
function openModal(edit = false, index = 0) {
  //Ao abrir a modal, será adicionada na classe active para a modal ficar visível em tela
  modal.classList.add('active')
/* A cada click fora da modal será removido da classe active e quando é removida a classe ela fica com o display : none
Sendo assim, ela não fica mais visível em tela*/
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }
/*Condição para quando for um item de edição, ele irá carregar 
para os itens do modal o nome e a idade e atribuir para variável id o index da pessoa */
  if (edit) {
    sNome.value = itens[index].nome
    sIdade.value = itens[index].funcao
    id = index
  } else {
    // Caso não for uma edição ele irá carregar os valores em branco para ser preenchidos
    sNome.value = ''
    sIdade.value = ''
  }
  
}
// Função de editar
function editItem(index) {

  openModal(true, index)
}
// Função de deletar
function deleteItem(index) {
  itens.splice(index, 1)
  //Atualizar o banco
  setItensBD()
  // Mostrar os itens na tela
  loadItens()
}
/*Função para inserir dados */
function insertItem(item, index) {
  let tr = document.createElement('tr')
// Importa os ícones selecionados
  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.idade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  // Apresentar os itens armazenados
  tbody.appendChild(tr)
}
// Criação do evento do botão de salvar (dentro da modal )
btnSalvar.onclick = e => {
  // Vaildação
  if (sNome.value == '' || sIdade.value == '' ) {
    return
  }

  e.preventDefault();
  // Se os campos preenchidos virem de uma edição ele irá atualizá-los , com os valores fornecidos
  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].idade = sIdade.value
  } else {
    itens.push({'nome': sNome.value, 'idade': sIdade.value})
  }

  setItensBD()
//Aqui fecha o modal
  modal.classList.remove('active')
  //Atualizar os dados
  loadItens()
  id = undefined
}
/*Função assim que a tela for carregada, sendo assim criando cada linha */
function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}
/*Função para pegar os itens do db, através do getItem, caso
n haver algo ele retornará um array vazio */
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
/*Função que irá settar os itens para o db */
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
