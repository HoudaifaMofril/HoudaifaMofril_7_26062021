function userIsAdmin(){
    fetch('http://localhost:3000/api/auth/users', {method: 'GET'})
        .then(response => response.json())
        .then(userAdmin => {
            let isUserAdmin = userAdmin.isAdmin;
        })
}

// fetch('http://localhost:3000/api/auth/users', {method: 'GET'})
// 	.then(response => response.json())
// 	.then(userAdmin => {
// 		// console.log(userAdmin)
//
// 		// if (data.userId === localStorage.userId  && data.isAdmin === true){
// 		// 	const divbutton = document.createElement("div");
// 		// 	divbutton.setAttribute("class", "mb-3");
// 		// 	card.appendChild(divbutton);
// 		//
// 		// 	const delpost = document.createElement("button");
// 		// 	delpost.setAttribute("id", "delpost" + post.id);   // Bouton supprimer
// 		// 	delpost.setAttribute("class", "btn btn-danger col-6");
// 		// 	delpost.innerHTML = "Supprimer";
// 		// 	divbutton.appendChild(delpost);
// 		//
// 		// 	const modpost = document.createElement("button");
// 		// 	modpost.setAttribute("class", "btn btn-warning col-6"); // Bouton modifier
// 		//
// 		// 	modpost.addEventListener("click", function () {
// 		// 		localStorage.setItem("title", post.title);
// 		// 		localStorage.setItem("text", post.text);
// 		// 		localStorage.setItem("postUserId", post.userId);
// 		// 		window.location.assign("modpost.html?id=" + post.id);
// 		// 	})
// 		// 	modpost.innerHTML = "Modifier";
// 		// 	divbutton.appendChild(modpost);
// 		//
// 		// 	const del = document.getElementById('delpost' + post.id);
// 		// 	del.addEventListener('click', function () {
// 		// 		request("posts/" + post.id, 200, "DELETE", null, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }])
// 		// 			.then(function (data) {
// 		// 				window.location.reload();
// 		// 			}).catch((error) => {
// 		// 			console.log(error);
// 		// 		})
// 		// 	});
// 		//
// 		// }
// 	})



