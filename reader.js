// setup firebase
let firebaseConfig = {
  apiKey: "AIzaSyCWK4mBf3fxOUMotvoMtFcfPu8VkTlvfbo",
  authDomain: "web-apps-296807.firebaseapp.com",
  databaseURL: "https://web-apps-296807.firebaseio.com",
  projectId: "web-apps-296807",
  storageBucket: "web-apps-296807.appspot.com",
  messagingSenderId: "222628155634",
  appId: "1:222628155634:web:e6baff800318532d4f006b",
  measurementId: "G-G2FB4E9XXW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// get db
const db = firebase.firestore();
let storageRef = firebase.storage().ref();
let provider = new firebase.auth.GoogleAuthProvider(); // google sign in

// save data into an array
let data = [];
let genreList = {};

db.collection("books")
  .get()
  .then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // book_info = {id: doc.id, ...doc.data()}
      data.push({ id: doc.id, ...doc.data() });
    });
    // add data to the DOM
    let listPlaceHolder = document.getElementById("books-container");
    let bookList = "";
    for (let i = 0; i < data.length; i++) {
      // create html doc
      let title = data[i].title;
      let author = data[i].author;
      let published = new Date(
        (data[i].published.seconds + data[i].published.nanoseconds) * 1000
      ).toLocaleDateString();
      let genre = data[i].genre;
      let added = new Date(
        (data[i].added.seconds + data[i].added.nanoseconds) * 1000
      ).toLocaleDateString();
      let rating = data[i].rating;
      let imgurl = data[i].imgurl;

      let ratingScore = "";
      for (let j = 0; j < rating; j++) {
        let val = j + 1;
        ratingScore += '<a class="stars-x" href="#">✭</a>';
      }
      bookList += '<li id="book-details">';
      bookList += '<img src= "'+ imgurl +'" width="100px" height="100px" style="float:left">';
      bookList += '<p id="title" >' + " " + title + "</p>";
      bookList += '<p id="author" >' + "Author : " + author + "</p>";
      bookList += '<p id="year" >' + "Published : " + published + "</p>";
      bookList += '<p id="genre" >' + "Genre : " + genre + "</p>";
      bookList += '<p id="added" >' + "Date Added : " + added + "</p>";
      bookList += '<p id ="rating">' + "Rating : " + ratingScore + "</p>";
      bookList += '<button id ="update-button"> Update </button>';
      bookList += '<button id ="delete-button"> Delete </button>';
      bookList += "</li>";
    }

    listPlaceHolder.innerHTML = bookList;

    // create genre summary
    for (let i = 0; i < data.length; i++) {
      if (data[i].genre in genreList) {
        // console.log("Updating: ", data[i].genre);
        genreList[data[i].genre] += 1;
      } else {
        // console.log("Adding: ",data[i].genre)
        genreList[data[i].genre] = 1;
      }
      // console.log(genreList);
    }

    // listPlaceHolder.innerHTML = bookList;
  })
  .catch(function (error) {
    console.log("Error getting documents ", error);
  });

// add updated timestamp
// let docRef = db.collection('books').doc(id);
// let updateTimeStamp = docRef.updated({
//     timestamp: firebase.firestore.FieldValue.serverTimestamp()
// })

// generate charts
let pieChart = document.getElementById("pieChart");
pieChart.height = 200;
pieChart.width = 200;
let ctx = pieChart.getContext("2d");

let progressChart = document.getElementById("progressChart");
progressChart.height = 200;
progressChart.width = 200;
let progressCtx = progressChart.getContext("2d");

// function to draw line
function drawLine(ctx, startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
}

// function to draw arc
function drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.stroke();
}

// function to draw pie slice
function drawPieSlice(
  ctx,
  centerX,
  centerY,
  radius,
  startAngle,
  endAngle,
  color
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.closePath();
  ctx.fill();
}

