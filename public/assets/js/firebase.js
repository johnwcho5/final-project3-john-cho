$(document).ready(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCQCiBJxvHW-VhUpu5RfeuPjYx2kqulWKI",
    authDomain: "tjkwebsite.firebaseapp.com",
    databaseURL: "https://tjkwebsite.firebaseio.com",
    projectId: "tjkwebsite",
    storageBucket: "tjkwebsite.appspot.com",
    messagingSenderId: "123366139864"
  };
  firebase.initializeApp(config);

  /*const User = {
    company: 

  };*/
 

  //getting elements
  const txtEmail = $("#txtEmail");
  const txtPassword = $("#txtPassword");
  const btnLogin = $("#btnLogin");
  const btnSignUp = $("#btnSignUp");
  const btnLogout = $("#btnLogout");

  //add listener for login event
  btnLogin.on("click", e =>{
    //get the email and password filled out by user
    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();
    //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(err => console.log(err.message));
  });

  //add signup event
  btnSignUp.on("click", e =>{
    //get the email and password filled out by user
    //TODO: check for real email
    const email = txtEmail.val();
    const pass = txtPassword.val();
    const auth = firebase.auth();
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(err => console.log(err.message));
  });

  //add log out event
  btnLogout.on("click", e =>{
    firebase.auth().signOut().then(()=>{

    }).catch(err =>{
      console.log(err);
    });
  });

  //add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      var user ={
        id: firebaseUser.uid
      };
      console.log(user);
      //make a call to the database to check if user is admin or regular
      $.get("/api/user/" + firebaseUser.uid, function(data,status){
        console.log(data[0].admin);
        //check if admin
        if(data[0].admin){
          window.location = "/dashboard";
           firebase.auth().signOut().then(()=>{

          }).catch(err =>{
            console.log(err);
          });
        }
      });
    }
    else{
      console.log("not logged in");
    }
  });

});