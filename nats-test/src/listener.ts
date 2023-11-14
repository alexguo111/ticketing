import nats, { Message, Stan } from 'node-nats-streaming'
import { randomBytes } from 'crypto';
import { TicketCreatedListenter } from './events/ticket-created-listener';

console.clear();
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222',
});

stan.on('connect', () => {
    console.log("listener connected to nats");
    new TicketCreatedListenter(stan).listen();
});

stan.on('close', () => {
    console.log("NATS CONNECTION CLOSED");
    process.exit();
})

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());