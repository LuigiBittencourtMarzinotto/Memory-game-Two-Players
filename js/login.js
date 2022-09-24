const input = document.querySelector(".login_input");
const button = document.querySelector(".login_button");
const modoEscolhido = localStorage.getItem("mode");
const login_form = document.querySelector(".login_form");
let boleanButton=false;
if(modoEscolhido==="twoPlayer"){
    button.setAttribute("class","twoJogadores login_button")
    let inputJogadorTwo = document.createElement("input");
    inputJogadorTwo.setAttribute("class","login_input")
    inputJogadorTwo.setAttribute("placeholder","Player 2")
    let buttonTwoPlayer = document.createElement("button")
    buttonTwoPlayer.innerHTML="Play"
    buttonTwoPlayer.setAttribute("class", "login_button");
    buttonTwoPlayer.setAttribute("disabled","")
    input.addEventListener("input", function(event){
        //esse "input", ele faz essa função ser chamada sempre que algum dado for colocado no input
        if(event.target.value.length>2){
            boleanButton=true
        }else{
            boleanButton=false
        }
    })
    inputJogadorTwo.addEventListener("input", function(event){
        //esse "input", ele faz essa função ser chamada sempre que algum dado for colocado no input
        if(event.target.value.length>2 && boleanButton){
            buttonTwoPlayer.removeAttribute('disabled')
        }else{
            buttonTwoPlayer.setAttribute("disabled","")
        }
    })

    login_form.appendChild(inputJogadorTwo)
    login_form.appendChild(buttonTwoPlayer)
    buttonTwoPlayer.addEventListener("click",function(event){
        event.preventDefault();//bloquear o envio do formulario
        localStorage.setItem("playerOne",input.value)
        localStorage.setItem("playerTwo", inputJogadorTwo.value)
        window.location = 'game.html'
    })

}else{
    button.setAttribute("class","login_button")
    input.addEventListener("input", function(event){
        //esse "input", ele faz essa função ser chamada sempre que algum dado for colocado no input
        if(event.target.value.length>2){
            button.removeAttribute('disabled')
        }else{
            button.setAttribute("disabled","")
        }
    })
    button.addEventListener("click",function(event){
        event.preventDefault();//bloquear o envio do formulario
        localStorage.setItem("playerOne",input.value)
        window.location = 'game.html'
    })
}

