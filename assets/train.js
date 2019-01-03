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
    firstTrain: firstTrain,
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
    var firstTrain = childSnapshot.val().firstTrain;
    var trainFreq = childSnapshot.val().frequency;

   // Train Info
   console.log(trainName);
   console.log(trainDest);
   console.log(firstTrain);
   console.log(trainFreq);

    // Time calculations
     var firstTimeConverted = moment(firstTrain, "hh:mm A");
     var currentTime = moment();
     console.log("Current time: " + moment(currentTime).format("hh:mm A"));
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
     var tRemainder = diffTime % trainFreq;
     var tMinutes = trainFreq - tRemainder;
     var nextTrain = moment().add(tMinutes, "minutes");
     console.log(tMinutes);
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

      // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinutes),
    
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

     

 });
  
    

   
  



