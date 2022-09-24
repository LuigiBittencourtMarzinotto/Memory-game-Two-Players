document.addEventListener("click", function(event){
    event.preventDefault();//bloquear o envio do formulario
    if(event.target.className.includes('onePlayer')){
        localStorage.setItem("mode","onePlayer");
        window.location = 'pages/login.html'
    }else if(event.target.className.includes('twoPlayer')){
        localStorage.setItem("mode","twoPlayer");
        window.location = 'pages/login.html'
        
    }else if(event.target.className.includes('vsComputador')){
        localStorage.setItem("mode","vsComputador");
        window.location = 'pages/login.html'
       

    }
    
})