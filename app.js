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
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  }

  function post(){
    var post_write = document.getElementById("post_write").value
    var post_url = document.getElementById("post_url").value

    db.collection("post").add({
        post_write,
        post_url,
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
    post_write = ""
    post_url = ""
    
  }
  reload()

  function reload() {
    var post_all = document.getElementById("post_all")
    db.collection("post").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var post_url = doc.data().post_url;
        var post_write = doc.data().post_write;
        console.log(post_url)
        var boder_div = document.createElement("div")
        boder_div.classList.add("boder_post")
        post_all.appendChild(boder_div)
        var profile_icon_div = document.createElement("div")
        profile_icon_div.classList.add("profile_icon")
        boder_div.appendChild(profile_icon_div)
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


    // var post_all = document.getElementById("post_all")
    // var boder_div = document.createElement("div")
    // boder_div.classList.add("boder")
    // post_all.appendChild(boder_div)
    // var profile_icon_div = document.createElement("div")
    // profile_icon_div.classList.add("profile_icon")
    // boder_div.appendChild(profile_icon_div)
    // var post_uesrname_div = document.createElement("div")
    // var post_uesrname_text = document.createElement(username1)
    // post_uesrname_div.appendChild(post_uesrname_text)
    // boder_div.ap
    
  }