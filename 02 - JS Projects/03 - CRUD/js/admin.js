const addModal = document.getElementById('overlay-add');
const editModal = document.getElementById('overlay-edit');
let movies = [];


/////checking localStorage for Any Data and if not then creating one/////////
if (localStorage.getItem('movies')!==null) {
    movies = JSON.parse(localStorage.getItem('movies'));
}
else{
    localStorage.setItem('movies', JSON.stringify(movies));
}

////////////function to create element dynamically/////////
function createEle(ele) {
    return document.createElement(ele);
};


///////pagination variable and declarations///////
let pagination;
let serial;
let currentPage=1;
const pagesLink = document.querySelector('.page-number-link');

/////code for knowing total page and displaying it//////
let totalPages = Math.ceil((movies.length)/10);
const pagesDisplay = document.querySelector('.total-pages>strong');
pagesDisplay.append(`${currentPage} of ${totalPages}`);


/////functionality to display pagination////////
function pageToDisplay(i){
    serial = (i-1)*10;
    pagination = movies.slice((i-1)*10, i*10);
}
pageToDisplay(currentPage);



let activeLink;
/////code for creating pagesLink/////
function generatePageLink() {
  pagesLink.innerHTML='';
    for(let i=1; i<=totalPages; i++){
        let page = createEle('small');
        page.append(i);
        page.onclick = link.bind(this, i)
        pagesLink.append(page);
    } ;
    activeLink= document.querySelectorAll('small');
};

generatePageLink();


/////function for highlightening link////////
function hightlightLink(go){
    activeLink.forEach((link)=>{
        link.classList.remove('active');
    })
    activeLink[go-1].classList.add('active');
};

if(totalPages===1 || totalPages>=1){
  hightlightLink(currentPage);
};

///////page links///////
function link(go){
    document.querySelector('.go_to').reset();
    if(localStorage.getItem('movies')==='[]'){
      window.location.reload();
    }
    if (go!==''&& go>=1 && go<=totalPages) {
        toDisplay(go)
        pagesDisplay.innerText = `${go} of ${totalPages}`;
        currentPage=go;
        hightlightLink(go);
    }else{
        go=1;
        toDisplay(go);
        pagesDisplay.innerText = `${go} of ${totalPages}`;
        currentPage=go;
        hightlightLink(go);
    }
}


////////functionality for prev and next button//////////
function next(){
    if (currentPage<totalPages) {
        currentPage++;
        toDisplay(currentPage);
        pagesDisplay.innerText = `${currentPage} of ${totalPages}`;
        hightlightLink(currentPage);
    }   
}
function prev(){
    if (currentPage>1) {
        currentPage--;
        toDisplay(currentPage)
        pagesDisplay.innerText = `${currentPage} of ${totalPages}`;
        hightlightLink(currentPage)
    }   
}


//////generating movies html and displaying it/////////
function displayMovies(moviesData){
    document.querySelector('tbody').innerHTML= '';
      if (movies!=='') {
        moviesData.forEach((movie, index) => {
          let row = createEle('tr');
      
              let numbering = createEle('td');
              numbering.append(serial+1);
              serial++
      
              let name = createEle('td');
              name.append(movie.title);
      
              let releaseYear = createEle('td');
              releaseYear.append(movie.year);
      
              let duration = createEle('td');
              duration.append(movie.duration);
      
              let genres = createEle('td');
              genres.append(movie.genres);
              genres.classList.add('genres')
              // movie.genres.forEach((genre, index)=>{
              //     genres.append(genre + ',');
              // })
      
              let imdbRating = createEle('td');
              imdbRating.append(movie.imdbRating);
      
              let action = createEle('td');
              action.classList.add('action')
      
                let view = createEle('i');
                view.classList.add('fa-solid');
                view.classList.add('fa-eye');
                view.onclick = openPop.bind(this, movie.id);
    
                let edit = createEle('i');
                edit.classList.add('fa-solid');
                edit.classList.add('fa-pen-to-square');
                edit.onclick = editMovie.bind(this, movie.id);
    
                let trash = createEle('i');
                trash.classList.add('fa-solid');
                trash.classList.add('fa-trash');
                trash.onclick = trashMovie.bind(this, movie.id);

                if(movie.blocked===true){
                  let cirlce=document.createElement("span");
                  cirlce.classList.add("blocked");
                  action.appendChild(cirlce);
                }
      
              action.append(view, edit, trash);
      
          row.append(numbering, name, releaseYear, duration, genres, imdbRating, action);
        
        document.querySelector('tbody').appendChild(row);
      });
    }
}
displayMovies(pagination);

