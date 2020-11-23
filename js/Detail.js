

	window.onload=function(){
        try {
            debugger;
            var url_string=(window.location.href);
            var url=new URL(url_string);
            var id=url.searchParams.get("id");
            const movies=getMovies();
            
            for (const key of Object.keys(movies)) {
             
             
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
            
        } catch (error)
        {
            console.log("issues with parsing url " + error);
        }


    }