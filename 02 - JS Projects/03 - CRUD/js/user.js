let movies = [];

//////checking localstorage and passing data to movies array/////
if (localStorage.getItem('movies')!==null) {
  allMovies = JSON.parse(localStorage.getItem('movies'));
  movies = allMovies.filter((movie)=>{
    return movie.blocked===false;
  })
}

////generating cards for user page//////
movies.forEach((movie, index) => {

  let card = document.createElement('div');
  card.classList.add('card');

    let imgContainer = document.createElement('div');
    imgContainer.classList.add('img_container');
      let img = document.createElement('img');
      img.setAttribute('src', movie.image)
    imgContainer.appendChild(img);

    let content = document.createElement('div');
    content.classList.add('content')
      let title = document.createElement('h2');
      title.append(movie.title);
      let infoContainer = document.createElement('div');
      infoContainer.classList.add('info_container');

        let rateUs = document.createElement('div');
        rateUs.classList.add('rate_us');

          let rateBtn = document.createElement('button');
          rateBtn.classList.add('rate_btn');
          rateBtn.append('Rate Us Now');
          rateBtn.onclick = clickModal.bind(this, movie.id)

        rateUs.appendChild(rateBtn);

        let starDisplay = document.createElement('div');
        starDisplay.classList.add('star_display');
          
          let rating = document.createElement('div');
          rating.classList.add('rating')

            let ratingContainer = document.createElement('div');
            ratingContainer.classList.add('rating_container');
  
              let span = document.createElement('span');
                span.classList.add('i_container')
              
                for (let i = 0; i < 5; i++) {
                  let iconW = document.createElement('i');
                      iconW.classList.add('fa-solid');
                      iconW.classList.add('fa-star');
                      span.appendChild(iconW);
                };

              let spanHidden = document.createElement('span');
                  spanHidden.classList.add('i_container');
                  spanHidden.classList.add('y_container');
                
                  for (let i = 0; i < 5; i++) {
                    let iconY = document.createElement('i');
                        iconY.classList.add('fa-solid');
                        iconY.classList.add('fa-star');
                        iconY.setAttribute('data-val', i+1);
                        spanHidden.appendChild(iconY);
                  };
              
            ratingContainer.append(span, spanHidden);
          
            let h3 = document.createElement('h3');
            let avgRating = calcAvg(movie.ratings)
            if (movie.ratings.length!==0) {
              h3.append(`( ${avgRating} )`);
              spanHidden.style.width=avgRating*20+"%";
            } else {
              h3.append('( 0.0 )')
            }

          rating.append(ratingContainer, h3);

          let btnContainer = document.createElement('div');
          btnContainer.classList.add('btn_container');
      
            let btn = document.createElement('button');
            btn.classList.add('btn');
            btn.append('Details');
            btn.onclick = openPop.bind(this, movie.id);
          
          btnContainer.appendChild(btn);
        starDisplay.append(rating, btnContainer);
      
      infoContainer.append(rateUs, starDisplay);
        


    content.append(title, infoContainer);

  card.append(imgContainer, content);

  document.querySelector('.all_movies').append(card);
});

////////modal for details info of movie////////
function openPop(movieId){
  document.getElementById('overlay-view').style.margin = 0 +'vh'; 
  document.querySelector('.img_container').style.display = 'block';
  movies.map((movie, index)=>{
     if (movie.id===movieId) {
      document.getElementById('image').src = movie.image;
      document.getElementById('movie_name').innerText = movie.title;
      document.getElementById('rating').innerText = movie.imdbRating;
      document.getElementById('year').innerText = movie.year;
      document.getElementById('duration').innerText = movie.duration;
      document.getElementById('genres').innerText = movie.genres;
      document.getElementById('actors').innerText = movie.actors;
      document.getElementById('story').innerText = movie.story;
     };
     
  });
};

/////////functionality for closing modal/////////
function xClose(modal) {
  document.getElementById(modal).style.marginTop= '-100vh';
}

///fetching rateus modal//////
const rateModal = document.querySelector('dialog');

/////functionality to open rateus modal////////
let movie = {};
function clickModal(id){
  movie = movies.find((movie,index)=>{
    return id===movie.id
  })
  clearRate();
  rateModal.showModal(); 
}

////functionality for closing rateus modal/////
function rateModalClose(){
  rateModal.close();
}

//////fetching the rating stars/////////
let stars = document.querySelectorAll('.container>i');
let submitRating = document.querySelector('.submit_btn');
let star;

  
function onClick(event){
  clearRate();

  star = event.target.getAttribute('data-val');
  submitRating.disabled=false;
  console.log(star);
 
  for(let i=0;i<star;i++){
    stars[i].style.color="gold";
  }

}

function submit(){
  console.log('disabled')
  submitRating.disabled=true;
  movie.ratings.push(Number(star));
  localStorage.setItem('movies',JSON.stringify(movies));
  rateModalClose();
  window.location.reload();
}

function clearRate(){
  stars.forEach(star=>{
    star.style.color = '#e6dddd';
  })
}

function calcAvg(arr){

  let sum=0;
  arr.forEach((num,index)=>{
      sum+=num;
  })

  return (sum/arr.length).toFixed(1);
}

/////functionality to close modal when clicked outside ////////
let overlay = document.querySelector('.overlay');

overlay.addEventListener('click', (e)=>{
  if (e.target.id!=='overlay-view') {
    return;
  }
  else{
    xClose(e.target.id)
  }
});




// if(localStorage.getItem("movies")!==null)
// {
//   let alldata=JSON.parse(localStorage.getItem("movies"));
//   movies=alldata.filter((movie,index)=>{
//       return movie.blocked===false;
//   })
// }
// else {
//   localStorage.setItem("movies",JSON.stringify(movies));
// }
