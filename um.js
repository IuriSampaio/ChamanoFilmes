// chave e url base da API tmdb
const chave = '96988444ffe703373ca42f07efb5b6fc';
const baseURL = 'https://api.themoviedb.org/3/';
// pegando elementos do html
const form = document.getElementById("form") 
const $info = document.getElementById('movies');
// fazendo função pra limpar a tela a cada requisição da api
const esconde = ( $i )  =>  $i.style.display = "none";
const limpaTela = ( ) => esconde($info.parentElement.lastChild.previousSibling);
// função de configuração da api
let config = async ( ) => {
    try{
    let url = `${baseURL}configuration?api_key=${chave}`
    const confgApi= await fetch(url)
    const configuracao =await confgApi.json()
    console.log("configurações da api:",configuracao)
    }catch(err){
      console.warn('erro na api')
    }
}
// default como spinner enquanto carrega a api
const resultados = [{
    'title':"<div class=''></div>",
    'vote_average':"<div class=''></div>",
    'release_date':"<div class=''></div>",
    'poster_path':"<div class='spinner'></div>",
    'overview':"<div class=''></div>"
    
}]
// função que preenche a tela com com os resultados estregados pela api
const preenche = ( resultados ) => {
    for($i=0; $i<=resultados.length;$i++){
        resultados[$i].poster_path ? console.log('EXISTE IMG') : esconde(resultados[$i].poster_path)

        const panel= `
            <div class='conteinerzinho'>
                <div class='filme'>
                    <div class='sobre'>
                        <h2 class='nome'>
                            ${resultados[$i].title}
                        </h2>
                        <p class="descrisao">Nota: ${resultados[$i].vote_average} / 10 </p>
                            <p><strong>Data de lançamento:</strong> ${resultados[$i].release_date} </p>
                            <button data-modal-target="#modal${$i}" >SINOPSE</button>
                            <div class="modal" id="modal${$i}">
                                <div class="modal-header">
                                <div class="title">${resultados[$i].title} </div>
                                <button data-close-button class="close-button">&times;</button>
                                </div>
                                <div class="modal-body">
                                    ${resultados[$i].overview}
                                </div>
                            </div>
                            <div id="overlay"></div>                                                  
                    </div>
                    <img src='https://image.tmdb.org/t/p/w300/${resultados[$i].poster_path }' alt='${resultados[$i].original_title}'><img/>
                </div>
            </div>  
        `
       
        const $container= document.createElement('div');
        $container.innerHTML = panel;        
        $info.appendChild($container);
        modal()
    }

}
// função usada quando não se encontra a palavra chave digitada 
const naoAcho = ( palavraChave ) => {
    const  output = `
      <div class="erro">
        <h1>Desculpe ${palavraChave.value} não foi encontrado </h1>
      </div>
    `
    const $erro = document.createElement('div') 
    $erro.innerHTML = output
    const $saierro =document.getElementById('movies')
    $saierro.appendChild($erro)
}
// função de configuração do modal 
const modal = ( ) => {

  const openModalButtons = document.querySelectorAll('[data-modal-target]')
  const closeModalButtons = document.querySelectorAll('[data-close-button]')
  const overlay = document.getElementById('overlay')

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = document.querySelector(button.dataset.modalTarget)
      openModal(modal)
    })
  })

  overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal')
      closeModal(modal)
    })
  })

  const openModal = (modal) => {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
  }

  const closeModal = (modal) => {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
  }
}
teste = -1;
// carregando a função de configuração da api quando a tela carregar 
document.addEventListener('DOMContentLoaded', config);
// função main chamanda quando acontece o submit do form ( foi dificil achar como faz isso ein )
// limpar a tela  toda vez que ouver uma requisição da api
 // ainda não consegui fazer isso --- AJUDA

form.addEventListener('submit', async(e)=>{
  teste = teste + 1
    e.preventDefault();   
    let palavraChave = document.getElementById("palavraChave").value;
    let url = `${baseURL}search/movie?api_key=${chave}&language=pt-br&query=${palavraChave.trim()}`
    let headers= new Headers ({
        'Accept': 'application/json'
    })
    try{
      const pegaApi = await fetch(url,headers)
      const json = await pegaApi.json()
      const resultados = json.results
      return resultados ? preenche(resultados) : naoAcho(palavraChave)
    }catch{
      console.warn('Alguns resultados estão incompletos')
    }
  }) 
  if (teste == 1){
    limpaTela();
    teste = teste - 1
  }
