// Kyle Peterson
// Script for managing user input on the Mailing List page.

// Document Ready Function
$(function() {
	loadStates();
	$('.signup-form').submit(checkRequired);
	$('.cancel-signup').click(noThanksClick);
	$('.btn-abandon').click(redirect);
	$('select[name="refer"]').change(renderOtherField);
});

// Loads the state names into the state selection form.
function loadStates() {
	var stateSelect = $('.us-states');
	var i;
	var state;
	var option;
	for(i = 0; i < usStates.length; i++) {
		state = usStates[i];
		option = $(document.createElement('option'));
		option.attr('value', state.abbreviation);
		option.html(state.name);
		stateSelect.append(option);
	}	
}

// Checks if the required fields are inputted when the user submits
function checkRequired() {
	var signupForm = $(this);
	// Check for zip code if address is filled out
	var addr1Input = signupForm.find('input[name="addr-1"]');
	var addr1Value = addr1Input.val();
	if(addr1Value.length > 0) {
		var zipInput = signupForm.find('input[name="zip"]');
		var zipValue = zipInput.val();
		if(zipValue.length == 0)
			alert('You must input a zip code');
	}
	// This array is a list of the required fields name attributes
	var requiredFields = ['first-name', 'last-name', 'email'];
	var reqField;       //reference to a required field
    var reqValue;       //the required field's value
    var i;	
    for(i = 0; i < requiredFields.length; i++) {
    	var currentName = requiredFields[i];
	    reqField = signupForm.find('input[name='+currentName+']');
	    reqValue = reqField.val().trim();
	    if (0 === reqValue.length) {
	        //field has no value
	        // replace dashes in name attribute value to spaces
	        var message = currentName.replace("-", " ");
	        alert('You must enter a ' + message);
	        return false;
	    }
	}
}

// Double checks if the user wants to leave the page, by asking them again.
function noThanksClick() {
	$('.cancel-signup-modal').modal();
}

// Redirects to the home page if the user wants to stop signing up
function redirect() {
	window.location = 'http://www.google.com'
}

function renderOtherField() {
	//get a ref to the refer select
    //add the refer-other input
    var referSelect = $(this);
    var otherInput = $('[name="refer-other"]');

    //if the refer select's value in lower case is equal to "other"...
    if ('other' === referSelect.val().toLowerCase()) {
        //remove the disabled attribute from the
        //refer-other input, show it, and set focus to it
        otherInput.removeAttr('disabled');
        otherInput.show();
        otherInput.focus()
    } else {
        //otherwise, make the refer-other input disabled
        //and hide it
        otherInput.attr('disabled', true);
        otherInput.hide();
    }
};
