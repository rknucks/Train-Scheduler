var config = {
  apiKey: "AIzaSyAE59okORpsoeYDL36uNw6Dhcz-toHPlss",
  authDomain: "train-scheduler-fd7c8.firebaseapp.com",
  databaseURL: "https://train-scheduler-fd7c8.firebaseio.com",
  projectId: "train-scheduler-fd7c8",
  storageBucket: "train-scheduler-fd7c8.appspot.com",
  messagingSenderId: "871440773112"
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
    train: trainName,
    destination: trainDest,
    firstTrain: firstTrain,
    frequency: trainFreq
  };
  //upload train data to database
  database.ref().push(newTrain);

  //log to console
  console.log(newTrain.train);
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

  return false;
});

database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var tName = childSnapshot.val().train;
    var tDest = childSnapshot.val().destination;
    var tFirst = childSnapshot.val().first;
    var tFreq = childSnapshot.val().frequency;

    var timeArr = tFirst.split(".");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var MaxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrive;

    //If the first train is later than the current time, sent arrival to the first train time
    if (maxMoment === trainTime) {
      tArrive = trainTime.format("hh:mm A");
      tMinutes = trainTime.diff(moment(), "minutes");
    }  
      else {
        // Calculate the minutes until arrival using hardcore math
        // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time
        // and find the modulus between the difference and the frequency.
        var diffTimes = moment().diff(trainTime, "minutes");
        var tRemainder = diffTimes % tFreq;
        tMinutes = tFreq - tRemainder;
        // To calculate the arrival time, add the tMinutes to the currrent time
        tArrive = moment().add(tMinutes, "m").format("hh.mm A");
      }

  
    

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

   $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" +
   tFreq + "</td><td>" + tArrive + "</td><td>" + tMinutes + "</td></tr>");
});
  

})

