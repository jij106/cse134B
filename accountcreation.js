window.onload = function () { 
    document.getElementById("accform").onsubmit = function(){
        return checkAccForm(this.username.value, this.email.value, this.password.value, this.repassword.value);
    };
};

function checkAccForm(username, email, password, repassword){

    var url = "http://introweb.tech/api/Users";
    var payload = "username=" + username + "&email=" + email + "&password=" + password;
    if(username==""){
        alert("Please type your username.");
        return false;
    }
    if(email==""){
        alert("Please type your email.");
        return false;
    }
    
    if(repassword==""){
        alert("Please retype your password.");
        return false;
    }else if(repassword!=password){
        alert("Please check your retype password matches.");
        return false;
    }else{
        sendRequest(url, payload);
        return false;
    }
}

function handleResponse(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        console.log(rtobj.username + "successfully create account");
        alert("Success to create a new account, go to the login page");
        window.open("./index.html", "_self");
    }
    else if (xhr.readyState == 4 && xhr.status == 422){
        console.log("Fail to create account");
        alert("Duplicate email or username. Please change it.");
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