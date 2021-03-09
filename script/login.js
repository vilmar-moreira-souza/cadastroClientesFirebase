


//variaveis globais
const senha = document.getElementById("senha")
const email = document.getElementById("email")
const confirmarEmail = document.getElementById("corfirmarEmail")
const submit = document.getElementById("submit")
const cada = document.getElementById("cadastrar")
const mensagens = document.getElementById("mensagens")
const cadastroDisplay = document.querySelectorAll(".cadastro")
//
//
submit.addEventListener("click", (e) => {
    e.preventDefault()
    if (senha.value != "" && email.value !="") {
        login(email.value, senha.value)
    }else{alert("prencha os campos")}

})
//
//cadastro user
cada.addEventListener("click", (e) => {
    e.preventDefault()
    cadastroDisplay[0].style.display = "flex"
    cadastroDisplay[1].style.display = "flex"
    submit.style.display = "none"
    cada.parentElement.innerHTML = ` <button type="submit" id="cadastrar">cadastrar</button>`
    mensagens.innerHTML = `<br><br><h3>ja tem cadastro:</h3><button id="voltar">acessar</button> `
    if (senha.value != "" && email.value != "" && confirmarEmail.value != "") {
        cadastro(email.value, senha.value)
        //cadastrar.innerText= "cadastrar"        
    }

})

//
//cria novo usuario com email e senha
function cadastro(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("ok")
            // ...
        })
        .catch((error) => {
            console.log("eero")
            var errorCode = error.code
            var errorMessage = error.message
            const erro = document.getElementById("erro")
            erro.innerText += error.message
            console.log(error.message)
            // ..
        });

}
//login com email e senha
const login = (email, password) => {
    //local- apenas aquela aba
    //SESSION - todas as abas sempre logado
    //none -atualizou é deslogado
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            //
            auth.signInWithEmailAndPassword(email, password).then(loggedUser => {
                console.log("login com sucesso")
                console.log(auth.currentUser)
                mensagens.innerText = "logado: " + auth.currentUser.email
            }).catch(error => {
                console.log(error + " nao encontrado")
                mensagens.innerHTML =  `<p class="minimal">${error}</p>` 
            })
            //  
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        })
}

//login(email,password)
function logout() {
    auth.signOut().then(() => {
        console.log("usuario deslogado")
    }).catch(error => {
        console.log(error)
    })
}
//ver usuario logado, fica ouvido quando a mudança
auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user.email)
        mensagens.innerText = "logado: " + user.email
        window.location.href = "http://127.0.0.1:5500/cadastroClientes/"// usar ../index.html
    }
    else {
        console.log("ninguem logado")
    }
})



