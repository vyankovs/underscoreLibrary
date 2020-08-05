// The comment are for my personal education purposes
// if needed to be deleted I will do it

var _ = {};

let arrNumbers = [4, 5, 6, 19, 58, 4, 85, 8, 699, 4];
let obj = {
  testObjOne: 5,
  testObjTwo: 10,
  testObjThree: 90,
};
let arrayString = ['one', 'two', 'three', 'four'];
let extendDefaultsTest = {};



// Need a function for _.first and _.last to check if number is NaN or <= 0
let notNumber = function (n) {
  if (isNaN(n) || n <= 0) {
    n = 1; // QUESTION why can't I return n inside the if?
  }
  return n;
};

// ARRAYS
// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.


_.first = function (array, n) {
  // we need an array to return in the end
  let newArr = [];
  // check if the first argument passed is an array
  if (Array.isArray(array)) {
    // if n is not a number or it is 0 or less than 0 then assign 1 to it
    n = notNumber(n)
    // return a new array that copies only the first item of the original array
    return newArr = array.slice(0, n);
    // else if the array is an object and the array is not null (which is an object data type )
  } else if (typeof(array) == 'object' && array !=null) { 
    // check again if n is not a number or <= 0 and assign 1 to it
    n = notNumber(n);
    // assign to the array the values of the object
    array = Object.values(array);
    // copy the array above created with only the number of the items passed in the second argument and return
    return newArr = array.slice(0, n);
  } else {
    // if it is not an array or an object then return an empty array
    return [];
  }
};

// _.first = function (array, n) {
//   // we need an array to return in the end
//   let newArr = [];
//   // check if the first argument passed is an array
//   if (!(array && array.length)) {
//     console.log(array, 'we are in line 34');
//     return [];
//   }

//   if (!Array.isArray(array)) {
//     array = Array.prototype.slice.call(array);
//     if (typeof n === 'number' && n > 0) {
//       return array.slice(0, n);
//     } else if (isNaN(n) || n <= 0) {
//       console.log(array[0]);
//       return [array[0]];
//     }
//   }
// };



// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
// is the same as the _.first, only slice calls (-n) and stars from the end of the array
_.last = function (array, n) {
  let newArr = [];
  if (Array.isArray(array)) {
    n = notNumber(n);
    return newArr = array.slice(-n);
  } else if (typeof (array) === 'object' && array != null) {
    n = notNumber(n);
    array = Object.values(array);
    return newArr = array.slice(-n);
  } else {
    return newArr;
  }
};


// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  // we need an empty array to be returned in the end
  let uniquedArr = [];
  // we need a new array with the passed array sorted ascending
  let arrSorted = array.sort();
  // loop through the array
  for (let i = 0; i < array.length; i++) {
    // check if the item of the sorted array at a given index
    // is the same as the next item in the same sorted array
    if (arrSorted[i] === arrSorted[i + 1]) {
      // If it is then do nothing
      arrSorted[i];
    } else {
      // if it isn't it means there are no other equal values therfore push it into the array and return
      uniquedArr.push(arrSorted[i]);
    }
  }
  return uniquedArr;
};


// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  // loop through an object with the for in loop 
  for (let prop in source) {
    // ignore the prototype properties
    if (source.hasOwnProperty(prop)) {
      // push the the source[prop] in the destination
      // QUESTION: why this works if source[prop] only takes the property value and not the property itself?
      destination[prop] = source[prop];
    }
  }
  return destination;
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  // iterate through the object
  for (let prop in source) {
    // check if destination own property is not equal to the source own property
    if (destination.hasOwnProperty(prop) !== source.hasOwnProperty(prop)) {
      // then copy source[prop] into the destination[prop]
      destination[prop] = source[prop];
    }
  }
  return destination;
};


