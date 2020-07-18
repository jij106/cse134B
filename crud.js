var access_token;
var editId;
var deleteId;

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}

function renderCanvas() {
    access_token = getQueryVariable("access_token");
    console.log(access_token);
    var xhr = new XMLHttpRequest();
    var url = "http://introweb.tech/api/movies/movieList?access_token=" + access_token; 
    if (xhr) {
        xhr.open("GET", url, true); 
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhr.onreadystatechange = function(){renderData(xhr);}; 
        xhr.send(null);
    }
}

function renderData(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        var movies = rtobj.movies;
        console.log(rtobj.movies);
        var data="";
        for(i = 0; i < movies.length; i++){
            if(movies[i] != false) {
                data += `<li>`;
                data += `<img src="${movies[i].image}" alt="${movies[i].title}" class="mimg">`;
                data += "<div class='info'>";
                data += `${movies[i].title} (${movies[i].year}) - Rated: ${movies[i].rating}  `;
                data += `<br>`
                data += `Genre: ${movies[i].genre} &nbsp; User Rating: ${movies[i].userRating}  `;
                data += `<button type="button" class="e" id="edit${i}" data-index="${movies[i].id}"><i class="fas fa-pen"></i></button>`;
                data += `<button type="button" class="d" id="delete${i}" data-index="${movies[i].id}"><i class="fas fa-times-circle"></i></button>`;
                data += "</div>";
                data += '</li>';
            }
        }
        document.getElementById("movielist").innerHTML = data;

    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to GET");
    }
}

window.onload = function () { 
    renderCanvas();
};

function renderAddMovie(xhr) {
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        console.log(rtobj);
        renderCanvas();
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to GET");
    }
}

function renderEditMovie(xhr) {
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        console.log(rtobj);
        renderCanvas();
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to GET");
    }
}

function myCancel(){
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("rating").value = "";
    document.getElementById('moviedialog').close();
}

function mySave(){

    // Get data from user input
    var newtitle = document.getElementById("title").value;
    var newyear = document.getElementById("year").value;
    var newrating = document.getElementById("rating").value;
    var newgenre = document.getElementById("genre").value;
    var newuserrating = document.getElementById("userrating").value;
    var newimage = document.getElementById("image").value;

    // Add to database
    var xhradd = new XMLHttpRequest();
    var urladd = "http://introweb.tech/api/movies?access_token=" + access_token; 
    var payload = "title=" + newtitle + "&year=" + newyear + "&genre=" + newgenre + 
                  "&rating=" + newrating + "&userRating=" + newuserrating + "&image=" + newimage;
    
    console.log(payload);
    if(xhradd) {
        xhradd.open("POST", urladd, true); 
        xhradd.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhradd.onreadystatechange = function(){renderAddMovie(xhradd);}; 
        xhradd.send(payload);
    }

    // Close Dialog
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("rating").value = "";
    document.getElementById('moviedialog').close();
}

function myEdit(){
    var edittitle = document.getElementById("etitle").value;
    var edityear = document.getElementById("eyear").value;
    var editrating = document.getElementById("erating").value;
    var editgenre = document.getElementById("egenre").value;
    var edituserrating = document.getElementById("euserrating").value;
    var editimage = document.getElementById("eimage").value;

    var xhredit = new XMLHttpRequest();
    var urledit = `http://introweb.tech/api/movies/${editId}/replace?access_token=${access_token}`; 
    var payload = "title=" + edittitle + "&year=" + edityear + "&genre=" + editgenre + 
                  "&rating=" + editrating + "&userRating=" + edituserrating + "&image=" + editimage;
    
    console.log(payload);
    if(xhredit) {
        xhredit.open("POST", urledit, true); 
        xhredit.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
        xhredit.onreadystatechange = function(){renderEditMovie(xhredit);}; 
        xhredit.send(payload);
    }

    document.getElementById("editdialog").close();

}

function populateEditData(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        
        document.getElementById("etitle").value = rtobj.title;
        document.getElementById("eyear").value = rtobj.year;
        document.getElementById("erating").value = rtobj.rating;
        document.getElementById("egenre").value = rtobj.genre;
        document.getElementById("euserrating").value = rtobj.userRating;
        document.getElementById("eimage").value = rtobj.image;
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to GET");
    }
}

function renderDeleteMovie(xhr){
    if (xhr.readyState == 4 && xhr.status == 200){
        var rtobj = JSON.parse(xhr.responseText);
        console.log(rtobj);
        renderCanvas();
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        console.log("Fail to DELETE");
    }
}

function myDelete(){
    var xhrdelete = new XMLHttpRequest();
    var urldelete = `http://introweb.tech/api/movies/${deleteId}/?access_token=${access_token}`; 
    if(xhrdelete) {
        xhrdelete.open("DELETE", urldelete, true); 
        xhrdelete.onreadystatechange = function(){renderDeleteMovie(xhrdelete);}; 
        xhrdelete.send(null);
    }

    document.getElementById("deldialog").close();
}

function addNewListener(event){
    if(event.target.parentNode.className == "e"){
        var dl = document.getElementById('editdialog');
        editId = event.target.parentNode.dataset.index;
        
        var xhr = new XMLHttpRequest();
        var url = `http://introweb.tech/api/movies/${editId}/?access_token=${access_token}`; 
        if (xhr) {
            xhr.open("GET", url, true); 
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
            xhr.onreadystatechange = function(){populateEditData(xhr);}; 
            xhr.send(null);
        }

        dl.show();
    }

    if(event.target.parentNode.className == "d"){
        var dl = document.getElementById("deldialog");
        deleteId = event.target.parentNode.dataset.index;
        console.log(deleteId);
        dl.show();
    }
}

function logoutGoBack(xhr){
    if (xhr.readyState == 4 && xhr.status == 204){
        alert("Successfully Logout");
        window.open("./index.html", "_self");
    }
    else if (xhr.readyState == 4 && xhr.status == 401){
        alert("You already logout, please login again.");
        console.log("Fail to LOGOUT");
        window.open("./index.html", "_self");
    }
}

function myLogout(){
    var xhr = new XMLHttpRequest();
    var url = `http://introweb.tech/api/Users/logout?access_token=${access_token}`; 
    if (xhr) {
        xhr.open("POST", url, true); 
        xhr.onreadystatechange = function(){
            logoutGoBack(xhr);
        }; 
        xhr.send(null);
    }
}

//Add Event Listener
document.getElementById("addbutton").addEventListener("click", 
                                                      () => document.getElementById('moviedialog').show());
document.getElementById("savebutton").addEventListener("click", mySave);
document.getElementById("cancelbutton").addEventListener("click", myCancel);
document.getElementById("movielist").addEventListener("click", addNewListener);
document.getElementById("ecancelbutton").addEventListener("click", 
                                                          () => document.getElementById("editdialog").close());
document.getElementById("esavebutton").addEventListener("click", myEdit);
document.getElementById("deletecancelbutton").addEventListener("click", () => {
    document.getElementById("deldialog").close();
});
document.getElementById("deleteokbutton").addEventListener("click", myDelete);

document.getElementById("logoutbutton").addEventListener("click", myLogout);