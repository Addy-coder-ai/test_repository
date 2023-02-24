function logout() {
    localStorage.removeItem("user_name");
    window.location = "index.html";
}

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

  userName=localStorage.getItem("user_name");
  document.getElementById("user_name").innerHTML="Hello "+ userName + "!";
  function addRoom() {
  roomName=document.getElementById("room_name").value;  
  firebase.database().ref("/").child(roomName).update({
        purpose:"adding the room name"
  });
  localStorage.setItem("room_name" , roomName);
  window.location="kwitter_page.html";
  }

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
     Room_names = childKey;
    //Get in
    console.log("room_name" + Room_names);
    row="<div class='room_name' id="+Room_names+"onclick='RedirectToRoomName(this.id)'> # "+ Room_names+"</div> <hr>";
    document.getElementById("output").innerHTML+=row;
    //Get OUT
    });});}
getData();

function RedirectToRoomName(name) {
console.log(name);
localStorage.setItem("room_name" , name);
window.location = "kwitter_page.html";    
}
