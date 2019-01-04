var VALIDATE = VALIDATE || {};

VALIDATE.eventOptions = {
	blur: true,
	change: true,
	click: true,
	focus: true,
	keyup: false
};
VALIDATE.setup = {
	onLoad: true, // apply all the validation functionality BY DEFAULT as soon as the page finished loading. Or if false, onSubmit should be false
	onSubmit: false, // apply validation when the form is submitted. If true, onLoad should be false
	keyupDelay: true, // wait to validate until the user stops typing
	keyupDelayAmount: 500, // wait 500 miliseconds between key strokes
	customErroMsg: true, // apply custom error msg from the input's data attribute
	customStyle: true, // apply css classes to the input for visual feedback to the user
	showHint: true // use the input's tittle attribute to help the user provide valid data 
};
VALIDATE.patterns = {
	text: /^[a-z0-9]+$/i, // alphanumeric
	search: /^([a-zA-Z0-9 _-]+)$/, // alphanumeric with spaces, dashes or underscores allowed
	tel: /[0-9]{3}-[0-9]{3}-[0-9]{4}/, // xxx-xxx-xxxx
	url: /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/i,
	email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
};
/*
^					The password string will start this way
(?=.*[a-z])			The string must contain at least 1 lowercase alphabetical character
(?=.*[A-Z])			The string must contain at least 1 uppercase alphabetical character
(?=.*[0-9])			The string must contain at least 1 numeric character
(?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
(?=.{8,})			The string must be eight characters or longer
*/
VALIDATE.elems = {
	forms: document.getElementsByTagName('form')
};
VALIDATE.methods = {
	handleEvent: function(event){
		var checkValidityResult = event.target.checkValidity();
		if(!checkValidityResult){
			this.form.elements[4].click();
		}
	},
	triggerValidation: function(event){
		if(!event.target.form.checkValidity()){
			//return false;
			console.log('should display error');
		}
	}
};
VALIDATE.events = {
	setUpOnLoad: function(){
		var formsToValidate = [];
		for(var i = 0; i < VALIDATE.elems.forms.length; i++){
			if(!VALIDATE.elems.forms[i].noValidate){
				formsToValidate.push(VALIDATE.elems.forms[i]);
			}
		}
		for(var i = 0; i < formsToValidate.length; i++){
			var elemsToValidate = [];
			for(var c = 0; c < formsToValidate[i].elements.length; c++){
				if(formsToValidate[i].elements[c].willValidate 
				   && formsToValidate[i].elements[c].type !== 'submit'
				   && formsToValidate[i].elements[c].type !== 'button'){
					elemsToValidate.push(formsToValidate[i].elements[c]);
				}else if(formsToValidate[i].elements[c].type === 'submit'){
					formsToValidate[i].elements[c].addEventListener('click', VALIDATE.methods.triggerValidation, false);
				}
			}
		}
		for(var i = 0; i < elemsToValidate.length; i++){
			if(VALIDATE.setup.customErroMsg){
				elemsToValidate[i].setCustomValidity(elemsToValidate[i].dataset.error);	
			}
			if(VALIDATE.eventOptions.change){
				elemsToValidate[i].addEventListener('change', VALIDATE.methods.handleEvent, false);
			}
		}

	}
};
VALIDATE.init = function(){
	if(VALIDATE.setup.onLoad){
		VALIDATE.events.setUpOnLoad();
	}
	//VALIDATE.events.eventTwo();
};

//VALIDATE.init();