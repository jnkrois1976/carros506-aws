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