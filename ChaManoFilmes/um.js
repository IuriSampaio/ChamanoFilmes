const chave = '96988444ffe703373ca42f07efb5b6fc'
const baseURL = 'https://api.themoviedb.org/3/'

let config = async() =>{
    try{
    let url = `${baseURL}configuration?api_key=${chave}`
    const confgApi= await fetch(url)
    const configuracao =await confgApi.json()
    console.log("configurações da api:",configuracao)
    }catch(err){
      naoAcho('erro na api')
    }
}


const resultados = [{
    'title':"<div class='spinner'></div>",
    'vote_average':"<div class='spinner'></div>",
    'release_date':"<div class=''></div>",
    'poster_path':"<div class=''></div>",
    'overview':"<div class=''></div>"
    
}]



document.addEventListener('DOMContentLoaded', config);


const preenche = (resultados) =>{
    //$info.removeChild($info.firstChild)

    for($i=0; $i<=resultados.length;$i++){
     // preenche(DB[0])
     
        resultados[$i].poster_path ? console.log('sim') : document.getElementsByClassName('conteinerzinho').esconde
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
        const $info = document.getElementById('movies');
        $info.appendChild($container);
      
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
        
        function openModal(modal) {
          if (modal == null) return
          modal.classList.add('active')
          overlay.classList.add('active')
        }
        
        function closeModal(modal) {
          if (modal == null) return
          modal.classList.remove('active')
          overlay.classList.remove('active')
        }
     
    }
   

//const palavraChave = document.getElementById('palavraChave').value
//palavraChave.trim()
//  palavraChave.addEventListener("change", console.log(palavraChave))
} 



const pesquisa = async (palavraChave) =>{

        let url = `${baseURL}search/movie?api_key=${chave}&language=pt-br&query=${palavraChave}`
        let headers= new Headers ({
            'Accept': 'application/json'
        })
        const pegaApi = await fetch(url,headers).then((res)=>{return res.json()})   
        let resultados = pegaApi.results
        resultados ? preenche(resultados) : naoAcho(palavraChave)
           
    }


  const naoAcho = (palavraChave) =>{
    const  output = `
      <div class="erro">
        <h1>Desculpe ${palavraChave} não foi encontrado </h1>
      </div>
    `
    const $erro = document.createElement('div') 
    $erro.innerHTML = output
    const $saierro =document.getElementById('movies')
    $saierro.appendChild($erro)
  }