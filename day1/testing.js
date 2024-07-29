const http = require('http');

const testSyncServer = () => {
    console.time('sync');
    http.get('http://localhost:3000/read-sync', (res) => {
        res.on('data', (chunk) => { });
        res.on('end', () => {
            console.timeEnd('sync');
        });
    });
};

const testAsyncServer = () => {
    console.time('async');
    http.get('http://localhost:3000/read-async', (res) => {
        res.on('data', (chunk) => { });
        res.on('end', () => {
            console.timeEnd('async');
        });
    });
};

console.log('Testing synchronous server...');
testSyncServer();

// setTimeout(() => {
console.log('Testing asynchronous server...');
testAsyncServer();
// }, 5000);
