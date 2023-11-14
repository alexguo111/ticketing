import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { Subjects } from "./subjects";
import { TicketCreateEvent } from "./ticket-created-event";

export class TicketCreatedListenter extends Listener<TicketCreateEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreateEvent['data'], msg: Message): void {
        console.log('Event data:', data);
        msg.ack();
    }
}