$( document ).ready(function() {
	alert("hola");
	firebase.database().ref('multipleChoice').child('categories').once('value').then(function(snapshot) {
		var content = snapshot.val();
		var options="";
		for(var i in content) {
			options=options+"<option>"+content[i]+"</option>";
		}
		document.getElementById('categorySelection').innerHTML=options;
	});
});