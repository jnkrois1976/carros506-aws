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
