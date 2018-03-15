var isFileSelected = false;
var content;
//var folder="C:\Users\vaks\Desktop\Desarrollo\Workspace\webs\web-ingles\questions";
var folder="../questions";
var filename;

function readSingleFile(evt) {
	
	    var files = evt.target.files; 	
    if (files) {
        for (var i=0, f; f=files[i]; i++) {
	          var r = new FileReader();
            r.onload = (function(f) {
                return function(e) {
					filename=f.name;
                    var contents = e.target.result;
                    content=JSON.parse(contents);
					isFileSelected = true;
                };
            })(f);

            r.readAsText(f);
        }   
    } else {
		  swal("Failed to load the file", "try again", "error");
    }
	
/*  This code it's a prettier to do this but it still dosen't work

    var file = evt.target.files[0]; 
    if (file) {
		var r = new FileReader();
		r.onload = function(e) { 
		alert("4");
		var contents = e.target.result;
		alert("5");
      }
      r.readAsText(f);
    } else { 
      swal("Failed to load the file", "try again", "error");
    }
*/
}
function addTest(e){ 

	if(isFileSelected){
		var sentence = document.getElementById("statement").value;
		var options = [];
		var letters = [];
		
		var explanation = document.getElementById("explanation").value
		
		if(document.getElementById("solutionA").checked)
			var solution="A";
		if(document.getElementById("solutionB").checked)
			var solution="B";
		if(document.getElementById("solutionC").checked)
			var solution="C";
		if(document.getElementById("solutionD").checked)
			var solution="D";

		options.push(document.getElementById("optionA").value);
		letters.push("A");

		options.push(document.getElementById("optionB").value);
		letters.push("B");
		
		if(document.getElementById("optionC").value != ""){
			options.push(document.getElementById("optionC").value);
			letters.push("C");

		}
		if(document.getElementById("optionD").value != ""){
			options.push(document.getElementById("optionD").value);
			letters.push("D");
		}

		

		content.push({
			"sentence": sentence,
			"solution": solution,
			"explanation": explanation,
			"options": []
		});

		for (var i=0; i<options.length; i++){
			content[content.length-1].options.push({"letter": letters[i], "answer": options[i]});
		}
		var data = JSON.stringify(content);
		
		alert("Contenido: "+data);
		
		fwrite_x(data);
		swal("test added", "", "success");
		
	} else{
		swal("No file selected", "Please select a file and try again", "error");
	}
	return false;
	
}

function resetForm() {
    document.getElementById("addForm").reset();
}

function fwrite_x(data){ 
alert("1");
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	filename=folder+"/"+filename;
alert("2: "+filename);
	var tf = fso.CreateTextFile(filename,2);
	tf.write(data);
	tf.close();
alert("3");
}
/*
var fso = new ActiveXObject("Scripting.FileSystemObject");
var a = fso.CreateTextFile("c:\\testfile.txt", true);
a.WriteLine("This is a test.");
a.Close();
*/

//fwrite_x v1.0 byScriptman
//modes: 0:si no existe, regresa false ;1: sobreescribe; 2:append.
/*
Tools -> Internet Options -> Security -> Custom Level (Button) - >
 Enable the following settings:
          Run ActiveX controls and plug-ins
          Initialize and script ActiveX control not marked as safe.

function fwrite_x(folder,filename,data,mode){ 
alert("1");
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	filename=folder+filename;
	if(fso.FileExists(filename) == false&&mode==0){
		return false;
	}
	if(fso.FileExists(filename) != false&&mode==2) {
		tf = fso.OpenTextFile(filename,1);
		var dataold = tf.readall(); tf.close(); 
	}else dataold="";
	var tf = fso.CreateTextFile(filename,2);
	tf.write(dataold+data);
	tf.close();
	return true;
}
*/





