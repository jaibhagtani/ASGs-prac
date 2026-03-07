import express from 'express';
import os from 'os';
export const app = express();

const PORT = 3000;
const startTime = Date.now();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/pid', (req, res) => {
    res.send(`Process ID: ${process.pid}`);
});

app.get('/cpu', (req, res) => {
    for(let i = 0; i < 1e9; i++) {
        // Simulating CPU intensive task
        Math.random();
    }
    console.log(`CPU intensive task completed in ${Date.now() - startTime} ms`);
    res.send('CPU intensive task completed');
});

app.get("/host", (req, res) => {
    res.send(`Hostname: ${os.hostname()}`);
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });