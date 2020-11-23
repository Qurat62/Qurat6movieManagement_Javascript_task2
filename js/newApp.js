
window.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});



// call service : Handle Api

/********************************************************* */

// api url 
const api_url = "https://ghibliapi.herokuapp.com/films"; 
// Defining async function 
//use try catch, if response is null throw error box

function fetchDataFromApi() {
  debugger;
  // var returnObjName= JSON.parse(localStorage.getItem('movies'));
  // if(returnObjName && Object.keys(returnObjName).length > 0){
  //  const display=displayMovie();
  // }else{
    fetch(api_url)
    .then(async (response) => {
      // Storing data in form of JSON 
      const data = await response.json();
      if (data!=null)
        {      
          saveMovieDataFromApi(data); 
        }
      else
      { 
        alert(" Ooops! Link down :( , Cant fetch the data");
      }
    }).catch((err) => {
       console.log(err);
    });
  }
//}
 

// Movie class: Represent a movie
class Movie{

    //the role of the constructor is to initialize the variables/values.it is the "initialization function".
    //It  eliminates placing the default values.
  constructor(id,title,release_date,producer,director,description)
  {
      this.id=id;
      this.title=title;
      this.release_date=release_date;
      this.producer=producer;
      this.director=director;
      this.description=description;
  }
  
  
  }

 
/*************************************************************** */
 const  getMovies=()=>
{
  let movies;
  if(localStorage.getItem('movies') === null)
  {movies = [];
  }else{
    
    movies=JSON.parse(localStorage.getItem('movies'));
  }
return movies;
}


/******************************************************************** */
function saveMovieDataFromApi(data) {

  localStorage.setItem('movies', JSON.stringify(data));
      
}

function deleteMovie(movie_Id)
{
  

  try {
    const movies=getMovies();
    movies.forEach((movie, index) => {
      if(movie.id===movie_Id){
        movies.splice(index,1);
      }
    });
   localStorage.setItem('movies',JSON.stringify(movies));
   alert("Delete Successfully");
   location.reload();
  } 
  catch (error) {
    throw error;
  }


}

function editMovie(movie_Id)
{
  
  try {
   
    window.location.href = "AddEdit.html?id=" + movie_Id; 
  } 
  catch (error) {
    throw error;
  }

}
function detailOfMovie(movie_Id)
{
  
  try {
    
    window.location.href = "Detail.html?id=" + movie_Id; 
  } 
  catch (error) {
    throw error;
  }

}

function displayMovie()
{
  debugger;
const movies=getMovies();
movies.forEach((movie) => addMovieToList(movie));
}
const  addMovieToList=(movie)=>
{

  const list=document.querySelector("#moviesList");  
  const row=document.createElement('tr');
  row.innerHTML=`
   <td data-column="ID" style="display:none">${movie.id}</td>
  <td data-column="Title" class="actions">${movie.title}</td>
  <td data-column="Release Date">${movie.release_date}</td>
  <td data-column="Actions">
  <div class="actions">

<button class="productButtonStyle button-color-blue" href="AddEdit.html" onclick="editMovie('${movie.id}')"><i class="fa fa-edit edit" style="font-size:15px;color:white" > Edit</i></button>

<button class="productButtonStyle button-color-red" onclick="deleteMovie('${movie.id}')"><i class="fa fa-trash delete" style="font-size:15px;color:white"> Delete</i></button> 
<button class="button-color-purple productButtonStyle" href="Detail.html" onclick=detailOfMovie('${movie.id}')><i class="fa fa-plus-circle detail" style="font-size:15px;color:white"> Detail</i></button>
  </div>`;

  list.appendChild(row);
}
//as soon as the DOM loads call UI
// Event: Display a movie
document.addEventListener('DOMContentLoaded', displayMovie);

//  /************************************************************** */

