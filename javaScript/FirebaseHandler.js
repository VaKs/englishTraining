$( document ).ready(function() {
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyC69h5ZBTTqTmUpQIx2HCd7W5kOcVg87fk",
		authDomain: "englishtraining-9eac6.firebaseapp.com",
		databaseURL: "https://englishtraining-9eac6.firebaseio.com",
		projectId: "englishtraining-9eac6",
		storageBucket: "",
		messagingSenderId: "1099442899198"
	};
	firebase.initializeApp(config);
	var database = firebase.database();
	var dbResponse="hola";
});

function writeData() {
  firebase.database().ref('prueba/').set({
    id : 2
  });
}

function readData(){
	return firebase.database().ref('multipleChoice').child('B2').once('value').then(function(snapshot) {
		return snapshot.val();
	});
}