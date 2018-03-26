$( "#categorySelection" ).ready(function() {
	firebase.database().ref('multipleChoice').child('categories').once('value').then(function(snapshot) {
		var content = snapshot.val();
		var options="";
		for(var i in content) {
			var option = document.createElement("option");
			option.text = content[i];
			option.value = content[i];
			var select = document.getElementById("categorySelection");
			select.add(option);
		}
	});
	$( "#categorySelection" ).change(function() {
		if($( "#categorySelection" ).val()=="newCategory"){
			$( "#newCategory" ).show( "fast" );
			$( "#newCategory" ).val( "" );
		} else {
			$( "#newCategory" ).hide( "fast" );
			$( "#newCategory" ).val( "none" );
		}
		
	});
});