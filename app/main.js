var userID;
var uName ;

function getRandomID(){
  return Math.floor(Math.random() * 1e11);
}

var socket = io.connect('http://localhost:8080' , {'forceNew' : true});
socket.on('messages',function(data){
 document.getElementById('txt-msg-area').value +=
          `${data.username}:  ${data.inputTxt} \n`;
});

socket.on('new-user',function(){
  userID = localStorage.getItem('userID') || getRandomID();
  localStorage.setItem('userID',userID);

  if (localStorage.getItem('userID'+uName)) {
    uName = localStorage.getItem('userID'+uName);
  } else {
    uName = prompt('what is your name?','e.g. John');
    uName == null ? uName='Unknown person': uName=uName;
    localStorage.setItem('userID'+uName , uName);
  }
});

function sendMsg(e){
  var msg = {
      inputTxt:document.getElementById("input-txt-msg-area").value,
      uID:userID,
      username:uName
  }
  document.getElementById("input-txt-msg-area").value = '';

  socket.emit("new-msg",msg);
  return false;
}
