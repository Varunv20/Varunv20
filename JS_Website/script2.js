
window.onload=function(){
var e_create2 = document.getElementById("e-create2");
e_create2.addEventListener("click", event => {
			console.log("hello");
		    console.log("e-create2")

			var fname = document.getElementById("fname").value;
			var lname = document.getElementById("lname").value;
			var email = document.getElementById("email").value;
			var phone = document.getElementById("phone").value;
			const credentials = {
	    	
	    	fname: fname,
	    	lname: lname,
	    	email: email,
	    	phone_number: phone

	    	}   
		    console.log(credentials);
		    localStorage.setItem( 'cred1',JSON.stringify(credentials));	
		    window.close()

		})

}