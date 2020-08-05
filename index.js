// The comment are for my personal education purposes
// if needed to be deleted I will do it

var _ = {};

let arrNumbers = [4, 5, 6, 19, 58, 4, 85, 8, 699, 4];
let obj = {
  testObjOne: 5,
  testObjTwo: 10,
  testObjThree: 90,
};
let arrayString = ["one", "two", "three", "four"];
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
  if (!Array.isArray(array)) {
    if (typeof array == "object" && array !== null) {
      array = [...array];
    } else {
      return [];
    }
  }
  return array.slice(0, notNumber(n));
};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
// is the same as the _.first, only slice calls (-n) and stars from the end of the array
_.last = function (array, n) {
  if (!Array.isArray(array)) {
    if (Object.prototype.toString.call(array) == "[object Arguments]") {
      array = [...array];
    } else return [];
  }
  return array.slice(-notNumber(n));
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  let arr = [];
  array.forEach((e) => {
    if (!arr.includes(e)) arr.push(e);
  });
  return arr;
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
  Object.keys(source).forEach((e) => (destination[e] = source[e]));

  return destination;
};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
  Object.keys(source).forEach((e) => {
    if (!destination[e]) destination[e] = source[e];
  });
  return destination;
};

// COLLECTIONS

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  let arr = [];
  for (const key in collection) {
    if (collection[key] === value) arr.push(+key);
  }
  return arr;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bind to the context if one is passed.
_.map = function (collection, iteratee, context) {
  let arr = [];
  let bounded = iteratee.bind(context);
  for (let e in collection) {
    if (collection.hasOwnProperty(e))
      arr.push(bounded(collection[e], e, collection));
  }
  return arr;
};

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bind to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  let bounded = iteratee.bind(context);
  for (let e in collection) {
    if (collection.hasOwnProperty(e)) {
      Array.isArray(collection)
        ? bounded(collection[e], +e, collection)
        : bounded(collection[e], e, collection);
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
// _.reduce = function (collection, iteratee, accumulator, context) {

// };

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  let bounded = predicate.bind(context);
  let arr = [];
  for (let e in collection) {
    if (collection.hasOwnProperty(e) && bounded(collection[e], e, collection))
      arr.push(collection[e]);
  }
  return arr;
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
  let bounded = predicate.bind(context);
  let arr = [];
  for (let e in collection) {
    if (collection.hasOwnProperty(e) && !bounded(collection[e], e, collection))
      arr.push(collection[e]);
  }
  return arr;
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
  let bounded = predicate.bind(context);
  let isEvery;
  for (let e in collection) {
    if (collection.hasOwnProperty(e) && bounded(collection[e], e, collection)) {
      isEvery = true;
    } else return false;
  }
  return isEvery;
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
  let bounded = iteratee.bind(context);
  //console.log(collection);
  let firstEl;
  for (let e in collection) {
    firstEl = collection[e];
    break;
  }
  let accIsFirst = false;
  if (!accumulator) {
    accIsFirst = true;
    accumulator = firstEl;
  }

  for (let i in collection) {
    if (accIsFirst) {
      accIsFirst = false;
      continue;
    }

    if (collection.hasOwnProperty(i)) {
      accumulator = bounded(accumulator, collection[i], i, collection);
    }
  }
  return accumulator;
};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  let bounded = predicate.bind(context);

  for (let e in collection) {
    if (collection.hasOwnProperty(e) && bounded(collection[e], e, collection))
      return true;
  }
  return false;
};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
let collection = ["de", "opjobob", "vbui0vbuowevbuovwebuo"];
let objArraY = [
  {
    propA: "34",
    propB: 66,
  },
  {
    propA: 89,
    propB: "44",
  },
];

_.invoke = function (collection, methodName, ...args) {
  return _.map(collection, (e) => {
    return typeof methodName === "string"
      ? e[methodName].apply(e, args)
      : methodName.apply(e, args);
  });
};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  let arr = [];
  collection.forEach((i) => {
    for (let e in i) {
      if (i.hasOwnProperty(e) && e === propertyName) {
        arr.push(i[e]);
      } else arr.push(undefined);
    }
  });
  return arr;
};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.
_.once = function (func) {
  let result = null;

  return function () {
    if (!result) {
      result = func(...arguments);
    }
    return result;
  };
};

// let myobj = {
// 	name: 'John',
// 	age: 34
// }

// myobj[Symbol('address')] = 'Kiev';
// myobj[Symbol('address')] = 'Lviv';
// myobj[Symbol('address')] = 'Kharkiv';
// myobj[Symbol('address')] = 'Herson';

// // for(let key in myobj){
// // 	console.log(myobj[key])
// // }
// console.log(myobj)

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  let results = {};
  return function (arg) {
    if (!(arg in results)) {
      results[arg] = func(arg);
    }
    return results[arg];
  };
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait, ...args) {
  setTimeout(() => {
    func(...args);
  }, wait);
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  let result = null;
  let shouldCall = true;

  return function (args) {
    if (shouldCall) {
      result = func(args);
      shouldCall = false;

      setTimeout(() => {
        shouldCall = true;
      }, wait);
    }
    return result;
  };
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === "undefined") {
  module.exports = _;
}
