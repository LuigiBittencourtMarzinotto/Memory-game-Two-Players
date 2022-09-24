const grid = document.querySelector(".grid")//aonde se encontra as cartas
const spanPlayer = document.querySelector('.player')//player one
const timer = document.querySelector('.timer')//time
const spanPtsOne = document.querySelector('.ptsOne');//pontuaçao
const playerfirst = localStorage.getItem('playerOne');//name
const playersecond = localStorage.getItem('playerTwo');//name
const player = document.querySelector(".players")//para adicionar o player dois
let jogadorVez="one";
let firstPts=0;
let secondPts=0;
let vencedor;
const characters=[
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
]//Aqui vai dentro de array os nome das imagens

const createElement= function createElement(tag,className){ //cria os elementos ou seja tem que esta presente emm todos os modos
    const element = document.createElement(tag);
    element.className = className;
    return element;
};  

let firstCard='';//e oq vai recebe a carta que foi aberta
let secondCard='';
function checkEndGame(){//verifica se o game terminou ou seja tem que esta presente emm todos os modos
    const disabledCards = document.querySelectorAll(".disabled-card");
    if(disabledCards.length == characters.length*2){
        clearInterval(this.loop)
        setTimeout(function(){
            if(firstPts>secondPts){
                vencedor=`O jogador: ${playerfirst} venceu`
            }else{
                vencedor=`O jogador: ${playersecond} venceu`

            }
            let confirmacao = confirm(`O jogador: ${vencedor} venceu, deseja jogar novamente`)
            if(confirmacao){
                location.reload();
            }else{
                window.location = '../index.html'
            }
        },500)


    }
}
function checkCards(){
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');
    if(localStorage.getItem("mode")=="onePlayer"){
        if(firstCharacter==secondCharacter){
            firstCard.firstChild.classList.add('disabled-card')
            secondCard.firstChild.classList.add('disabled-card')//isso é para o filho fica em preto e branco
            firstCard='';
            secondCard='';
            checkEndGame();
            firstPts+=1
    
        }else{
            setTimeout(function(){
                firstCard.classList.remove('reveal-card')
                secondCard.classList.remove('reveal-card')
                firstCard='';
                secondCard='';
            },500)
    
        }
    }else if(localStorage.getItem("mode")=="twoPlayer" ){
        if(firstCharacter==secondCharacter){
            firstCard.firstChild.classList.add('disabled-card')
            secondCard.firstChild.classList.add('disabled-card')//isso é para o filho fica em preto e branco
            firstCard='';
            secondCard='';
            checkEndGame();

            if(jogadorVez=="one"){
                firstPts+=1


            }else{
                secondPts+=1

            }
    
        }else{
            setTimeout(function(){
                firstCard.classList.remove('reveal-card')
                secondCard.classList.remove('reveal-card')
                firstCard='';
                secondCard='';
            },500);
            if(jogadorVez=="one"){
                jogadorVez="two"
    
    
            }else{
                jogadorVez="one"
    
            }
        }
    }else{
        if(firstCharacter==secondCharacter){
            firstCard.firstChild.classList.add('disabled-card')
            secondCard.firstChild.classList.add('disabled-card')//isso é para o filho fica em preto e branco
            firstCard='';
            secondCard='';
            checkEndGame();

            if(jogadorVez=="one"){
                firstPts+=1


            }else{
                secondPts+=1

            }
    
        }else{
            setTimeout(function(){
                firstCard.classList.remove('reveal-card')
                secondCard.classList.remove('reveal-card')
                firstCard='';
                secondCard='';
            },500);
            if(jogadorVez=="one"){
                jogadorVez="two"
    
    
            }else{
                jogadorVez="one"

    
            }
        }

    }
}

const revealCard= function revealCard(event, teste){

    if(!event.target.className.includes("grid")){
        if(event.target.parentNode.className.includes('reveal-card')){
            return;
        }
        if(firstCard ===''){
            event.target.parentNode.classList.add("reveal-card"); // ele pega o pai da carta que foi clicada e adicionol essa class
            firstCard= event.target.parentNode;
        }else if(secondCard ===''){
            event.target.parentNode.classList.add("reveal-card"); // ele pega o pai da carta que foi clicada e adicionol essa class
            secondCard= event.target.parentNode;
        }
    }
    checkCards();
}

function mode(){
    let card = document.querySelector(".grid");
    const modoEscolhido = localStorage.getItem("mode");
    if(modoEscolhido=="onePlayer"){
        card.addEventListener('click', revealCard);//chama a function de modo
    }
    if(modoEscolhido=="twoPlayer"){
        card.addEventListener('click', revealCard);//chama a function de modo
        let playertwo = document.createElement("span");
        player.appendChild(playertwo);
        playertwo.classList.add("playertwo")
        playertwo.innerHTML=localStorage.getItem('playerTwo');
        let ptsPlayerTwo = document.createElement("span")
        ptsPlayerTwo.classList.add("pts")
        ptsPlayerTwo.classList.add("ptsTwo")
        ptsPlayerTwo.innerHTML="Pts:"
        player.appendChild(ptsPlayerTwo);
        let ptsPlayerTwoNumber = document.createElement("span")
        ptsPlayerTwoNumber.classList.add("ptstwonumber")
        ptsPlayerTwo.appendChild(ptsPlayerTwoNumber);

    }

    
}

const createCard= function createCard(character){ //criação da estrutura da carta
    const card = createElement('div', 'card')//primeiro parametro oq é criado e o outro a class
    const front = createElement('div', 'face front')
    const back = createElement('div', 'face back');
    front.style.backgroundImage= `url('../img/${character}.png')`;
    card.appendChild(front);
    card.appendChild(back);
    card.setAttribute('data-character', character)
    return card
    
};

const loadGame = function loadGame(){
    const duplicateCharacters = [...characters, ...characters]//isso e para ele pega todos
        
    const shuffledArray = duplicateCharacters.sort(()=>
        Math.random()-0.5
    )//metodo de embaralhar os elementos do array, se for menor que um ele pula para o outro, dai o radom vai rodando ate todos irem 
    
    shuffledArray.forEach(function(character){
        const card = createCard(character);
        grid.appendChild(card)
    });//busca carta do cards, um por um ele passa dentro de cada coisa do array
    mode();
}
const startTimer = () => { //contador de tempo

    this.loop=setInterval(() => {
      const currentTime = +timer.innerHTML;
      timer.innerHTML = currentTime + 1;
    }, 1000);
    setInterval(() =>{
        let secondPtsTwo = document.querySelector(".ptstwonumber")
        spanPtsOne.innerHTML=firstPts;
        if(localStorage.getItem("mode")=="twoPlayer" ||localStorage.getItem("mode")=="vsComputador" ){
            secondPtsTwo.innerHTML=secondPts;
            if(jogadorVez=="one"){
                const spanPlayerTwo = document.querySelector('.playertwo')
              spanPlayer.setAttribute("class", "player vez")
              spanPlayerTwo.classList.remove("vez")
  
            }else{
                const spanPlayerTwo = document.querySelector('.playertwo')
              spanPlayer.setAttribute("class", "player")
              spanPlayerTwo.classList.add("vez")
            }
        }else if(localStorage.getItem("mode")=="onePlayer"){
            spanPlayer.setAttribute("class", "player vez")

        }
        

    },100)//atualizar as coisas
  
}

  
//MAIN
window.onload=function(){
    
    spanPlayer.innerHTML=playerfirst;
    loadGame();
    startTimer();

}
