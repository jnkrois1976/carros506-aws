var APP = APP || {};
APP.elems = {
    suggestInputs: document.getElementsByClassName('suggestInput'),
    suggestWrappers: document.getElementsByClassName('suggestWrapper'),
    suggestLists: document.getElementsByClassName('suggestList'),
    searchMake: document.getElementById('searchMake'),
    searchModel: document.getElementById('searchModel'),
    searchYear: document.getElementById('searchYear')
};
APP.methods = {
    handleError: function(error){
        console.log(error.message);
    },
    getMakeSuggestions: function(event){
        var keyupEvent;
        if (keyupEvent) {
            clearTimeout(keyupEvent);
        }
        keyupEvent = setTimeout(function() {
            if (event.target.value.length >= 1) {
                APP.ajax.getMakeSuggestions(event);
            }else if(event.target.value == 0){
                while(event.target.nextElementSibling.hasChildNodes()){
                    event.target.nextElementSibling.removeChild(event.target.nextElementSibling.lastChild);
                }
            }
        }, 500);
    },
    getModelSuggestions: function(event){
        var keyupEvent;
        if (keyupEvent) {
            clearTimeout(keyupEvent);
        }
        keyupEvent = setTimeout(function() {
            if (event.target.value.length >= 1) {
                APP.ajax.getModelSuggestions(event);
            }else if(event.target.value == 0){
                while(event.target.nextElementSibling.hasChildNodes()){
                    event.target.nextElementSibling.removeChild(event.target.nextElementSibling.lastChild);
                }
            }
        }, 500);
    },
    displayMakeSuggestions: function(event){
        if(event.target.value.length > 0 && event.target.nextElementSibling.childElementCount > 0){
            APP.elems.searchModel.parentElement.classList.remove('active');
            $(APP.elems.searchModel.nextElementSibling).fadeOut('fast');
            event.target.parentElement.classList.add('active');
            $(event.target.nextElementSibling).fadeIn('fast');
        }
    },
    displayModelSuggestions: function(event){
        if(event.target.value.length > 0 && event.target.nextElementSibling.childElementCount > 0){
            APP.elems.searchMake.parentElement.classList.remove('active');
            $(APP.elems.searchMake.nextElementSibling).fadeOut('fast');
            event.target.parentElement.classList.add('active');
            $(event.target.nextElementSibling).fadeIn('fast');
        }
    },
    revealModelSuggestions: function(modelInput){
        if(modelInput.nextElementSibling.childElementCount > 0){
            modelInput.parentElement.classList.add('active');
            $(modelInput.nextElementSibling).fadeIn('fast');
        }
    },
    hideMakeSuggestions: function(event){
        //TODO - verify input value when user blurs out
        event.target.parentElement.classList.remove('active');
        $(event.target.nextElementSibling).fadeOut('fast');
    },
    hideModelSuggestions: function(event){
        //TODO - verify input value when user blurs out
        event.target.parentElement.classList.remove('active');
        $(event.target.nextElementSibling).fadeOut('fast');
    },
    selectMakeSuggestion: function(event) {
        event.target.parentElement.previousElementSibling.value = event.target.textContent;
        event.target.parentElement.parentElement.classList.remove('active');
        event.target.parentElement.style.display='none';
        APP.elems.searchModel.value='';
        APP.ajax.getModelSuggestions(event);
    },
    selectModelSuggestion: function(event) {
        event.target.parentElement.previousElementSibling.value = event.target.textContent;
        event.target.parentElement.parentElement.classList.remove('active');
        event.target.parentElement.style.display='none';
    }
};
APP.ajax = {
    getMakeSuggestions: function(event){
        var values = {csrf_token: $('input[name=csrf_token]').val(), make_value: event.target.value};
        $.ajax({
            url: '/ajax/makeSuggestions',
            data: values,
            type: 'POST',
            success: function(success){
                var suggestionsList = event.target.nextElementSibling,
                    suggestionsLength = '',
                    newSuggestItem = '',
                    newSuggestItemText = '';
                if(success.length > 0){
                    success = $.parseJSON(success);
                    while(suggestionsList.hasChildNodes()){
                        suggestionsList.removeChild(suggestionsList.lastChild);
                    }
                    for(var i = 0; i < success.length; i++){
                        newSuggestItem = document.createElement('li'),
                        newSuggestItemText = document.createTextNode(success[i].make);
                        newSuggestItem.appendChild(newSuggestItemText);
                        suggestionsList.appendChild(newSuggestItem);
                        newSuggestItem.addEventListener('mousedown', APP.methods.selectMakeSuggestion, false);
                        suggestionsLength = suggestionsList.childElementCount;
                    }
                    if(suggestionsLength > 0){
                        APP.methods.displayMakeSuggestions(event);
                        event.target.parentElement.classList.add('withSuggestions');
                    }
                }else if(success.length == 0){
                    while(suggestionsList.hasChildNodes()){
                        suggestionsList.removeChild(suggestionsList.lastChild);
                    }
                    newSuggestItem = document.createElement('li');
                    newSuggestItem.innerText = "Sorry, I don't have anything like that.";
                    suggestionsList.appendChild(newSuggestItem);
                }
            }
        });
    },
    getModelSuggestions: function(event){
        var values = {csrf_token: $('input[name=csrf_token]').val(), model_value: APP.elems.searchModel.value, make_value: APP.elems.searchMake.value};
        $.ajax({
            url: '/ajax/modelSuggestions',
            data: values,
            type: 'POST',
            success: function(success){
                var suggestionsList = APP.elems.searchModel.nextElementSibling,
                    suggestionsLength = '',
                    newSuggestItem = '',
                    newSuggestItemText = '';
                if(success.length > 0){
                    success = $.parseJSON(success);
                    while(suggestionsList.hasChildNodes()){
                        suggestionsList.removeChild(suggestionsList.lastChild);
                    }
                    for(var i = 0; i < success.length; i++){
                        newSuggestItem = document.createElement('li'),
                        newSuggestItemText = document.createTextNode(success[i].model);
                        newSuggestItem.appendChild(newSuggestItemText);
                        suggestionsList.appendChild(newSuggestItem);
                        newSuggestItem.addEventListener('mousedown', APP.methods.selectModelSuggestion, false);
                        suggestionsLength = suggestionsList.childElementCount;
                    }
                    if(suggestionsLength > 0){
                        if(event.target.nodeName == 'LI'){
                            APP.methods.revealModelSuggestions(APP.elems.searchModel);
                            event.target.parentElement.classList.add('withSuggestions');
                        }else if(event.target.id == 'searchModel'){
                            APP.methods.displayModelSuggestions(event);
                        }
                    }
                }else if(success.length == 0){
                    while(suggestionsList.hasChildNodes()){
                        suggestionsList.removeChild(suggestionsList.lastChild);
                    }
                    newSuggestItem = document.createElement('li');
                    newSuggestItem.innerText = "Sorry, I don't have anything like that.";
                    suggestionsList.appendChild(newSuggestItem);
                }
            }
        });
    }
};