// define class to draw chart
const Piechart = function (options) {
  (this.options = options),
    (this.canvas = options.canvas),
    (this.ctx = this.canvas.getContext("2d"));
  this.colors = options.colors;

  this.draw = function () {
    let total_value = 0;
    let color_index = 0;
    for (let categ in this.options.data) {
      let val = this.options.data[categ];
      total_value += val;
    }
    let start_angle = 0;
    for (categ in this.options.data) {
      let val = this.options.data[categ];
      let slice_angle = (2 * Math.PI * val) / total_value;

      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        Math.min(this.canvas.width / 2, this.canvas.height / 2),
        start_angle,
        start_angle + slice_angle,
        this.colors[color_index % this.colors.length]
      );
      let pieRadius = Math.min(this.canvas.width / 2, this.canvas.height / 2);
      let labelX =
        this.canvas.width / 2 +
        (pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
      let labelY =
        this.canvas.height / 2 +
        (pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
      let offsetX = 15;
      let offsetY = 10;

      // reposition labels for doughnut shape
      if (this.options.doughnutHoleSize) {
        let offset = pieRadius * this.options.doughnutHoleSize;
        let labelX =
          this.canvas.width / 2 +
          (-offset + pieRadius / 2) * Math.cos(start_angle + slice_angle / 2);
        let labelY =
          this.canvas.height / 2 +
          (offset + pieRadius / 2) * Math.sin(start_angle + slice_angle / 2);
      }

      let labelText = Math.round((100 * val) / total_value);
      this.ctx.fillStyle = "white";
      this.ctx.font = "bold 16px sans-serif";
      if (labelText > 0) {
        this.ctx.fillText(labelText + "%", labelX - offsetX, labelY + offsetY);
      }
      start_angle += slice_angle;
      color_index++;
    }
    // create doughnut chart
    if (this.options.doughnutHoleSize) {
      drawPieSlice(
        this.ctx,
        this.canvas.width / 2,
        this.canvas.height / 2,
        this.options.doughnutHoleSize *
          Math.min(this.canvas.width / 2, this.canvas.height / 2),
        0,
        2 * Math.PI,
        "white"
      );
    }

    // add legend
    if (this.options.legend) {
      color_index = 0;
      let legendHTML = "";
      for (categ in this.options.data) {
        legendHTML +=
          "<div><span style='display:inline-block; width:20px; background-color:" +
          this.colors[color_index++] +
          ";'>&nbsp;</span> " +
          categ +
          "</div>";
      }
      this.options.legend.innerHTML = legendHTML;
    }
  };
};

// define legend
let myLegend = document.getElementById("myLegend");

// draw chart
myPiechart = new Piechart({
  canvas: pieChart,
  data: genreList,
  colors: ["#fde23e", "#f16e23", "#57d9ff", "#937e88"],
  legend: myLegend,
});
setTimeout(() => {
  myPiechart.draw();
}, 2000);

// get total books read
let TargetBooks = 30;
let totalBooks = 0;
let progressReport = {};

// create total books object
setTimeout(() => {
  for (let x in genreList) {
    let val = genreList[x];
    totalBooks += val;
  }
  progressReport["Pending"] = TargetBooks;
  progressReport["Read"] = totalBooks;
}, 2000);

// plot progress distribution
let progressLegend = document.getElementById("progressLegend");

myProgressChart = new Piechart({
  canvas: progressChart,
  data: progressReport,
  colors: ["lightgrey", "forestgreen"],
  legend: progressLegend,
  doughnutHoleSize: 0.3,
});
// plot progress chart
setTimeout(() => {
  myProgressChart.draw();
}, 2000);

let authResult = false;

// authentication
function googleSignIn() {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      console.log(token.length);
      if (token.length > 0) {
        authResult = true;
      }
      // console.log("token:", token);
      // console.log("user:", user)
      // ...
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

  return authResult;
}

// add data to the database
document
  .getElementById("new-books-form")
  .addEventListener("submit", submitForm);

// watch for sign in
document.getElementById("sign-in").addEventListener("click", signInWithGoogle);

function signInWithGoogle(e) {
  e.preventDefault();
  googleSignIn();
}

function submitForm(e) {
  e.preventDefault();
  let newTitle = getFormValue("new-title");
  let newAuthor = getFormValue("new-author");
  let newGenre = getFormValue("new-genre");
  let newPublished = new Date(getFormValue("new-published"));
  let newPages = getFormValue("new-pages");
  let newRating = getFormValue("new-rating");
  let newAdded = new Date(getFormValue("new-added"));
  let newPhoto = getFormValue("new-photo");
  let newPhotoName = newPhoto.split("\\")[2];
  let fileName = +new Date() + "-" + newPhotoName;
  let metadata = { contentType: "image/jpeg" };

  // save data
  if (authResult) {
    saveFormData(
      newTitle,
      newAuthor,
      newGenre,
      newPublished,
      newPages,
      newRating,
      newAdded,
      newPhotoName,
      fileName,
      metadata
    );
  } else {
    alert("Please login to proceed!");
  }
}

// function to get form values
function getFormValue(id) {
  return document.getElementById(id).value;
}

// function to save data

function saveFormData(
  title,
  author,
  genre,
  published,
  pages,
  rating,
  added,
  newPhotoName,
  fileName,
  metadata
) {
  let imgURL = "";
  if (newPhotoName != undefined) {
    // save image
    const imageRef = storageRef.child("images/" + newPhotoName);
    imageRef.put(fileName, metadata).then((snapshot) => {
      return imageRef.getDownloadURL().then((url) => {
        console.log("Image uploaded successfully!", url);

        // define book document to save
        let bookDetails = {
          title: title,
          author: author,
          genre: genre,
          published: published,
          pages: pages,
          rating: rating,
          added: added,
          imgurl: url,
        };
        //save document
        saveDocument(bookDetails);
      });
    });
  }
}

function saveDocument(doc) {
  if (doc.imgurl.length > 0) {
    // add data to the database
    db.collection("books")
      .add(doc)
      .then(function (docRef) {
        console.log("Document written with ID: " + docRef.id);
      })
      .catch(function (error) {
        console.log("Error adding document: " + error);
      });
  } else {
    console.log("Error uploading image!");
  }
}
// collapse new book form
var coll = document.getElementsByClassName("collapsedForm");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
