import 'dotenv/config'

import { handler } from './build/handler.js';
import express from 'express';
import helmet from "helmet";
import http from 'http';
import { createTerminus } from '@godaddy/terminus'

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "script-src": ["*", "'unsafe-inline'"],
                "default-src": ["*", "https://rsas.fopradiowebcasting.top"],
                "connect-src": ["*", "https://rsas.fopradiowebcasting.top"],
            }
        },
        referrerPolicy: {
            policy: ["same-origin"],
        },
    })
)

app.use(handler);

const server = http.createServer(app)

createTerminus(server, {
    signals: ['SIGTERM', 'SIGINT'],
    onSignal: async () => {
        // Call your cleanup functions below. For example:
        // db.shutdown()
    }
})

server.listen(8080, () => {
    console.log('Listening on port 8080');
});