// COLLECTIONS

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  // we need an array to store 
  var res = [];
  // loop through each item of the collection
  _.each(collection, function (el, key) {
    // check if el is equal to value, then push the key inside the array res.
    // because we want the indexes (for arrays, while for objects returns the property names)
    // where these value (that are equals to el) are found
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bind to the context if one is passed.
_.map = function (collection, iteratee, context) {
  // we need an array where to store the result of the iteratee function
  let newArr = [];
  // loop through the collection
  _.each(collection, function (item, index, collection) {
    // push inside the newArr the value returned from the iteratee function
    // in this way we do not modify the existing collection but we return a new array
    // need to bind the this kwyord to the context (if there is one, if not it just ignores it)
    newArr.push(iteratee.call(context, item, index, collection));
  });
  return newArr;
};

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bind to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  // We need to check if collection is an array
  if (Array.isArray(collection)) {
    // if it is an array then we need to loop through it 
    for (let [index, value] of collection.entries()) {
      // and call the function iteratee and bind the this keyword to the context (if there is otherwise it will ignore it)
      iteratee.call(context, value, index, collection);
    }
    // else, if it is not an array, so if it is an object
  } else {
    // loop through it and we also need to ignore the prototype properties
    for (let [key, value] of Object.entries(collection)) {
      // this is a personal reflection and if it is wrong please write it here
      // In order to ignore the prototype properties we can use one of either:
      // 1- for of loop but since objects are not iterable need to deconstruct them with Object.entries(objectName)
      // which also automatically ignores the prototype properties
      // 2- for in loop which can iterate through the object but by default would iterate through the 
      // prototype properties so we need another check if the object .objectName.hasOwnProperty(propNamePassedInLoop)
      /*
      for (let prop in collection) {
        if (collection.hasOwnProperty(prop)) {
          iteratee.call(context, collection[prop], prop, collection);
        }
      } 
      */ // the for of loop is one line less. I do not know if one has other advantages or disadvantages over the other
      // like in the previous if statement, we need to call iteratee and bind bla bla
      iteratee.call(context, value, key, collection);
    }
  }
  return collection;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  _.each(collection, function (item, index, collection) {
    if (!accumulator) {
      accumulator = item;
    } else {
      accumulator = iteratee.call(context, accumulator, item, index, collection);
    }
  });
  return accumulator;
};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  let newarr = [];
  _.each(collection, function (value, index, collection) {
    if (predicate.call(context, value, index, collection)) {
      newarr.push(value);
    }
  });
  return newarr;
};
// test keeps saying that It should return an array of values that pass a truth test
// but either with arr or object the both return an array with the truthy values
// test 
// _.filter(arr, (el) => el >10) //[19, 58, 85, 699]


// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  let newarr = [];
  _.each(collection, function (value, index, collection) {
    if (!predicate.call(context, value, index, collection)) {
      newarr.push(value);
    }
  });
  return newarr;
};
// test. This works but still throws an error
// _.reject(arr, (el) => el >10)  // [4, 5, 6, 4, 8, 4]



// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  let isTrue = true;
  _.each(collection, function (item, index, collection) {
    if (!predicate.call(context, item, index, collection)) {
      isTrue = false;
    }
  });
  return isTrue;
};



// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  _.each(collection, function (item, index, collection) {
    if (!accumulator) {
      accumulator = item;
    } else {
      accumulator = iteratee.call(context, accumulator, item, index, collection);
    }
  });
  return accumulator;
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  let isTrue = false; // QUESTION: why this wouldnt work if set to true
  _.each(collection, function (item, index, collection) {
    if (predicate.call(context, item, index, collection)) {
      isTrue = true;
    }
  });
  return isTrue;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
let collection = ['de', 'opjobob', 'vbui0vbuowevbuovwebuo'];
let objArraY = [{
  propA: '34',
  propB: 66
}, {
  propA: 89,
  propB: '44'
}];

_.invoke = function (collection, methodName) {
  // let args = Array.prototype.slice.call(arguments, 2);
	arguments.slice = [].slice;
	let args = arguments.slice(2)
  return _.map(collection, function (item, index, collection) {
    return item[methodName].apply(item, args);
  });
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  return _.map(collection, function (item, index, collection) {
    return item[propertyName];
  });
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  let called = false,
    result;
  return function () {
    if (!called) {
      result = func.apply(this, arguments);
      called = true;
    }
    return result;
  }
};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  // create an object to store our results
	let answers = {};
  // creating closures 
	return function(string){
    // if there is not such caculation result in our answer object 
		if(!(string in answers)){
      // then in our answer object store the result from the returned function with this argument
			answers[string] = func(string)
		}
    // if we already have the result of this calculation in our answer object then just call it, because it was stored when was called for the first time
		return answers[string]
	}
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait,...args) {
  setTimeout(()=>{
		func.apply(null, args)
	},wait)
};
// study curring


// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  // need a variable to separate the first call from the second call
	let firstCall=true;
	let result;
  // return a function that takes all the aguments
	
	return function(args){
    // if firstCall is true
		if(firstCall){
      // return the value from func(...args) inside result
			result=func(args);
      // sets firstCall to false so that it works only once
			firstCall = false
    // if firstCall is false
		}else{
      // call deay psing the 
			setTimeout(()=>{
				called=true;
			}, wait)
		}
		return result;
	}
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}