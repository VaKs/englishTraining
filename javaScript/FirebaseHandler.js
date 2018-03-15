$( document ).ready(function() {
    document.getElementById('fileinput').addEventListener('change', readMultipleFiles, false);

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
});