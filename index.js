

let token='267160833795dd5ce93871d9ecec8abf'

let popularList=[] 

popular();

let popularDiv = document.getElementById("popularblock");
let active = document.getElementById("active");
let searchElement = document.getElementById("search");




searchElement.addEventListener( "search-button" , function(e) {
   let SEARCH_VALUE=document.getElementById("search").value ;
  let obj=  search(SEARCH_VALUE);
    while (popularDiv.firstChild) {
        popularDiv.removeChild(popularDiv.firstChild);
    }
    buildList(obj);
});

function searchBTN() {
    let SEARCH_VALUE=document.getElementById("search").value ;
    let obj = search(SEARCH_VALUE);
    while (popularDiv.firstChild) {
        popularDiv.removeChild(popularDiv.firstChild);
    }
    while (active.firstChild) {
        active.removeChild(active.firstChild);
    }
   // buildList(obj);

    popularDiv.style.display="block";
}


popularDiv.addEventListener( "click" , function(e) {
    popularDiv.style.display="none";
   let obj= getValues(popularList,e.target.id);
    let active_div = document.createElement('div');
    // active_div.id='active-'+obj.id;

    let poster = document.createElement('img');
    poster.setAttribute('src','https://image.tmdb.org/t/p/w185_and_h278_bestv2'+obj.backdrop_path);
    let title = document.createElement('h1');
    title.innerHTML=obj.title;

    let overview = document.createElement('div');
    overview.innerHTML=obj.overview;

    active_div.appendChild(poster);
    active_div.appendChild(title);
    active_div.appendChild(overview);
    active.appendChild(active_div);
});

function getValues(list, key) {
    //const arr = JSON.parse(list);
    //const current = arr.find(item => {return item.id === key});
    let objects ;
    for (let i in list) {
        if (list[i].id== key){
            return objects=list[i];
        }
    }
}

 function popular()
{
    let url='https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key='+token  

     fetch(url)
    .then(response => response.json())
    .then(data =>buildList(data.results))
    .catch(Error=>console.log(Error)); 
}

function search(value)
{
    if(value===''){
        popular()
    }
    else{
         let url= 'https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key='+token +'&query='+value 
    
         fetch(url)
        .then(response => response.json())
        .then(data =>buildList(data.results))
        .catch(Error=>console.log(Error)); 
     }     
}

function buildList(obj){

 popularList= [...obj];

    for (let i=0; i<obj.length;i++){

        let div = document.createElement('div');
        div.id=obj[i].id;
        div.innerHTML=obj[i].title;
        let a = document.createElement('a');
        a.setAttribute('href','#');

        a.appendChild(div);
        popularDiv.appendChild(a);
    }
}

