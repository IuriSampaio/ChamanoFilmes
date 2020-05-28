# Trabalhando com a API the movie db
##### Projeto programação web front end | Profesor Fernando Leonid | SENAI Jandira
____________________________________________________________________________________________________________________________________

![the movie database](./images/tmdb.jpg)

____________________________________________________________________________________________________________________________________

## Como usar a api:
- Primeiro deve-se criar uma conta em https://www.themoviedb.org e seguir os caminhos nescessarios para adiquirir uma chave para a API 
- Com a chave da api, pode-se estudar o possivel de se fazer com a api em https://developers.themoviedb.org/3 aqui será apenas retratado apenas alguns dos seus possiveis métodos
- A api apenas é separada entre sua base https://api.themoviedb.org/3/ e a chave da api ao lado configuration?api_key=$CHAVEDAAPI , com a url final https://api.themoviedb.org/3/configuration?api_key=$CHAVEDAAPI essa url irá retornar as configurações da api json de configuração:

``` 
  {
          change_keys: (53) ["adult", "air_date" ..]
          images:
          backdrop_sizes: (4) ["w300", "w780", "w1280", "original"]
          base_url: "http://image.tmdb.org/t/p/"
          logo_sizes: (7) ["w45", "w92", "w154", "w185", "w300", "w500", "original"]
          poster_sizes: (7) ["w92", "w154", "w185", "w342", "w500", "w780", "original"]
          profile_sizes: (4) ["w45", "w185", "h632", "original"]
          secure_base_url: "https://image.tmdb.org/t/p/"
          still_sizes: (4) ["w92", "w185", "w300", "original"]
   }  
```

__________________________________________________________________________________________________________________________________

- Esse json possui a base da url nescessaria para se trabalhar com a base de imagens (protocolo http para trabalhar com a imagem base_url)
- Após escolher a base da url em http ou https, deve-se escolher o tamanho da imagem que poder ser o poster o filme, uma cena, etc..
- Para escolher qual desses tipos de imagem do filme se vai trabalhar, basta fazer uma requisição de pesquisa qualquer a api, para ver  como se retornam os dados..
- link para requisição de uma pesquisa para retorno dos dados: https://api.themoviedb.org/3/search/movie?api_key=CHAVEAPI&language=pt-br&query=NOMEFILME
_________________________________________________________________________________________________________________________________
- Exemplo de retorno de dados a uma pesquisa: 
```  
    [
         0:
            adult: false
            backdrop_path: "/xXoc8OZ8ivVlRfuS8wQ7PTt68ss.jpg"
            genre_ids: [37]
            id: 429
            original_language: "it"
            original_title: "Il buono, il brutto, il cattivo"
            overview: "É de longe ...ood!"
            popularity: 30.549
            poster_path: "/5KI3QNTtEUzuAOsX42aepAjHhYf.jpg"
            release_date: "1966-12-23"
            title: "O Bom, O Mau e o Vilão"
            video: false
            vote_average: 8.4
            vote_count: 4957
    ]
```
__________________________________________________________________________________________________________________________________
- Qualquer pesquisa irá retornar 21 filmes em um array de 0 á 20, todos eles com os dados ali mostrados 
- O campo poster_path possui o final da url nescessaria para obter o poster/capa do filme , e o backdrop_path uma cena de filme 
- link final pra requisição da imagem : https://image.tmdb.org/t/p/w300/5KI3QNTtEUzuAOsX42aepAjHhYf.jpg


