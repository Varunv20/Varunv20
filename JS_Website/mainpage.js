
window.onload=function(){
var cred = localStorage['cred2'];
localStorage.removeItem( 'cred2' );
cred = JSON.parse(cred);
document.getElementById("greeting").innerHTML = "Hello " + cred.fname + " " + cred.lname +"!"
var ws
function startWebsocket() {
  ws = new WebSocket('ws://localhost:8001')

  ws.onmessage = function(e){
  	receiveMessage(ws,e.data)
    console.log('websocket message event:', e.data)

  }

  ws.onclose = function(){
    // connection closed, discard old websocket and create a new one in 5s
    ws = null
    setTimeout(startWebsocket, 10)
  }
}
}