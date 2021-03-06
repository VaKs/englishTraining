var test=[];

function setTest(){
	test=[];
	var category=document.getElementById("categorySelection").value;
	firebase.database().ref('multipleChoice').child(category).once('value').then(function(snapshot) {
		processContent(snapshot.val());
		showTest();
	});
}

function processContent(content){
	for(var i in content) {
		test.push(content[i]);
		var solution=test[i].solution;
		switch(test[i].solution) {
			case "A":
				test[i].solution=0;
				break;
			case "B":
				test[i].solution=1;
				break;
			case "C":
				test[i].solution=2;
				break;
			case "D":
				test[i].solution=3;
				break;
			default:
				swal("Error on solution letter", "letter: "+test[i].solution+" is not A,B,C or D", "error");
		} 
	}
}

function showTest(){
	var output="<div id='questions'><form id='formulary' onsubmit='return toCorrect(event)'>";
	for(var i in test) {
		var question=test[i];
		output=output+"<h3>"+question.sentence+"</h3>";
		for(var j in question.options) {
			var op = question.options[j];
			if((op.letter!=undefined) &&(op.answer!=undefined)){
				output=output+"<p id='"+i+""+j+"'><input type='radio' name='"+i+"' value='"+j+"'> "+op.letter+") "+op.answer+"</p>";
			}
		}
	}

	output=output+"<input type='submit' class='btn btn-info' value='Submit'><a href='javascript:showTest()' class='btn btn-warning'>Reset</form></div>";
	document.getElementById('test').innerHTML=output;
}

function toCorrect(e){
	var successCounter = 0;
	for(var i in test) {
		var answer =document.getElementsByName(i);
		var solution= test[i].solution;
		for(var j in test[i].options){
			var id=""+i+""+j;
			var answerText =document.getElementById(id);
			if(answer[j].value==solution){
				answerText.style.color="green";
				answerText.style.fontWeight = "900";
				if(answer[j].checked){
					successCounter++;
				}
			} else {
				if(answer[j].checked){
					answerText.style.color="red";
					answerText.style.fontWeight = "900";
				}
			}
			
		}
	}
	if(successCounter>= (test.length/2)){
		swal("Good job!", "your score is: "+successCounter+"/"+test.length+" !", "success");
	} else {
		swal("Maybe next time!", "your score is: "+successCounter+"/"+test.length+" !", "error");
	}
	return false;	
}

function addTest(e){
	var category;
	var statement;
	var optionA;
	var optionB;
	var optionC;
	var optionD;
	var solution;
	var explanation;

	if($( "#newCategory" ).is(":visible")){
			category = $( "#newCategory" ).val();
	}
	statement = $( "#statement" ).val();
	optionA = $( "#optionA" ).val();
	optionB = $( "#optionB" ).val();
	optionC = $( "#optionC" ).val();
	optionD = $( "#optionD" ).val();
	solution = $('input[name=solution]:checked').val();
	explanation = $( "#explanation" ).val();

	var newTest = {
		sentence: statement,
		solution: solution,
		explanation: explanation,
		options: []
	};

	newTest.options.push({letter: "A", answer: optionA});
	newTest.options.push({letter: "B", answer: optionB});
		
	if(optionC.length !=0){
		newTest.options.push({letter: "C", answer: optionC});
	}

	if(optionD.length !=0){
		newTest.options.push({letter: "D", answer: optionD});
	}

	if($( "#newCategory" ).is(":visible")){
		writeNewTestFirebase(newTest,category);
	} else {
		writeNewTestFirebase(newTest);
	}
	return false;
}

 function writeNewTestFirebase(newTest) {
	firebase.database().ref('multipleChoice/').child('B2').push(newTest);
}

 function writeNewTestFirebase(newTest,category) {
	firebase.database().ref('multipleChoice/').child(category).push(newTest);
	firebase.database().ref('multipleChoice/').child("categories").push(category);
}