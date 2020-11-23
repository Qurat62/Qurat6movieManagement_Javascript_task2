
	window.onload=function(e){
        try {
           e.preventDefault();
            var url_string=(window.location.href);
            var url=new URL(url_string);
            var id=url.searchParams.get("id");
            
            const movies=getMovies();
            console.log(movies);
            for (const key of Object.keys(movies)) {
             if(movies[key].id===id){
               /// saveBtnDisplay();
               // document.getElementById("updBtn").style.visibility = "visible";
                document.querySelector('#movie-id').disabled=true;
                document.querySelector('#movie-id').value=movies[key].id;
                document.querySelector('#movie-title').value=movies[key].title;
                document.querySelector('#movie-releaseDate').value=movies[key].release_date;
                document.querySelector('#movie-producer').value=movies[key].producer;
                document.querySelector('#movie-director').value=movies[key].director;
                document.querySelector('#movie-description').value=movies[key].description;
               document.getElementById('updBtn').onclick=updateOldMovie;
               
            }
            else{
            
                document.getElementById('saveBtn').onclick=saveNewMovie;
               
            }
        }   
        } catch (error)
        {
            console.log("issues with parsing url " + error);
        }
    }
/*****************update old record************************* */
    function updateOldMovie()
    {
        debugger;
    
    const id=document.querySelector('#movie-id').value;
    const title=document.querySelector('#movie-title').value;
    const release_date=document.querySelector('#movie-releaseDate').value;
    const director=document.querySelector('#movie-director').value;
    const producer=document.querySelector('#movie-producer').value;
    const description=document.querySelector('#movie-description').value;

    const movie=new Movie(id,title,release_date,director,producer,description);
        
    if(movie.id==="" || movie.title==="" || movie.release_date===" ")
    {
      alert("Movie id, title and release date fields are compulsary to add");
    }
    else
    {
      const movies=getMovies();
      for (const key of Object.keys(movies)) {  
       if(movies[key].id===movie.id){
        localStorage.setItem('movies', JSON.stringify(movie)); 
         alert("Movie updated successfully");

        window.location.href = "Home.html";
       }
    }
}

    }

/*****************save new record************************* */
function saveNewMovie()
{
    debugger;
    const id=document.querySelector('#movie-id').value;
    const title=document.querySelector('#movie-title').value;
    const release_date=document.querySelector('#movie-releaseDate').value;
    const director=document.querySelector('#movie-director').value;
    const producer=document.querySelector('#movie-producer').value;
    const description=document.querySelector('#movie-description').value;
    const movie=new Movie(id,title,release_date,director,producer,description);
        
    if(movie.id==="" || movie.title==="" || movie.release_date===" ")
    {
      alert("Movie id, title and release date fields are compulsary to add");
    }
    else
    {
        const movies=getMovies();
        movies.push(movie);        
        localStorage.setItem('movies',JSON.stringify(movies));
        //show successs msg
        alert("Movie saved successfully");  
        //   //clear Fields
        document.querySelector("#movie-Form").reset();   

    }

}


function updateBtnDisplay() {
    document.getElementById("updBtn").style.visibility = "hidden";
  }
  
//   function saveBtnDisplay() {
//     document.getElementById("saveBtn").style.visibility = "hidden";
//   } 