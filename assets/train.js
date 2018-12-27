var config = {
    apiKey: "AIzaSyA9muzQb3yIJWqY065dXPKQiyx7cht2X4s",
    authDomain: "train-scheduler-2-a5805.firebaseapp.com",
    databaseURL: "https://train-scheduler-2-a5805.firebaseio.com",
    projectId: "train-scheduler-2-a5805",
    storageBucket: "train-scheduler-2-a5805.appspot.com",
    messagingSenderId: "116312763999"
  };

  firebase.initializeApp(config);
  $(document).ready(function () {

  var database = firebase.database();
  

  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var firstTrain = $("#first-train-time-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  

  var newTrain = {
    name: trainName,
    destination: trainDest,
    firstTrain: trainFirst,
    frequency: trainFreq
  };
  //upload train data to database
  database.ref().push(newTrain);

  //log to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  //lets user know train was added
  alert("Train added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
  });
// Create Firebase event
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

   // Train Info
   console.log(trainName);
   console.log(trainDest);
   console.log(trainFirst);
   console.log(trainFreq);

    // Time calculations
     var firstTimeConverted = moment(trainFirst, "hh:mm A");
     var currentTime = moment();
     console.log("Current time: " + moment(currentTime).format("hh:mm A"));
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     var tRemainder = diffTime % trainFreq;
     var tMinutes = trainFreq - tRemainder;
     var nextTrain = moment().add(tMinutes, "minutes");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

     //add html for the entries
     $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
      trainFreq + "</td><td>" + nextTrain.format("hh:mm A") + "</td><td>" + tMinutes +"</td></tr>");

			  });
  
    

   // var trainNext = moment().diff(moment(trainFirst, "X"), "minutes");
    //console.log(trainNext);

    //var diffTime = moment().diff(moment(trainFirst), "minutes");

    // Difference between the times
    //var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   // console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
   // var tRemainder = diffTime % trainFreq;
    //console.log(tRemainder);

    // Minute Until Train
    //var tMinutesTillTrain = trainFreq - tRemainder;
    //console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    //var trainNext = moment().add(tMinutesTillTrain, "minutes");
   // console.log("ARRIVAL TIME: " + moment(trainNext).format("hh:mm"));

   //$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  // trainFreq + "</td><td>" + tArrive + "</td><td>" + tMinutes + "</td></tr>");
});
  



