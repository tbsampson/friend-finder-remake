
var questions = createQuestions();
$('#myModal').modal()
function createQuestions() {
	let q1 = "I am the life of the party.";
	let q2 = "I feel little concern for others.";
	let q3 = "I am always prepared.";
	let q4 = "I get stressed out easily.";
	let q5 = "I have a rich vocabulary.";
	let q6 = "I don't talk much.";
	let q7 = "I am a people person.";
	let q8 = "I focus more on details than on the big picture.";
	let q9 = "My desk is always a mess.";
	let q10 = "I change my mind often.";
	let questionArray = [ q1, q2, q3, q4, q5, q6, q7, q8, q9, q10 ];
	return questionArray;
}

$( "#questionDiv" ).append( '<div class="row"><div class="col-lg-12">' );
for ( var i = 0; i < questions.length; i++ ) {
	$( "#questionDiv" ).append( 
		`<h3>Question ${ i + 1 }</h3>
			<p>${questions[ i ]}</p>
				<select class="chosen-select dropList" id="q${i}">
					<option value=""></option>
					<option value="1">1 (Agree Strongly)</option>
					<option value="2">2</option>
					<option value="3" selected>3</option>
					<option value="4">4</option>
					<option value="5">5 (Disagree Strongly)</option>
				</select>
		`);		
}

$( "#questionDiv" ).append( `<button type="submit" class="btn btn-primary" id="submitButton">Submit</button></div></div>` ); // close divs here
// Dropdown options
var config = {
	".chosen-select": {},
	".chosen-select-deselect": { allow_single_deselect: true },
	".chosen-select-no-single": { disable_search_threshold: 10 },
	".chosen-select-no-results": { no_results_text: "No matches!" },
	".chosen-select-width": { width: "95%" }
};


for ( var selector in config ) {
	$( selector ).chosen( config[ selector ] );
}

// ---------------------------------------------------------------- Submit
$( "#submitButton" ).on( "click", function( event ) {
	event.preventDefault(); // Don't reload the page
	function userValidation() { // Validate form
		let valid = true;
		if ( $( "#name" ).val() === "" ) { valid = false; }
		if ( $( "#image" ).val() === "" ) {	valid = false; }
		if ( $( "#image" ).val().charAt( 4 ) !== ":" 
		  && $( "#image" ).val().charAt( 5 ) !== ":" ) {valid = false;}
		$( ".chosen-select" ).each( function() {
			if ( $( this ).val() === "" ) {	valid = false; }
		} );
		return valid;
	}
	if ( userValidation() ) { // looks good, save answers
		var formAnswers = {
			"name": $( "#name" ).val().trim(),
			"photo": $( "#image" ).val().trim(),
			"answers": [
				parseInt( $( "#q0" ).val() ),
				parseInt( $( "#q1" ).val() ),
				parseInt( $( "#q2" ).val() ),
				parseInt( $( "#q3" ).val() ),
				parseInt( $( "#q4" ).val() ),
				parseInt( $( "#q5" ).val() ),
				parseInt( $( "#q6" ).val() ),
				parseInt( $( "#q7" ).val() ),
				parseInt( $( "#q8" ).val() ),
				parseInt( $( "#q9" ).val() )
			]
		};
		// Reveal match
		$.post( "/api/friends", formAnswers, function( data ) {
			console.log(data)
			$( "#friendNameDiv" ).html( "<h2>" + data.name + "</h2>" );
			$( "#friendImg" ).attr( "src", data.photo );
			$( "#myModal" ).modal( "show" );
		} );
	}
	else {
		console.log( "Please answer every question!" );
	}
});