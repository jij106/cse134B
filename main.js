window.onload = function () { 
    document.getElementById("loginform").onsubmit = function(){
        return checkLoginForm(this.username.value, this.password.value);
    };
};

function checkLoginForm(username, password){

    var url = "http://introweb.tech/api/Users/login";
    var payload = "username=" + username + "&password=" + password;
    
    sendRequest(url, payload);
    return false;
}

function handleResponse(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        console.log(rtobj.id);
        window.open("./crud.html?access_token="+rtobj.id, "_self");
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to login account");
        document.getElementById("errormsg").innerHTML = "Wrong username or password.";
    }
    else if (xhr.readyState == 4 && xhr.status == 400){
        console.log("Fail to login account");
        document.getElementById("errormsg").innerHTML = "Please enter the username and password.";
    }
}

function sendRequest(url, payload) {
    var xhr = new XMLHttpRequest(); // cross browser XHR creation

    if (xhr) {
        xhr.open("POST", url, true); 
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhr.onreadystatechange = function(){handleResponse(xhr);}; 
        xhr.send(payload);
    }
}