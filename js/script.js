
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const pokemonForm = document.querySelector('.form');
const pokemonSearch = document.querySelector('.input_search');
const pokemonPrev = document.querySelector('.btn-prev');
const pokemonNext = document.querySelector('.btn-next');

let searchPokemon = 1;


const fetchpokemon = async (pokemon) => {
    //função fazendo a requizição assincrona da api pokeapi
    //await espera a requisição ser feita
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    //if verifica o status da pagina para não executar uma pesquisa 404
    if(APIResponse.status === 200){
    //retorna um json para a variavel data
    const data = await APIResponse.json();
    return data;//retorna o resultado da variavel data
    }

}

//fazendo a requisição do pokemon e imprimindo ele na tela
const renderPokemon = async (pokemon) => {
   //Loading enquanto faz a requisição no servidor
    pokemonName.innerHTML = 'Loading ....';
    pokemonNumber.innerHTML = '';
 //variavel data retorna a função fetchpokemon que esta fazendo a requição no servidor
    const data = await fetchpokemon(pokemon);

    //verifica se o data está retornando alguma coisa, para executar a renderização dos pokemons
    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        //fazendo a requisição da imagem do objeto criado no servidor
        pokemonImg.src = data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        pokemonImg.style.display = 'block';
        searchPokemon = data.id;
    }else{
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Não Encontrado :c';
        pokemonImg.style.display = 'none';
    }
 


    // caso o nome do pokemon tenha mais que 15 caracteres ele altera o layout do nome
    const pokemondata = document.querySelector('.pokemon_data');
    if (pokemonName.innerHTML.length > 14) {
        pokemondata.classList.add("teste");
    }else{
        pokemondata.classList.remove("teste");
    }
   
}


//evento para o submit da pesquisa
pokemonForm.addEventListener('submit', (event) => {
    event.preventDefault();//remove o padrao do formulario
    renderPokemon(pokemonSearch.value.toLowerCase());
    pokemonSearch.value = '';
});

//evento para o clik no prox pokemon
pokemonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
});
//evento para o clik para o pokemon anterior
pokemonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//evento para o clik no prox pokemon
pokemonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
    }
});
//evento para o clik para o pokemon anterior
pokemonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

//pokemon que aparece assim que o site carrega
renderPokemon(searchPokemon);





