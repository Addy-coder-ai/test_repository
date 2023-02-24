//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA6BfStAOIYg7_2kjjvJgFQIbaBJTPYrGA",
    authDomain: "ksomethingwitter.firebaseapp.com",
    databaseURL: "https://ksomethingwitter-default-rtdb.firebaseio.com",
    projectId: "ksomethingwitter",
    storageBucket: "ksomethingwitter.appspot.com",
    messagingSenderId: "256382242991",
    appId: "1:256382242991:web:6948132864198f97dec45a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  roomName = localStorage.getItem("room_name");
  user_name = localStorage.getItem("user_name");

  function send() {
     msg=document.getElementById("msg").value;
     firebase.database().ref(roomName).push({
    name:user_name,
    message:msg,
    like:0
     });
    document.getElementById("msg").value="";
  }
    
  function logout() {
    localStorage.removeItem("room_name");
    localStorage.removeItem("user_name");
    window.location="index.html";  
  }
  
  

function getData() { firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
//DUMB
console.log(firebase_message_id);
console.log(message_data);

name = message_data['name'];
like = message_data['like'];
msg = message_data['message'];

nameTag = "<h4>"+ name + "<img src = 'tick.png' class = 'user_tick' > </h4>";
msgTag = "<h4 class = 'message_h4'>" + msg + "</h4>";
likeBtn = "<button onclick = 'UpdateLike(this.id)' class = 'btn btn-warning' id = "+ firebase_message_id +" value = "+ like +">";
SpnWithTag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like:" + like + "</span> </button> <hr>";

row = nameTag + msgTag + likeBtn + SpnWithTag;
document.getElementById("output").innerHTML += row;
//CODE
    } });  }); }
getData();

function UpdateLike(message_id) {
console.log("click like btn" + message_id);
btnId = message_id;

likes = document.getElementById(btnId).value;
updatedLikes = Number(likes) + 1;
console.log(updatedLikes);
firebase.database().ref(roomName).child(message_id).update({

  like:updatedLikes
});
}