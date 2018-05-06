var shared = require('./share');

shared.y = 'lsd';// 此时share.js里的num也会变成2

console.log(shared.y);
