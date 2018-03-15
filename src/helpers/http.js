import http from 'http';

const post = (lambdaName, data, callback) => {
	var options = require('url').parse('http://localhost:3000/'+lambdaName); // sambda-handleHelloMessage
	options.method = 'POST';
	var req = http.request(options, function (res) {
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			callback(chunk);
		});
	});
	req.write(JSON.stringify(data));
	req.end();
	return req;
};

export default post;