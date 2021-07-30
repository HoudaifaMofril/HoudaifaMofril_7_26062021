const elt = document.getElementById('submit');

   
elt.addEventListener('click', function() {          
    
    var inputEmail = document.getElementById("email");
	var inputPass = document.getElementById("password");
	var checkForm = true;

	inputEmail.classList.remove("error");
	inputPass.classList.remove("error");

	if (!inputEmail.checkValidity()) {
		checkForm = false;
		inputEmail.classList.add("error");
	}

	if (!inputPass.checkValidity()) {
		checkForm = false;
		inputPass.classList.add("error");
	}

	if (checkForm) {
		var user = {
				email: inputEmail.value,
				password: inputPass.value
			};

			request("auth/login", 200, "POST", JSON.stringify(user),[{key: "Content-Type", value: "application/json"}] )
				.then(function(data){
				localStorage.setItem("Token", data.token);
				localStorage.setItem("userId", data.userId);
				localStorage.setItem("UserName", data.fname + " " + data.lname);
                window.location.assign("index.html");
			}).catch((error) => {
				console.log(error);
			}
			);
	}

});

//Envoyer le formulaire en appuyant sur la touche 'Entrée'

document.getElementById("formlogin").addEventListener("keyup", function(event) {
	if (event.code == "Enter") {
		elt.click();
	}
})