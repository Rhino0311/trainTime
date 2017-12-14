
var config = {
  
    apiKey: "AIzaSyCKZkribnqiJWHI38G6I2Cp6z_LDRHU6mk",
    authDomain: "rhino-65367.firebaseapp.com",
    databaseURL: "https://rhino-65367.firebaseio.com",
    projectId: "rhino-65367",
    storageBucket: "rhino-65367.appspot.com",
    messagingSenderId: "38881421297"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  // on click button
  	$("#submit").click(function(){
  		var name = $("#name-input").val().trim();
  		var destination = $("#destination-input").val().trim();
  		var time = $("#time-input").val().trim();
  		var frequency = $("#frequency-input").val().trim();

  		//pushing input into firebase
  		database.ref().push({
  			name: name,
  			destination: destination,
  			time: time,
  			frequency: frequency
  		})
	  		
	  		$("input").val('');
	  		return false;
}); 

  
  database.ref().on("child_added", function(childSnapshot){
  		// pull the data
  		var name = childSnapshot.val().name;
  		var destination = childSnapshot.val().destination;
  		var time = childSnapshot.val().time;
  		var frequency = childSnapshot.val().frequency;
	
			console.log("Name: " + name);
			console.log("Destination: " + destination);
			console.log("Time: " + time);
			console.log("Frequency: " + frequency);
			console.log(moment().format("hh:mm"));

		
		var firstTimeConverted = moment(time,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);
		
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
		
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);
		
		var theRemainder = diffTime % frequency;
		console.log(theRemainder);
		
		var theMinutesTillTrain = frequency - theRemainder;
		console.log("MINUTES TILL TRAIN: " + theMinutesTillTrain);
		
		var nextTrain = moment().add(theMinutesTillTrain, "minutes").format("hh:mm");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));	

	//display in the top table  
	var trainRow = $("<tr/>").attr("data-name", name);
	  trainRow.append($("<td/> ").text(name));
	  trainRow.append($("<td/> ").text(destination));
	  trainRow.append($("<td/> ").text(frequency));
	  trainRow.append($("<td/> ").text(nextTrain)); 
	  trainRow.append($("<td/> ").text(theMinutesTillTrain));
	  $(".table").append(trainRow);

});	

