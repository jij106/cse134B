if(localStorage.hasOwnProperty('movies') == true){
    var movies = JSON.parse(localStorage.getItem("movies"));
    var years = JSON.parse(localStorage.getItem("years"));
    var ratings = JSON.parse(localStorage.getItem("ratings"));
    var counts = JSON.parse(localStorage.getItem("counts"));
}
else{
    var movies = ["Star Wars", "The Empire Strikes Back"];
    var years = [1977, 1980];
    var ratings = ["PG", "PG"];
    var counts = 2;
}
var currentEdit = -1;
var currentEditElement;

var data="";
for(i = 0; i < counts; i++){
    if(movies[i] != false) {
        data += `<li id="l${i}">`;
        data += `${movies[i]} (${years[i]}) - Rated: ${ratings[i]}  `;
        data += `<button type="button" class="e" id="edit${i}" data-index="${i}"><i class="fas fa-pen"></i></button>`;
        data += `<button type="button" class="d" id="delete${i}" data-index="${i}"><i class="fas fa-times-circle"></i></button>`;
        data += '</li>';
    }
}
document.getElementById("movielist").innerHTML = data;

function storeDataLocal(){
    localStorage.clear();
    localStorage.setItem("movies", JSON.stringify(movies));
    localStorage.setItem("years", JSON.stringify(years));
    localStorage.setItem("ratings", JSON.stringify(ratings));
    localStorage.setItem("counts", JSON.stringify(counts));
}

function deleteData(t){
    p = t.parentNode.parentNode.parentNode;
    p.removeChild(t.parentNode.parentNode);
    movies[t.parentNode.dataset.index] = false;

    if(p.childNodes.length == 0){
        var nomv = document.createTextNode("No movies currently listed");
        p.appendChild(nomv);
    }

    storeDataLocal();
    document.getElementById("deldialog").close();
}

function addNewListener(event){
    if(event.target.parentNode.className == "e"){
        var dl = document.getElementById('editdialog');
        var m = event.target.parentNode.dataset.index;
        currentEdit = m;
        currentEditElement = event.target.parentNode.parentNode;
        document.getElementById("etitle").value = movies[m];
        document.getElementById("eyear").value = years[m];
        document.getElementById("erating").value = ratings[m];
        dl.show();
    }

    if(event.target.parentNode.className == "d"){
        document.getElementById("deldialog").show();

        var old_element = document.getElementById("deleteokbutton");
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);

        document.getElementById("deletecancelbutton").addEventListener("click", () => {
            document.getElementById("deldialog").close();
        });
        document.getElementById("deleteokbutton").addEventListener("click", () => {
            deleteData(event.target);
        });
    }
}

function myEdit(){
    var edittitle = document.getElementById("etitle").value;
    var edityear = document.getElementById("eyear").value;
    var editrating = document.getElementById("erating").value;

    var editdata = document.createTextNode(`${edittitle} (${edityear}) - Rated: ${editrating}  `);
    currentEditElement.replaceChild(editdata, currentEditElement.childNodes[0]);

    movies[currentEdit] = edittitle;
    years[currentEdit] = edityear;
    ratings[currentEdit] = editrating;

    storeDataLocal();
    document.getElementById("editdialog").close();
}

function mySave(){

    if(document.getElementById("movielist").firstChild.nodeType == 3){
        document.getElementById("movielist").removeChild(document.getElementById("movielist").firstChild);
    }

    var newdata = "";
    var newtitle = document.getElementById("title").value;
    var newyear = document.getElementById("year").value;
    var newrating = document.getElementById("rating").value;
    newdata += `<li id="l${counts}">`;
    newdata += `${newtitle} (${newyear}) - Rated: ${newrating}  `;
    newdata += `<button type="button" class="e" id="edit${counts}" data-index="${counts}"><i class="fas fa-pen"></i></button>`;
    newdata += `<button type="button" class="d" id="delete${counts}" data-index="${counts}"><i class="fas fa-times-circle d"></i></button>`;
    newdata += '</li>';
    document.getElementById("movielist").innerHTML += newdata;
    movies.push(newtitle);
    years.push(newyear);
    ratings.push(newrating);
    counts += 1;
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("rating").value = "";
    document.getElementById('moviedialog').close();

    storeDataLocal();
}

function myCancel(){
    document.getElementById("title").value = "";
    document.getElementById("year").value = "";
    document.getElementById("rating").value = "";
    document.getElementById('moviedialog').close();
}

//Eventlisteners
document.getElementById("addbutton").addEventListener("click", 
                                                      () => document.getElementById('moviedialog').show());
document.getElementById("savebutton").addEventListener("click", mySave);
document.getElementById("cancelbutton").addEventListener("click", myCancel);
document.getElementById("movielist").addEventListener("click", addNewListener);

document.getElementById("ecancelbutton").addEventListener("click", 
                                                          () => document.getElementById("editdialog").close());
document.getElementById("esavebutton").addEventListener("click", myEdit);

document.getElementById("clsbutton").addEventListener("click", () => localStorage.clear());

