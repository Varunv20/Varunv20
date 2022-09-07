
function moreinfo(websocket,exists){
		let newWindow = open('account_details.html', 'example', 'width=500,height=500')
	
		const timer = setInterval(() => {
		if (newWindow.closed==true){
		clearInterval(timer);	
		var cred = localStorage['cred1'];
		localStorage.removeItem( 'cred1' );
		cred = JSON.parse(cred);
	    console.log(cred.data)

		const credentials = {
    	username: document.getElementById("username").value,
    	password: document.getElementById("password").value,
    	exists: exists,
    	fname: cred.fname,
    	lname: cred.lname,
    	email: cred.email,
    	phone_number: cred.phone_number,
    	action: "sign-in"

    	} 
    	
    	websocket.send(JSON.stringify(credentials));
	    }}, 500);  
}
function receiveMessage(websocket, data) {
    console.log("r_func")
    
    const event = JSON.parse(data);
    console.log(event.email_d)
    if (event.exists == "true"&& event.correct) {
    	location.replace("MainPage.html");
    	localStorage.setItem( 'cred2',JSON.stringify(event));	
    } 
   	//location.replace("MainPage.html");
   	else if(event.username_d == "true") {
   		document.getElementById("p1").innerHTML = "Username Taken Please Re-Enter"
   		//sendcredentials(websocket,"false")
   	}
   	else if (event.username_d == "true"){
   		document.getElementById("p1").innerHTML = "Email Taken Please Re-Enter"
   		//sendcredentials(websocket,"false")
   	}
   	else {
   		document.getElementById("p1").innerHTML = "Email Taken Please Re-Enter"
   	}
}

function sendcredentials(websocket, exists) {

	console.log("hello1");
	if (exists =="false"){
		moreinfo(websocket,exists)	

	}
	else{
		const credentials = {
    	username: document.getElementById("username").value,
    	password: document.getElementById("password").value,
    	exists: "exists",
    	fname: "a",
    	lname: "cred.lname",
    	email: "cred.email",
    	phone_number: "cred.phone_number",
    	action: "sign-in"

    	} 
	    console.log(credentials)
	    websocket.send(JSON.stringify(credentials));	


	}
    
}
/*
window.onload = function() {
	const websocket = new WebSocket("ws://192.168.192.1:8001/");

	var e_sign_in = document.getElementById("e-signin");
    e_sign_in.addEventListener("click", sendcredentials(websocket, true));

	var e_createaccount = document.getElementById("e-create");
    e_createaccount.addEventListener("click", sendcredentials(websocket, false));

}
*/
function create_websocket(){
	const socket = new WebSocket('ws://localhost:8001');
	return socket;	
}
window.onload=function(){
/*
class Websocket1 {
  constructor(){
  	this.ws = null
  }
  startWebsocket() {
    this.ws = new WebSocket('ws://localhost:8000')

  this.ws.onmessage = function(e){
    console.log('websocket message event:', e)
  }

  this.ws.onclose = function(){
    // connection closed, discard old websocket and create a new one in 5s
    this.ws = null
    console.log("hello81")
    setTimeout(socket.startWebsocket, 0)
  }
  }
}

socket = new Websocket1()
socket.startWebsocket()
*/
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

startWebsocket();

var e_sign_in = document.getElementById("signin");
if(e_sign_in){
	e_sign_in.addEventListener("click", event => {
		//console.log("hello");
		sendcredentials(ws, "true");
		//console.log("hello2");
		//return false;
	});

}

var e_create = document.getElementById("e-create");
if(e_create){
	e_create.addEventListener("click", event => {
		//console.log("hello");
		sendcredentials(ws, "false");
		//console.log("hello2");
		//return false;
	});

}
/*

var e_createaccount = document.getElementById("e-create");
if(e_createaccount){
	e_createaccount.addEventListener("click",  event => {sendcredentials(socket, "false")});
}

   if ( socket.readyState === 3 ) {
        socket.close();
        socket = new WebSocket('ws://localhost:8000');

        // wait until new connection is open
        while (socket.readyState !== 1) {
            new Promise(r => setTimeout(r, 250));
        }
   }
/*
socket.addEventListener('open', function (event) {
 	const credentials = {
 		username: document.getElementById("username"),
    	password: document.getElementById("password"),
    	exists: true,
 	}
    socket.send(JSON.stringify(credentials));
 
});
 

socket.onclose = function(){
console.log('server close');
}
socket.addEventListener('message', function (event) {
	console.log(event.data); 
    receiveMessage(socket, event.data);
    //socket.close()
    return false;
 
});

const contactServer = () => {
 
    socket.send("Initialize");
 
}
*/
}
