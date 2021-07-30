// Afficher ou non le menu de connexion en fonction de
// la présence d'un token d'authentification dans le localStorage

window.addEventListener("load", function(event) {

    var login = document.getElementById('auth');
    var signup = document.getElementById('reg');
    var deco = document.getElementById('deco');
    var post = document.getElementById('post');
    var suppr = document.getElementById('suppr');

    if (localStorage.getItem("Token")) {
        login.classList.add('d-none');
        signup.classList.add('d-none');
        deco.classList.remove('d-none');
        post.classList.remove('d-none');
        suppr.classList.remove('d-none');
    } else {
        login.classList.remove('d-none');
        signup.classList.remove('d-none');
        deco.classList.add('d-none');
        post.classList.add('d-none');
        suppr.classList.add('d-none');
    }

});

var deco = document.getElementById('deco');
deco.addEventListener('click', function(event) {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("UserName");
    window.location.assign("index.html");
});

