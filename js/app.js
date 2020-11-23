
/********************************************************* */

// call service : Handle Api

/********************************************************* */


// api url 
const api_url = "https://ghibliapi.herokuapp.com/films"; 

// Defining async function 
//use try catch, if response is null throw error box
 async function getapi(url) { 
	
	// Storing response 
	const response = await fetch(url); 
	
	// Storing data in form of JSON 
  var data = await response.json();
  debugger; 
	console.log(data); 
  Store.addMovieApi(data);
	//UI.displayAPI_Movies(data); 
} 
// Calling that async function 
getapi(api_url); 

/******************************************************** */


/**************************Add Movies Modal*************************** */

/***************************************************** */
function openModal()
	{
		debugger;
			// Get the modal
	var modal = document.getElementById("myModal1");
	
	// Get the button that opens the modal
	  var btn = document.getElementById("myBtn");
	  modal.style.display = "block";
	// Get the <span> element that closes the modal
	  var span = document.getElementsByClassName("close")[0];
		// When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
	  modal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
		  modal.style.display = "none";
		}
	  }
	
  }
  /*********************************Detail Movie***************************** */
  function openModal2()
	{
		debugger;
			// Get the modal
	var modal = document.getElementById("myModal2");
	
	// Get the button that opens the modal
	  var btn = document.getElementById("detailBtn");
	  modal.style.display = "block";
	// Get the <span> element that closes the modal
	  var span = document.getElementsByClassName("close")[0];
		// When the user clicks on <span> (x), close the modal
	  span.onclick = function() {
	  modal.style.display = "none";
	}
	
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
		  modal.style.display = "none";
		}
	  }
	
	}
 
/*************************************************************************** */
// Movie class: Represent a movie
class Movie{
  debugger;
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



// UI class: Handle UI
class UI
{

//make all th emethods static
//Static method(s) are associated to the class in which they reside i.e.
//they can be called even without creating an instance of the class i.e ClassName. methodName(args). They are designed
//with aim to be shared among all Objects created from the same class. Static methods can not be overridden.


 static displayMovie()
  {
    
const movies=Store.getMovies();
movies.forEach((movie) => UI.addMovieToList(movie));
 }
static  addMovieToList(movie){
  
    const list=document.querySelector("#moviesList");  
    const row=document.createElement('tr');
    row.innerHTML=`
     <td data-column="ID">${movie.id}</td>
    <td data-column="Title">${movie.title}</td>
    <td data-column="Release Date">${movie.release_date}</td>
    <td data-column="Actions">
    <div id="actions">
  
  <button class="productButtonStyle button-color-blue edit"><i class="fa fa-edit edit" style="font-size:15px;color:white" > Edit</i></button>
  
  <button class="productButtonStyle button-color-red delete" ><i class="fa fa-trash delete" style="font-size:15px;color:white"> Delete</i></button> 
  <button class="button-color-purple productButtonStyle detail" id="detailBtn" onclick="openModal2()"><i class="fa fa-plus-circle detail" style="font-size:15px;color:white"> Detail</i></button>
	</div>`;

    list.appendChild(row);
  }


  static  deleteMovie(el)
  {
    
     if(el.classList.contains('delete'))
     {
        el.parentElement.parentElement.parentElement.parentElement.remove();

     }

  }


  static   clearFields()
  {
      //document.getElementById("myForm").reset();
      document.querySelector('#movie-id').value=" ";
      document.querySelector('#movie-title').value=" ";
      document.querySelector('#movie-releaseDate').value=" ";
      document.querySelector('#movie-producer').value=" ";
      document.querySelector('#movie-director').value=" ";
      document.querySelector('#movie-description').value=" ";
  }


  static closeModal()
  {
    var modal = document.getElementById("myModal");
    modal.style.display='none';

  }
 
}

// Store class: Handle a storage

class Store
{
  //make them static so can easily call them without instantiating  a class
  static getMovies()
  {
    let movies;
    if(localStorage.getItem('movies') === null)
    {movies = [];
    }else{
      
      movies=JSON.parse(localStorage.getItem('movies'));
    }
  return movies;
}
//saveMovieData
static addMovieApi(data)
{
  debugger;
const movies=Store.getMovies();

data.forEach(function(value){
    let obj = {};
    obj.id = value['id'],
    obj.title = value['title']
    obj.release_date=value['release_date']
    obj.producer=value['producer']
    obj.director=value['director']
  
    obj.description=value['description']
    movies.push(obj);
  localStorage.setItem('movies', JSON.stringify(movies)); 
  });
}


static addMovie(movie){
  
  const movies=Store.getMovies();
  movies.push(movie);
   
  localStorage.setItem('movies',JSON.stringify(movies));
}

