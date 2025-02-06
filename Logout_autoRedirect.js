console.log(sessionStorage.getItem("userAccount"))

if(sessionStorage.getItem("userAccount") == "notSignedIn"){
    window.location.href = "index.html";
}