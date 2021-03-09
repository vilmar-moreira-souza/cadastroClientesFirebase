



const acesso = document.getElementById("acesso")
const divContainer = document.querySelector(".divContainer")
const result = document.querySelector("#result")
//
//verifica se user esta logado ou nao
auth.onAuthStateChanged(user => {  
    if (user) {        
        acesso.innerHTML += "ola: " + user.email
    }
    else {
        acesso.innerHTML = ""
        window.location.replace("http://127.0.0.1:5500/cadastroClientes/login.html")//usar ../login.html


    }
}
)
//
//logout() ao clicar
acesso.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
        if (confirm("deseja realmente sair")) {
            logout()
        }
    }
})
//
//busca dados do documento
function buscador  (documento,valor){ //documneto a ser buscado e o que buscar
    let teste
        db.collection(documento).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => ${doc.data().nome}=>${doc.data().endereço}=>${doc.data().observacao}`)
        if (valor == doc.id) {
            result.innerHTML = `<h3>fone:${doc.id} <br>nome: ${doc.data().nome}<br> endereço:${doc.data().endereço}<br>obs:${doc.data().observacao}</h3>`
            teste = 1
        } else {
            if (teste != 1) {
                result.innerHTML = `<h3>nada encontrado</h3>`
            }
        }

    })
})}

// cadastrar clients
divContainer.addEventListener("click", (e) => {
    e.preventDefault()    
    if (e.target.innerText == "buscar") {
        const busca = (e.target.parentNode.children[1].value)
        buscador ("clientes",busca)       
    }
  
    if (e.target.innerText == "cadastrar") {        
        const telefone = e.target.parentNode.children[0].children[1].value
        const name = e.target.parentNode.children[3].value
        const endereco = e.target.parentNode.children[5].value
        const obs = e.target.parentNode.children[7].value  
        let existe    
        if (telefone != "" && name != "" && endereco != "") {            
            db.collection("clientes").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {                    
                   // console.log(doc.id)
                    if (telefone == doc.id) {
                      existe =1
                    }  })                  
                    if (existe == 1) {
                        db.collection("clientes").doc(telefone).update(//usar set 1º vez inserir
                            //update atualizar-depis de ja ter criado
                            {
                                nome: name,
                                endereço: endereco,
                                observacao: obs,
                            })
                            .then(() => {
                                //console.log("update com sucesso  ")
                                result.innerHTML = `<h2>cadastro atualizado com sucesso</h2>`
                            }).catch(err => {
                                console.log(err)
                            })
                    } else{
                        db.collection("clientes").doc(telefone).set(//usar set 1º vez inserir
                            //update atualizar-depis de ja ter criado
                            {
                                nome: name,
                                endereço: endereco,
                                observacao: obs,
                            })
                            .then(() => {
                                //console.log("set com sucesso  ")
                                result.innerHTML = `<h2>cadastro realizado com sucesso</h2>`
                            }).catch(err => {
                                console.log(err)
                                result.innerHTML = `<p>${err}</p>`
                            })
                    }
                                
              
            })
            
            
        } else { alert("campos vazios") }

    }    
})
