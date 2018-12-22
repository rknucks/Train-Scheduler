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
  var trainFirst = moment($("#first-train-time-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();
  

  var newTrain = {
    train: trainName,
    destination: trainDest,
    first: trainFirst,
    frequency: trainFreq
  };
  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.frequency);

  alert("Train added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().train;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);

    var trainNext = moment().diff(moment(trainFirst, "X"), "minutes");
  console.log(trainNext);

    var trainTime = moment().diff(moment(trainFirst, "HH:mm").format ("X"));

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(trainTime),
      $("<td>").text(trainNext)
     
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  

})

