window.history.forward();

function blockPreviousPagenavigation() {
    window.history.forward(); 
}

sessionStorage.setItem( "credentials", JSON.stringify({name :["sushanth","nitika"], password :["123","456"]}));
var res = sessionStorage.getItem("credentials");
console.log(res);

function validateLogin (){
    var uname = document.getElementById("username").value;
    var pword = document.getElementById("password").value;
    var credString = JSON.parse(res);
    credString.name.map((item,ind) => {
        if(uname === item && pword === credString.password[ind]) {
            location.href = "resume-viewer.html";
        }
            else {
                document.getElementById("error-display").innerHTML = "Error! Invalid Username or Password";
            }
    })
}