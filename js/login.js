function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if(user === "admin" && pass === "admin123"){
        localStorage.setItem("login", "true");
        window.location.href="main.html";
    }else {
        alert("Invalid Credentials");
    }
}