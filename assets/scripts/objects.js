///////////////////////////////////////////////////////////
//CONSTANTS
///////////////////////////////////////////////////////////
const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const movies = [];

///////////////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////////////
const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');
  if (movies.length === 0) {
    movieList.classList.remove('visible');
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => {
      return (movie.info.title.includes(filter))
      });

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement('li');
    // Check if the key is exist in the object
    // if ('info' in movie) {
      
    // }
    // if (!(movie.info === undefined))

    const { info, ...otherProps } = movie;
    console.log(otherProps);
    // const { title: movieTitle } = info;
    let { getFormattedTitle } = movie;

    // bind() id useful when you want to reconfigure a function for the future execution
    // getFormattedTitle = getFormattedTitle.bind(movie); 
    let text = getFormattedTitle.call(movie) + ' - ';// This will now refer to the window object which
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        text = text + `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

///////////////////////////////////////////////////////////
//HANDLERS
///////////////////////////////////////////////////////////
const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    // title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: {
      // title,
      // this will be accessed like a body
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
    // getFormattedTitle: function () {
    //   return this.info.title.toUpperCase();
    // }
    getFormattedTitle() {
      //this inside a function always refer to what calls this function[always refers to the thing in front of my function execution like (movie.getFormattedTitle())]
      return this.info.title.toUpperCase();
    }
  };

  newMovie.info.title = title;
  console.log(newMovie.info.title)

  movies.push(newMovie);
  renderMovies();
};

// console.log(movies)
const searchMovieHandler = () => {
  //To make this really clear: The browser binds "this" for you (on event listener) to the DOM element that triggered the event [only if you're not using the arrow function]
  console.log(this);
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

///////////////////////////////////////////////////////////
//ADDEVENTLISTENER
///////////////////////////////////////////////////////////
addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMovieHandler);

// every function created with the function keyword or with this method shortcut here[getFormattedTitle(){ return this.info.title.toUpperCase()}] has it's own this binding.

//arrow function don't bind this to anything


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Notes 👀
// when we assign a property to a null we actually say that the variable has his property but it's not assign yet,
//but when we use undefined this means that this property is never there

// const userChosenKeyName = 'level'

// const person = {
//   name: 'max',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   [userChosenKeyName]: '...',
//   greet: function () {
//     alert('Hi there!');
//   },
//   1.5: 'hello'
// };

// ...

// console.log(person.isAdmin);// undefined
// delete person.age;

// person.age = undefined; // It will work it will do the track but it's not clean

// const keyName = 'first name'
// person.isAdmin = true;
// console.log(person[keyName])
// console.log(person[1.5])

// person.greet();

// const person = {
//   username: 'Max'
// };
// console.log(person)