////////generating unique Id/////////
if (movies.length!== 0) {
    id = movies[movies.length-1].id;
} else {
    id = 0;
}

/////creating object and pushing it into movies///////
function saveUpdate(){
    movie = {};
    movie.ratings = [];
    movie.blocked = false;
    movie.id = id+1;
    movie.title = document.getElementById('add_title').value;
    movie.year = document.getElementById('add_year').value;
    movie.duration = document.getElementById('add_duration').value;
    movie.genres = document.getElementById('add_genres').value.split(",");
    movie.imdbRating = document.getElementById('add_imdb').value;
    movie.actors = document.getElementById('add_actors').value.split(",");
    movie.image = document.getElementById('add_image').value;
    movie.story = document.getElementById('add_story').value;
    movies.push(movie);
    localStorage.setItem('movies',JSON.stringify(movies));
    pageToDisplay(currentPage);
    pagesDisplay.innerText = `${totalPages} of ${totalPages}`;
    totalPages = Math.ceil((movies.length)/10);
    currentPage=totalPages;
    displayMovies(pagination);
    generatePageLink();
    hightlightLink(totalPages)
    pagesDisplay.innerText = `${currentPage} of ${totalPages}`;
    xClose('overlay-add');
    document.getElementById('create').reset();
    // hightlightLink(currentPage)
    toDisplay(totalPages);
    toastMsg(movie.title,'Added :)');
};


///for what to display//////
function toDisplay(page){
    pageToDisplay(page);
    displayMovies(pagination);
}


/////functionality for opening editmovie modal and show existing data///////
function editMovie(editId){
    editModal.style.marginTop= '0';
    toUpdate = movies.find(movie=> {return editId===movie.id})
    movie = toUpdate;

    document.getElementById('edit_title').value = toUpdate.title;
    document.getElementById('edit_year').value = toUpdate.year;
    document.getElementById('edit_duration').value = toUpdate.duration;
    document.getElementById('edit_genres').value = toUpdate.genres;
    document.getElementById('edit_imdb').value = toUpdate.imdbRating;
    document.getElementById('edit_actors').value = toUpdate.actors;
    document.getElementById('edit_image').value = toUpdate.image;
    document.getElementById('edit_story').value = toUpdate.story;
    if(toUpdate.blocked!==false){
      document.getElementById('blocked').checked = true;
    }
    else{
      document.getElementById('blocked').checked = false;
    }
    // document.getElementById('blocked').value = toUpdate.blocked;
    console.log(toUpdate)
}

//////fuctionality to update through edit modal////
function saveEdited(editedId){
  movie.title = document.getElementById('edit_title').value;
  movie.year = document.getElementById('edit_year').value;
  movie.duration = document.getElementById('edit_duration').value;
  movie.genres = document.getElementById('edit_genres').value.split(",");
  movie.imdbRating = document.getElementById('edit_imdb').value;
  movie.actors = document.getElementById('edit_actors').value.split(",");
  movie.image = document.getElementById('edit_image').value;
  movie.story = document.getElementById('edit_story').value;
  let blockedVAl = document.getElementById('blocked');
  if(blockedVAl!==false){
    movie.blocked = blockedVAl.checked;
  }
  localStorage.setItem('movies',JSON.stringify(movies));
  toDisplay(currentPage);
  xClose('overlay-edit');
  toastMsg(movie.title,'Updated :)');
}

