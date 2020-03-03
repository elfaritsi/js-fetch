const search = document.querySelector('#search-button');
let keyword =  document.querySelector('#user-search');
search.addEventListener('click', function(){
	fetch('http://www.omdbapi.com/?apikey=8dd7cc4a&s=' + keyword.value )
		.then(response => response.json())
		.then(response => {

			//error handling
			if(response.Response === "False"){
				let str = `<h1 class="justify-center">${response.Error}</h1>`;
				let dom = document.querySelector('#movie-list');
				dom.innerHTML= str;
				return;

			};
			//------------------------------------------------------------------
			let hasil = response.Search;
			let dom = document.querySelector('#movie-list');
			let result = '';

			hasil.forEach(m => {
				result += `				
		          <div class="card mb-4 mr-4 ml-3">
		            <img src="${m.Poster}" class="card-img-top" alt="...">
		              <div class="card-body">
		                <h5 class="card-title ">${m.Title}</h5>
		                 <p class="card-text text-muted">${m.Year}</p>
		                   <a href="#" class="btn btn-primary modal-detail" data-toggle="modal" data-target="#movieDetail" data-id="${m.imdbID}">See Details</a>
		              </div>
		          </div>
				`;

			dom.innerHTML = result;

			//Ketika Tombol See Details Di klik
			/*Kita tidak bisa langsung membuat event handler contoh details.addEventListener
			karena details berbentuk NodeList, jadi kita harus memecah NodeList nya terlebih
			dahulu*/

			let details = document.querySelectorAll('.modal-detail');
			
			details.forEach(button => {
				button.addEventListener('click', function() {
					let resultDetail = this.dataset.id;

					fetch ('http://www.omdbapi.com/?apikey=8dd7cc4a&i=' + resultDetail)
						.then(response => response.json())
						.then(detail => {
							let hasil = '';
							
							hasil += `
							<div class="container-fluid">
						        <div class="row">
						          <div class="col-md-4">
						            <img src="${detail.Poster}" class="img-fluid">
						          </div>
						          <div class="col-md-8">
						            <ul class="list-group">						            
						              <li class="list-group-item"><h4>${detail.Title} |  ${detail.Year}</h4></li>
						              <li class="list-group-item">Director : <b>${detail.Director}</b></li>
						              <li class="list-group-item">Actors : <b>${detail.Actors}</b></li>
						              <li class="list-group-item">Writer : <b>${detail.Writer}</b></li>
						              <li class="list-group-item">Plot : <b>${detail.Plot}</b></li>
						            </ul>
						          </div>
						        </div>
						      </div>`;
							
							let modal = document.querySelector('.modal-body');
							modal.innerHTML = hasil;
						})
				
			});
		});
	});
			
	});
});

