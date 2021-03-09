var firebaseConfig = {
    apiKey: "AIzaSyCSJD4xCPx5xne9gEMcZ6gOVr7xTllAxwc",
    authDomain: "clientes-6a864.firebaseapp.com",
    databaseURL: "https://clientes-6a864-default-rtdb.firebaseio.com",
    projectId: "clientes-6a864",
    storageBucket: "clientes-6a864.appspot.com",
    messagingSenderId: "388678794637",
    appId: "1:388678794637:web:d34c789bad599da99f51c4"
}


// Initialize Firebase
firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()
const auth = firebase.auth()

// valores teste
//let email= "vilmar@gmail.com"
//let password = "123abc"