APP.model = {
    testModel: {
        test: 'test model'
    }  
};
APP.events = {
    elems: APP.elems,
    methods: APP.methods,
    makeKeyupListener: function(){
        try{
            if(this.elems.searchMake !== null || this.elems.searchMake !== undefined){
                this.elems.searchMake.addEventListener('keyup', this.methods.getMakeSuggestions, false);
            }else{
                throw new Error('The make input field is not valid or is missing');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    modelKeyupListener: function(){
        try{
            if(this.elems.searchModel !== null || this.elems.searchModel !== undefined){
                this.elems.searchModel.addEventListener('keyup', this.methods.getModelSuggestions, false);
            }else{
                throw new Error('The model input field is not valid or is missing');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    makeFocusListener: function(){
         try{
            if(this.elems.searchMake !== null || this.elems.searchMake !== undefined){
                this.elems.searchMake.addEventListener('focus', this.methods.displayMakeSuggestions, false);
            }else{
                throw new Error('The make input field cannot be focused on');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    modelFocusListener: function(){
        try{
            if(this.elems.searchModel !== null || this.elems.searchModel !== undefined){
                this.elems.searchModel.addEventListener('focus', this.methods.displayModelSuggestions, false);
            }else{
                throw new Error('The model input field cannot be focused on');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    makeBlurListener: function(){
         try{
            if(this.elems.searchMake !== null || this.elems.searchMake !== undefined){
                this.elems.searchMake.addEventListener('blur', this.methods.hideMakeSuggestions, false);
            }else{
                throw new Error('The make input field cannot be blurred');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    modelBlurListener: function(){
        try{
            if(this.elems.searchModel !== null || this.elems.searchModel !== undefined){
                this.elems.searchModel.addEventListener('blur', this.methods.hideModelSuggestions, false);
            }else{
                throw new Error('The model input field cannot be blurred');
            }
        }catch(error){
            this.methods.handleError(error);
        }
    },
    init: function(){
        this.makeKeyupListener();
        this.modelKeyupListener();
        this.makeFocusListener();
        this.modelFocusListener();
        this.makeBlurListener();
        this.modelBlurListener();
    }
};

APP.events.init();
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