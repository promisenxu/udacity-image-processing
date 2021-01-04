import express from 'express';
import stoppable from 'stoppable';
import http from 'http';

import * as imagesRoute from './routes/images';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
    res.send('This is the Image Processing API');
});
app.use(imagesRoute.BASE_PATH, imagesRoute.default);
// Error handling
app.use((_err: Error, _req: any, res: any, _next: any) => {
    res.status(500);
    res.send('Internal Server Error');
})

const httpServer = stoppable(http.createServer(app), 29 * 1000);
httpServer.listen(port, () => {
    console.log(`Image processing API listening at http://localhost:${port}`);

    if (typeof process.send === 'function') {
        process.send('ready');
    }
});

const onSigintAndSigterm = () => {
    console.log('Receive SIGINT or SIGTERM signal...');
    httpServer.close(err => {
        if (err) {
            console.error('Error on closing server: ' + err);
        }
        else {
            console.log('No error - closing...')
        }
        process.exit(0);
    });
};

process.on('SIGINT', onSigintAndSigterm);
process.on('SIGTERM', onSigintAndSigterm);
