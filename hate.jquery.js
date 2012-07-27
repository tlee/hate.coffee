(function(jQuery){//JQuery Plugin##################
	var $this					= undefined,
		_openCloseDelimiters 	= ['{{', '}}'],
	//##################################################################################################################
		_init = function(){
			jQuery.fn.hate = _hate;
		},
	//##################################################################################################################
		_setOptions = function(openCloseDelimiters){
			var openCloseDelimiters = openCloseDelimiters;

			if(openCloseDelimiters.length &&
				openCloseDelimiters.length === 2 &&
				typeof openCloseDelimiters[0] === 'string' &&
				typeof openCloseDelimiters[1] === 'string') _openCloseDelimiters = openCloseDelimiters;
		},
	//##################################################################################################################
		_process = function(collection){
			var collection 	= collection,
				tempalteStr = $this.html(),
				openDmtr	=  _openCloseDelimiters[0],
				closeDmtr 	=  _openCloseDelimiters[1],
	 			collectionLength, i, j;

			if(!collection.length){
				for(i in collection) tempalteStr = tempalteStr.replace(new RegExp(openDmtr + i + closeDmtr, 'g'), collection[i]);
			}else{
				collectionLength = collection.length;
				for(i = 0; i < collectionLength; i+=1)
					for(j in collection[i])
						tempalteStr = tempalteStr.replace(regEx.compile(openDmtr + j + closeDmtr, 'g'), collection[i][j]);
			}

			$this.html(tempalteStr);
		},
	//##################################################################################################################
		_compile = function(optionsOrObjectArrOrObj){
			var collection 	= optionsOrObjectArrOrObj;

			if(collection.hasOwnProperty('openCloseDelimiters')) return _setOptions(collection.openCloseDelimiters);

			(/^\[object Array]|\[object Object]$/).test(Object.prototype.toString.call(collection)) &&
				(!collection.length || collection.length && typeof collection[0] === 'object')?
					_process(collection)
						: $this.html('Error: Invalid hate.jquery.js params. Expecting Object or Array of Objects.');
		},
	//##################################################################################################################
		_hate = function(optionsOrObjectArrOrObj){
			$this = this;
			_compile(optionsOrObjectArrOrObj);
			return this;
		};
	//##################################################################################################################
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	_init();
}(jQuery));
