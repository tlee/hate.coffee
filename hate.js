/** @author pcthomatos
  * @license: MIT
 **/
var hate = (function(){
	var _compiledStr			= undefined,
		_chainable				= false,
		_openCloseDelimiters 	= ['\\{\\{', '}}'],
	//##################################################################################################################
		_init = function(){
			return {
				$: 			_compiledStr,
				options: 	_setOptions,
				compile: 	_compile
			}
		},
	//##################################################################################################################
		_setOptions = function(userOptionsObj){
			var userOptionsObj = userOptionsObj,
				chainable, openCloseDelimiters;

			if(userOptionsObj.hasOwnProperty('openCloseDelimiters')){
				openCloseDelimiters = userOptionsObj.openCloseDelimiters;
				if(openCloseDelimiters.length &&
					openCloseDelimiters.length === 2 &&
					typeof openCloseDelimiters[0] === 'string' &&
					typeof openCloseDelimiters[1] === 'string') _openCloseDelimiters = openCloseDelimiters;
			}

			if(userOptionsObj.hasOwnProperty('chainable')){
				chainable = userOptionsObj.chainable;
				 _chainable = (chainable === true || chainable === 1 || (/^true|1$/).test(chainable))? true : false;
				if(_chainable) return this;
			}
		},
	//##################################################################################################################
		_process = function(collection, tempalteStr){
			var collection 	= collection,
				tempalteStr = typeof tempalteStr !== 'string'? _compiledStr : tempalteStr,
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
			return tempalteStr;
		},
	//##################################################################################################################
		_compile = function(objectArrOrObj, tempalteStr){
			var collection 	= objectArrOrObj,
				tempalteStr = tempalteStr;

			this.$ = _compiledStr = (/^\[object Array]|\[object Object]$/).test(Object.prototype.toString.call(collection)) &&
									(!collection.length || collection.length && typeof collection[0] === 'object') &&
									(typeof tempalteStr === 'string' || _compiledStr !== undefined)?
											_process(collection, tempalteStr)
												: 'Error: Invalid hate.jquery.js params. Expecting Object or Array of Objects.';

			return  _chainable? this : _compiledStr;
		};
	//##################################################################################################################
	//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	return _init();
}());


