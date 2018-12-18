import { log } from './extensions/logging.js';


let message = 'Advance Logging';
let simpleArray = ['array','with','values'];
let simpleObject = {
	'object':'with',
	'multiple': 'props'
};

let complexObject = {
	simpleObject,
	'simpleArray': simpleArray
};

console.log(message);
console.log('---');
log(simpleArray);
console.log('---');
log(simpleObject);
console.log('---');
log(complexObject);
