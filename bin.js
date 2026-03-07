import os from "os";
import cluster from "cluster";
import { app } from './index.js';

const PORT = 3000;

const CPU_COUNT = os.cpus().length;

if(cluster.isPrimary) {

    console.log("Number of CPUs is " + CPU_COUNT);
    console.log(`Primary ${process.pid} is running`);

    // FORK workers
    for(let i = 0; i < CPU_COUNT; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Starting a new worker');
        cluster.fork();
    });
} 
else {
    console.log(`Worker ${process.pid} started`);
    console.log(`Worker ${process.pid} is running`);

    // starting here only
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}