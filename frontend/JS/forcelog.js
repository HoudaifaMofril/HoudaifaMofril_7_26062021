/// Forcer l'utilisateur à se déconnecter si le Token a expirer

if (!localStorage.getItem("Token")) {
    window.location.assign("login.html");
}