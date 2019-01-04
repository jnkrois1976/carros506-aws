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