  static removeMovie(id){
    
    const movies=Store.getMovies();

    movies.forEach((movie, index) => {
      if(movie.id===id){
        movies.splice(index,1);
      }
    });
   localStorage.setItem('movies',JSON.stringify(movies));

 }

 static editMovie(id){
   debugger;
   openModal();
 const updateMovies=Store.getMovies();
 for (const key of Object.keys(updateMovies)) {
  console.log(key, updateMovies[key]);
  
  //document.getElementById('movie-id').value=updateMovies[key].id;
  if(updateMovies[key].id===id){
  document.querySelector('#movie-id').value=updateMovies[key].id;
  document.querySelector('#movie-title').value=updateMovies[key].title;
  document.querySelector('#movie-releaseDate').value=updateMovies[key].release_date;
  document.querySelector('#movie-producer').value=updateMovies[key].producer;
  document.querySelector('#movie-director').value=updateMovies[key].director;
  document.querySelector('#movie-description').value=updateMovies[key].description;
  
}}

 }

 /******************************detail movie *******/
 static detMovie(id){
  debugger;
  //openModal();
const movies=Store.getMovies();
for (const key of Object.keys(movies)) {
 console.log(key, movies[key]);
 
 if(movies[key].id===id){
  const list=document.querySelector("#moviesDetailList");  
  const row=document.createElement('tr');
  row.innerHTML=`
   <td data-column="ID">${movies[key].id}</td>
  <td data-column="Title">${movies[key].title}</td>
  <td data-column="Release Date">${movies[key].release_date}</td>
  <td data-column="Producer">${movies[key].producer}</td>
  <td data-column="Director">${movies[key].director}</td>
  <td data-column="Description">${movies[key].description}</td>`;

  list.appendChild(row);
 
}

}

}




}
/********************************End store Class************************************* */
// Event: Display a movie
//as soon as the DOM loads call UI
document.addEventListener('DOMContentLoaded', UI.displayMovie);



// Event: Add a movie

document.querySelector("#movie-Form").addEventListener('submit', (e) =>
{

    debugger;
    e.preventDefault();

    //Get form values
    const id=document.querySelector('#movie-id').value;
    const title=document.querySelector('#movie-title').value;
    const release_date=document.querySelector('#movie-releaseDate').value;
    const director=document.querySelector('#movie-director').value;
    const producer=document.querySelector('#movie-producer').value;
    const description=document.querySelector('#movie-description').value;

//Validate


        //instansiate movie

        const movie=new Movie(id,title,release_date,director,producer,description);
        console.log(movie);
        if(movie.id==="" || movie.title==="" || movie.release_date===" ")
        {
          alert("Movie id, title and release date fields are compulsary to add");
        }
        else
        {

      //   //Add movie to UI
        UI.addMovieToList(movie);

      //   //Add movie to LocalStore
         Store.addMovie(movie);

      //   //show successs msg
      alert("Movie added successfully");
      //   //clear Fields
         UI.clearFields();

      // //close modal on saving data
         UI.closeModal();
    }
  }
  
);

//edit

// Event: Remove a movie
document.querySelector('#moviesList').addEventListener('click',(e) =>
{
  debugger;
if(e.target.classList.contains("delete"))
{
//remove movie from UI
UI.deleteMovie(e.target);
//remove movie from store
debugger;
//add null checks if e.target exit....
Store.removeMovie(e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
//if all movies delete then chekc
alert("Record successfully Deleted ");

console.log(e.target);
}
if(e.target.classList.contains("edit"))
{
  
  // edit movie list
 // UI.editMovie(e.target);
  //edit movie from store
  Store.editMovie(e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);

console.log(e.target);

}

if(e.target.classList.contains("detail"))
{
  
  // edit movie list
 // UI.editMovie(e.target);
  //edit movie from store
  Store.detMovie(e.target.parentElement.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
  

console.log(e.target);

}
});
