var firebaseConfig = {
    apiKey: "AIzaSyCqy7qJxw_yO_ZDdnq9ykJEBBLNnvnAxuI",
    authDomain: "instagram-f2dcd.firebaseapp.com",
    projectId: "instagram-f2dcd",
    storageBucket: "instagram-f2dcd.appspot.com",
    messagingSenderId: "579730330190",
    appId: "1:579730330190:web:cf92ee160eec667d1c691f",
    measurementId: "G-26JLBZHY9E"
  };

  firebase.initializeApp(firebaseConfig)
var provider = new firebase.auth.GoogleAuthProvider()

  
  var db = firebase.firestore()
  var auth = firebase.auth()
  var userid = localStorage.getItem("user_uid")
  var userNamePost = ""
  console.log("data",userNamePost)

  if(userid){
    var sign_up = document.getElementById("sign-up")
    var root = document.getElementById("root")
    sign_up.classList.add("d-none")
    root.classList.remove("d-none")
    var login = document.getElementById("login")
    login.classList.add("d-none")
  }


  function google() {
    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
      localStorage.setItem("user_uid",user.uid)  
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  function sign_up() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var fullName = document.getElementById("fullname").value
    var username = document.getElementById("username").value
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      var uid = user.uid

    // ...
    db.collection("users").add({
        email,
        password,
        fullName,
        username,
        uid,
        
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem("user_uid",user.uid)
        
          var sign_up = document.getElementById("sign-up")
          var root = document.getElementById("root")
          sign_up.classList.add("d-none")
          root.classList.remove("d-none")
          var login = document.getElementById("login")
          login.classList.add("d-none")
        

    
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    console.log("no",errorMessage)
  });
  }

  function logn() {
    var email = document.getElementById("email1").value
    var password = document.getElementById("password1").value

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
    console.log("yes",user)
    var sign_up = document.getElementById("sign-up")
    var root = document.getElementById("root")
    sign_up.classList.add("d-none")
    root.classList.remove("d-none")
    var login = document.getElementById("login")
    login.classList.add("d-none")
    localStorage.setItem("user_uid",user.uid)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });
  
  }
  
  function post(){
    var post_write = document.getElementById("post_write").value
    var post_url = document.getElementById("post_url").value
    
    db.collection("post").add({
        post_write,
        post_url,
        userid,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
    
  }
  reload()
  function reload() {
    var userName = ""
    var post_all = document.getElementById("post_all")
    db.collection("post").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var post_url = doc.data().post_url;
        var post_write = doc.data().post_write;
        console.log(post_url)
        var boder_div = document.createElement("div")
        boder_div.classList.add("boder_post")
        var profile_continer = document.createElement("div")
        profile_continer.classList.add("post_profile")
        boder_div.appendChild(profile_continer)
        post_all.appendChild(boder_div)
        var profile_icon_div = document.createElement("div")
        profile_icon_div.classList.add("profile_icon")
        profile_continer.appendChild(profile_icon_div)
        var profile_name_div = document.createElement("div")
        var profile_name = document.createTextNode(abc)
        profile_name_div.appendChild(profile_name)
        profile_continer.appendChild(profile_name_div)
        var post_url_div = document.createElement("img")
        post_url_div.setAttribute("src",post_url)
        post_url_div.classList.add("post_width")
        boder_div.appendChild(post_url_div)
        var post_data = document.createElement("div")
        var post_data_text = document.createTextNode(post_write)
        post_data.appendChild(post_data_text)
        boder_div.appendChild(post_data)
      });
  });
  // db.collection("users").where("uid", "==", userid)
  // .get()
  // .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //         // doc.data() is never undefined for query doc snapshots
  //         userName = doc.data().username
          
  //       });
  //       userNamePost=userName
  //       console.log(userNamePost)
  //     })
  // .catch((error) => {
  //     console.log("Error getting documents: ", error);
  // });
    
  }
function login_page(){
  var sign_up = document.getElementById("sign-up")
  sign_up.classList.add("d-none")
  var login = document.getElementById("login")
  login.classList.remove("d-none")
}

function new_account(){
  var sign_up = document.getElementById("sign-up")
  sign_up.classList.remove("d-none")
  var login = document.getElementById("login")
  login.classList.add("d-none")
}