
export const log = (msg, indent) => {
	indent = indent || 0;
	let prefix = '';
	
	for(let i = 0; i < indent; i++) prefix += ' ';
	
	if (typeof(msg) === 'object') {
		++indent;
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				
				if(typeof(msg[item]) === 'object') {
					console.log(`${prefix} ${item}:`);
					log(msg[item], indent);
				} else {  
					console.log(`${prefix} ${item}: ${msg[item]}`);
				};
			};
		};
	} else {
		console.log(`${prefix} ${msg}`);
	};
};