/////functionality to delete movie/////////
function trashMovie(trashId){
  let trashIndex= movies.findIndex(movie=>trashId===movie.id);
  let movie = movies.find(movie=>trashId===movie.id);
  if(confirm('Are you sure you want to delete??')===true){
    movies.splice(trashIndex, 1);
    localStorage.setItem('movies',JSON.stringify(movies));
    totalPages = Math.ceil((movies.length)/10);
    // console.log(currentPage,totalPages)
    // currentPage=totalPages;
    // pagesLink.innerHTML='';
    // generatePageLink();
    // pagesDisplay.innerText = `${currentPage} of ${totalPages}`;
    // pageToDisplay(currentPage);
    // displayMovies(pagination);
    generatePageLink();
    link(currentPage);
    toastMsg(movie.title,'Deleted :(');
    // console.log(currentPage,totalPages)
    // displayMovies(pagination);
  }
   
}

/////functionality for opening addmovie modal///////
function addMovieModal(){
    addModal.style.marginTop= '0';
    document.getElementById('create').reset();   
}

//////functionality for closing Modal/////////
function xClose(modal) {
   document.getElementById(modal).style.marginTop= '-100vh';
}

////////for opening view modal////
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

////////dummy data for adding/////
function dummyData(){
    movies = [
        {
          id: "1",
          title: "Game Night",
          year: "2018",
          ratings: [],
          genres: ["Action", "Comedy", "Crime"],
          duration: "PT100M",
          releaseDate: "2018-02-28",
          story:
            "A group of friends who meet regularly for game nights find themselves trying to solve a murder mystery.",
          actors: ["Rachel McAdams", "Jesse Plemons", "Jason Bateman"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQxMDE5NDg0NV5BMl5BanBnXkFtZTgwNTA5MDE2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "2",
          title: "Area X: Annihilation",
          year: "2018",
          ratings: [],
          genres: ["Adventure", "Drama", "Fantasy"],
          duration: "",
          releaseDate: "2018-02-23",
          originalTitle: "Annihilation",
          story:
            "A biologist's husband disappears. She puts her name forward for an expedition into an environmental disaster zone, but does not find what she's expecting. The expedition team is made up of the biologist, an anthropologist, a psychologist, a surveyor, and a linguist.",
          actors: ["Tessa Thompson", "Jennifer Jason Leigh", "Natalie Portman"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk2Mjc2NzYxNl5BMl5BanBnXkFtZTgwMTA2OTA1NDM@._V1_SY500_CR0,0,320,500_AL_.jpg",
        },
        {
          id: "3",
          title: "Hannah",
          year: "2017",
          ratings: [],
          genres: ["Drama"],
          duration: "PT95M",
          releaseDate: "2018-01-24",
          story:
            "Intimate portrait of a woman drifting between reality and denial when she is left alone to grapple with the consequences of her husband's imprisonment.",
          actors: [
            "Charlotte Rampling",
            "Andr\u00e9 Wilms",
            "St\u00e9phanie Van Vyve",
          ],
          imdbRating: 6.5,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BNWJmMWIxMjQtZTk0Mi00YTE0LTkyNzAtYzQxYjcwYjE4ZDk2XkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_SY500_SX350_AL_.jpg",
        },
        {
          id: "4",
          title: "The Lodgers",
          year: "2017",
          ratings: [],
          genres: ["Drama", "Horror", "Romance"],
          duration: "PT92M",
          releaseDate: "2018-03-09",
          story:
            "1920, rural Ireland. Anglo Irish twins Rachel and Edward share a strange existence in their crumbling family estate. Each night, the property becomes the domain of a sinister presence (The Lodgers) which enforces three rules upon the twins: they must be in bed by midnight; they may not permit an outsider past the threshold; if one attempts to escape, the life of the other is placed in jeopardy. When troubled war veteran Sean returns to the nearby village, he is immediately drawn to the mysterious Rachel, who in turn begins to break the rules set out by The Lodgers. The consequences pull Rachel into a deadly confrontation with her brother - and with the curse that haunts them.",
          actors: ["Charlotte Vega", "David Bradley", "Moe Dunford"],
          imdbRating: 5.8,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BM2FhM2E1MTktMDYwZi00ODA1LWI0YTYtN2NjZjM3ODFjYmU5XkEyXkFqcGdeQXVyMjY1ODQ3NTA@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "5",
          title: "Beast of Burden",
          year: "2018",
          ratings: [],
          genres: ["Action", "Crime", "Drama"],
          duration: "",
          releaseDate: "2018-02",
          story:
            "Sean Haggerty only has an hour to deliver his illegal cargo. An hour to reassure a drug cartel, a hitman, and the DEA that nothing is wrong. An hour to make sure his wife survives. And he must do it all from the cockpit of his Cessna.",
          actors: ["Daniel Radcliffe", "Grace Gummer", "Pablo Schreiber"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEyNTM3MDQ2NV5BMl5BanBnXkFtZTgwMDI5Nzk1NDM@._V1_SY500_CR0,0,336,500_AL_.jpg",
        },
        {
          id: "6",
          title: "The Chamber",
          year: "2016",
          ratings: [],
          genres: ["Horror", "Thriller"],
          duration: "PT88M",
          releaseDate: "2017-03-10",
          story:
            "A claustrophobic survival thriller set beneath the Yellow Sea off the coast of North Korea where the pilot of a small submersible craft and a three man Special Ops team on a secret recovery mission become trapped underwater in a fight for survival.",
          actors: ["Johannes Kuhnke", "Charlotte Salt", "James McArdle"],
          imdbRating: 4.4,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BNTVlODgwMjgtZGUzMy00ZTY1LWIyMDEtYTI2Y2JlYzVjZTNkXkEyXkFqcGdeQXVyNTg0MDM1MzY@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "7",
          title: "Survivors Guide to Prison",
          year: "2018",
          ratings: [],
          genres: ["Documentary"],
          duration: "PT102M",
          releaseDate: "2018-02-23",
          story:
            "Following the stories of Bruce Lisker and Reggie Cole who spent year after ye,ar in prison for murders they didn't commit - audiences get a harrowing look at how barbaric the US justice system is. The film ultimately asks how we can survive the prison model at all, and looks at better solutions for conflict resolution, harm reduction, crime and more. Hosted by filmmaker Matthew Cooke and guest hosting representatives from the massive range of Americans joining forces to change this broken system.                Written by\nanonymous",
          actors: ["Susan Sarandon", "Patricia Arquette", "Danny Trejo"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BNzhmNmI5MDMtZDEyOC00ODkyLTkwODItODQzODAzY2QyZjVlXkEyXkFqcGdeQXVyMzQwMTY2Nzk@._V1_SY500_CR0,0,357,500_AL_.jpg",
        },
        {
          id: "8",
          title: "Red Sparrow",
          year: "2018",
          ratings: [],
          genres: ["Mystery", "Thriller"],
          duration: "PT139M",
          releaseDate: "2018-03-02",
          story:
            "A young Russian intelligence officer is assigned to seduce a first-tour CIA agent who handles the CIA's most sensitive penetration of Russian intelligence. The two young officers collide in a charged atmosphere of trade-craft, deception, and inevitably forbidden passion that threatens not just their lives but the lives of others as well.",
          actors: ["Jennifer Lawrence", "Joel Edgerton", "Charlotte Rampling"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTA3MDkxOTc4NDdeQTJeQWpwZ15BbWU4MDAxNzgyNTQz._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "9",
          title: "Death Wish",
          year: "2018",
          ratings: [],
          genres: ["Action", "Crime", "Drama"],
          duration: "PT108M",
          releaseDate: "2018-04-13",
          story:
            "Dr. Paul Kersey (Bruce Willis) is a surgeon who only sees the aftermath of his city's violence as it's rushed into his ER -until his wife (Elisabeth Shue) and college-age daughter (Camila Morrone) are viciously attacked in their suburban home. With the police overloaded with crimes, Paul, burning for revenge, hunts for his family's assailants to deliver justice. As the anonymous slayings of criminals grabs the media's attention, the city wonders if this deadly avenger is a guardian angel...or a grim reaper. Fury and fate collide in the intense action-thriller Death Wish.                Written by\nMGM",
          actors: ["Bruce Willis", "Vincent D'Onofrio", "Elisabeth Shue"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTkzNjU3MjE0MF5BMl5BanBnXkFtZTgwNTIyNDk0NDM@._V1_SY400_SX270_AL_.jpg",
        },
        {
          id: "10",
          title: "They Remain",
          year: "2018",
          ratings: [],
          genres: ["Thriller"],
          duration: "",
          releaseDate: "2018-01-28",
          story:
            "Two scientists who share a romantic history are tasked with investigating unnatural animal behaviour on the site of a Manson Family-style cult's compound.",
          actors: ["William Jackson Harper", "Rebecca Henderson"],
          imdbRating: 7.6,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjI0NTEzMTk1OV5BMl5BanBnXkFtZTgwNTMwNDY3NDM@._V1_SY500_CR0,0,349,500_AL_.jpg",
        },
        {
          id: "11",
          title: "Submission",
          year: "2017",
          ratings: [],
          genres: ["Drama"],
          duration: "",
          releaseDate: "2017-10-13",
          story:
            "A cynical college professor takes a keen interest in a talented young writing student.",
          actors: ["Stanley Tucci", "Addison Timlin", "Kyra Sedgwick"],
          imdbRating: 6.1,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQ4NDkwMzM4OF5BMl5BanBnXkFtZTgwNzE3MzI3NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "12",
          title: "Souvenir",
          year: "2016",
          ratings: [],
          genres: ["Drama", "Music", "Romance"],
          duration: "PT90M",
          releaseDate: "2017-05-19",
          story:
            "Because of the stupid life in a p\u00e2t\u00e9-factory, former singer Laura falls in love with a colleague, a much younger boy and boxer, and after a small performance, a reenactment of her singing character, she tries to reenter the national song contest.                Written by\nimperiumclassicum",
          actors: ["Isabelle Huppert", "K\u00e9vin Aza\u00efs", "Johan Leysen"],
          imdbRating: 6.1,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BZmJkZjVhNGUtOTg4MC00YzAwLTg4ZjEtZjAxYmVlNTlkOTgyXkEyXkFqcGdeQXVyNTQwMDA5NTg@._V1_SY500_CR0,0,333,500_AL_.jpg",
        },
        {
          id: "13",
          title: "Dance Academy: The Movie",
          year: "2017",
          ratings: [],
          genres: ["Drama"],
          duration: "PT101M",
          releaseDate: "2017-04-06",
          story:
            "This 2017 movie follows the original dance academy TV show and tracks where the characters are in their lives now.",
          actors: ["Alex Acosta", "Alicia Banit", "Chris Bartlett"],
          imdbRating: 7.0,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BYjg2MzMwYmYtNjkwMS00N2VmLWI2MDMtMDA2ZjZiMDBkZDk1L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNTg3ODAyOTY@._V1_SY500_SX400_AL_.jpg",
        },
        {
          id: "14",
          title: "Ett veck i tiden",
          year: "2018",
          ratings: [],
          genres: ["Adventure", "Family", "Fantasy"],
          duration: "",
          releaseDate: "2018-04-06",
          originalTitle: "A Wrinkle in Time",
          story:
            "Following the discovery of a new form of space travel as well as Meg's father's disappearance, she, her brother, and her friend must join three magical beings - Mrs. Whatsit, Mrs. Who, and Mrs. Which - to travel across the universe to rescue him from a terrible evil.",
          actors: ["Gugu Mbatha-Raw", "Reese Witherspoon", "Chris Pine"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjMxNjQ5MTI3MV5BMl5BanBnXkFtZTgwMjQ2MTAyNDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "15",
          title: "The Strangers: Prey at Night",
          year: "2018",
          ratings: [],
          genres: ["Horror"],
          duration: "",
          releaseDate: "2018-03-09",
          story:
            "A family's road trip takes a dangerous turn when they arrive at a secluded mobile home park to stay with some relatives and find it mysteriously deserted. Under the cover of darkness, three masked psychopaths pay them a visit to test the family's every limit as they struggle to survive.                Written by\nAviron Pictures",
          actors: ["Christina Hendricks", "Bailee Madison", "Martin Henderson"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1OTIwODgzMV5BMl5BanBnXkFtZTgwMzUyMDgzNDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "16",
          title: "The Hurricane Heist",
          year: "2018",
          ratings: [],
          genres: ["Action", "Thriller"],
          duration: "",
          releaseDate: "2018-03-23",
          story:
            "Thieves attempt a massive heist against the U.S. Treasury as a Category 5 hurricane approaches one of its Mint facilities.",
          actors: ["Toby Kebbell", "Maggie Grace", "Ryan Kwanten"],
          imdbRating: 6.8,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMzg3Y2MyNjgtMzk4ZS00OTU3LWEwZmMtN2Y0NTdlZjU0NGFiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "17",
          title: "Gringo",
          year: "2018",
          ratings: [],
          genres: ["Action", "Comedy", "Drama"],
          duration: "PT110M",
          releaseDate: "2018-03-09",
          story:
            "An exhilarating mix of dark comedy, white-knuckle action and dramatic intrigue, Gringo joyrides into Mexico, where mild-mannered businessman Harold Soyinka (David Oyelowo) finds himself at the mercy of his back-stabbing business colleagues back home, local drug lords and a morally conflicted black-ops mercenary. Crossing the line from law-abiding citizen to wanted criminal, Harold battles to survive his increasingly dangerous situation in ways that raise the question: Is he out of his depth - or two steps ahead?                Written by\nAmazon Studios",
          actors: ["David Oyelowo", "Charlize Theron", "Joel Edgerton"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAyMTk2MTQ3Ml5BMl5BanBnXkFtZTgwNDQ2ODE0NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "18",
          title: "Thoroughbreds",
          year: "2017",
          ratings: [],
          genres: ["Drama", "Thriller"],
          duration: "PT92M",
          releaseDate: "2018-03-09",
          story:
            "Two upper-class teenage girls in suburban Connecticut rekindle their unlikely friendship after years of growing apart. Together, they hatch a plan to solve both of their problems-no matter what the cost.",
          actors: ["Anya Taylor-Joy", "Olivia Cooke", "Paul Sparks"],
          imdbRating: 7.0,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4MzQ1NDY2OF5BMl5BanBnXkFtZTgwNjA4Nzc4MzI@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "19",
          title: "En sista semester",
          year: "2017",
          ratings: [],
          genres: ["Adventure", "Comedy", "Drama"],
          duration: "PT112M",
          releaseDate: "2018-03-16",
          originalTitle: "The Leisure Seeker",
          story:
            "A runaway couple go on an unforgettable journey in the faithful old RV they call The Leisure Seeker, traveling from Boston to The Ernest Hemingway Home in Key West. They recapture their passion for life and their love for each other on a road trip that provides revelation and surprise right up to the very end.",
          actors: ["Helen Mirren", "Donald Sutherland", "Janel Moloney"],
          imdbRating: 6.5,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg1NTg2MzcyNF5BMl5BanBnXkFtZTgwNjMwMDIzNDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "20",
          title: "Leaning Into the Wind: Andy Goldsworthy",
          year: "2017",
          ratings: [],
          genres: ["Documentary"],
          duration: "PT93M",
          releaseDate: "2017-12-14",
          story:
            "Sixteen years after the release of the ground-breaking film Rivers and Tides - Andy Goldsworthy Working with Time director Thomas Riedelsheimer has returned to work with the artist. Leaning into the Wind - Andy Goldsworthy follows Andy on his exploration of the layers of his world and the impact of the years on hims,elf and his art. As Goldsworthy introduces his own body into the work it becomes at the same time even more fragile and personal and also sterner and tougher, incorporating massive machinery and crews on his bigger projects. Riedelsheimer's exquisite film illuminates Goldsworthy's mind as it reveals his art.                Written by\nLeslie Hills",
          actors: ["Andy Goldsworthy", "Holly Goldsworthy"],
          imdbRating: 7.3,
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BYWRjMTZhN2ItZDE1MC00NWQyLThkZTUtMTRjMGZhODE0NTQxXkEyXkFqcGdeQXVyMjA1NzQwNjM@._V1_SY190_SX318_AL_.jpg",
        },
        {
          id: "21",
          title: "Tomb Raider",
          year: "2018",
          ratings: [],
          genres: ["Action", "Adventure"],
          duration: "",
          releaseDate: "2018-03-16",
          story:
            "Lara Croft is the fiercely independent daughter of an eccentric adventurer who vanished when she was scarcely a teen. Now a young woman of 21 without any real focus or purpose, Lara navigates the chaotic streets of trendy East London as a bike courier, barely making the rent, and takes college courses, rarely making it to class. Determined to forge her own path, she refuses to take the reins of her father's global empire just as staunchly as she rejects the idea that he's truly gone. Advised to face the facts and move forward after seven years without, him, even Lara can't understand what drives her to finally solve the puzzle of his mysterious death. Going explicitly against his final wishes, she leaves everything she knows behind in search of her dad's last-known destination: a fabled tomb on a mythical island that might be somewhere off the coast of Japan. But her mission will not be an easy one; just reaching the island will be extremely treacherous. Suddenly, the stakes couldn't ...                Written by\nWarner Bros. Pictures",
          actors: ["Alicia Vikander", "Hannah John-Kamen", "Walton Goggins"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BOTY4NDcyZGQtYmVlNy00ODgwLTljYTMtYzQ2OTE3NDhjODMwXkEyXkFqcGdeQXVyNzYzODM3Mzg@._V1_SY500_CR0,0,337,500_AL_.jpg",
        },
        {
          id: "22",
          title: "Entebbe",
          year: "2018",
          ratings: [],
          genres: ["Crime", "Drama", "Thriller"],
          duration: "PT106M",
          releaseDate: "2018-03-16",
          story:
            "In July 1976, an Air France flight from Tel-Aviv to Paris via Athens was hijacked and forced to land in Entebbe, Uganda. The Jewish passengers were separated and held hostage in demand to release many terrorists held in Israeli prisons. After much debate, the Israeli government sent an elite commando unit to raid the airfield and release the hostages.",
          actors: ["Daniel Br\u00fchl", "Rosamund Pike", "Eddie Marsan"],
          imdbRating: "",
          image:
            "https://images-na.ssl-images-amazon.com/images/M/MV5BMjAwNDMzNzg0Nl5BMl5BanBnXkFtZTgwOTkxNjY2NDM@._V1_SY500_CR0,0,337,500_AL_.jpg",
        }
    ]
    movies.forEach((movie)=>{
      movie =  movie.blocked = false;
    })
    localStorage.setItem('movies',JSON.stringify(movies));
    window.location.reload();
};


/////functionality to close modal when clicked outside ////////
let overlays = document.querySelectorAll('.overlay');

overlays.forEach(overlay => {
  overlay.addEventListener('click', (e)=>{ 
    if (e.target.id!==overlay.id) {
      return;
    }
    else{
      xClose(e.target.id)
    }
  });

});

//////funtionality to display toast msg//////
const toast = document.querySelector('.toast');
function toastMsg(msg, type) {
  toast.innerHTML =  `<span>Movie: <strong>"${msg}"</strong>has been sucessfully<strong>'${type}'</strong>!!!</span>`;
  toast.style.right = 0;
  setTimeout(() => {
    toast.style.right = -100 +'%';
  }, 3000);
}




















