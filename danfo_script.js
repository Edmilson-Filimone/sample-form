//Criar o objecto
let dados = { nome: [], canister: [], caixa: [], posicao: [], data: [] };

//o dataframe
let dataframe;

//pegando o formulario, botao, e a notificacao
const body = document.querySelector("body");
const form = document.querySelector("#form");
const submit = document.querySelector("#submit");
const download = document.querySelector("#btn-download");
const notification = document.querySelector(".card-conteiner");
const showRecords = document.querySelector(".btn-see-more");
const icon_btn = document.querySelector(".fa-plus");

/*Criando elementos para a lista de registros*/
let painel = document.createElement("div"); //div para mostrar os resultados
let placeholder = document.createElement("p");
placeholder.classList.add("placeholder-style");
placeholder.innerText = "Ainda não existem registros!";
painel.append(placeholder);

let list = document.createElement("ol");
list.classList.add("list-style");
let listTitle = document.createElement("h3");
listTitle.classList.add("subtitulo");
listTitle.classList.add("list-title");
listTitle.innerText = "Lista de Registros";
list.append(listTitle);
painel.classList.add("display-none");
painel.append(list);
body.append(painel);

//Painel de vizualicao de registro
function savePainel() {
  if (painel.contains(placeholder)) {
    painel.removeChild(placeholder);
  }

  let li = document.createElement("li");
  let span = document.createElement("span");

  let btn_delete = document.createElement("button");
  btn_delete.innerHTML = `<i class="fa-solid fa-x"></i>`;
  btn_delete.classList.add('btn-delete-style')

  btn_delete.addEventListener("click", (e) => {
    e.stopPropagation();
    if (confirm("Tem certeza que quer apagar?")) {

      deleteData(btn_delete.parentElement)
    }
  });

  let data_iterate = dfd.toJSON(dataframe);
  data_iterate.forEach((item, index) => {
    li.innerText = `OID: ${item.nome} - OC: ${item.canister}-NID${item.caixa}-NC${item.posicao}`;
    li.id = `id-${index}`; //passando um id para a li, que sera usado pela btn-delete para remover o elemento
    li.append(span);
    li.append(btn_delete);
    list.append(li);
  });
}

//funcao para deletar regitros e remover do painel
function deleteData(element) {
  console.log(element);
  element.style.display = "none";
}

//Funcao para salvar e guardar como planilha
function saveData() {
  //dom
  let nome = document.querySelector("#nome");
  let canister = document.querySelector("#canister");
  let caixa = document.querySelector("#caixa");
  let posicao = document.querySelector("#posicao");
  let data = document.querySelector("#data");

  //passando os dados do formulario para o objecto
  dados.nome.push(nome.value);
  dados.canister.push(canister.value);
  dados.caixa.push(caixa.value);
  dados.posicao.push(posicao.value);
  dados.data.push(data.value);

  /*convertendo o objecto em dataframe*/
  dataframe = new dfd.DataFrame(dados);
  dataframe.rename({'nome':'Codigo de Origem', 'canister':'Caixa de origem', 'caixa':'Novo Codigo', 'posicao':'Caixa actual'}, {inplace:true})
  console.log(dfd.toJSON(dataframe)); //transforma o df em um array de objectos
}

/*Funcao para o display da notificacao*/
function showAlert() {
  notification.style.display = "flex";
  setTimeout(() => {
    notification.style.display = "none";
  }, 800);
}

/*Eventos*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  saveData();
  form.reset();
  showAlert();
  savePainel();
  console.log(dados);
});

download.addEventListener("click", (e) => {
  dfd.toCSV(dataframe, { fileName: "Planilha_Sangue.csv", download: true });
});

showRecords.addEventListener("click", () => {
  icon_btn.classList.toggle("rotate");
  painel.classList.toggle("painel-style");
  painel.classList.toggle("display-none");
});
