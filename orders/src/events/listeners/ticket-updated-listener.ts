import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@alexguotickets/common";
import { Ticket } from "../../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TickekUpdated = Subjects.TickekUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {

        // const ticket = await Ticket.findById(data.id);
        // const ticket = await Ticket.findOne({
        //     _id: data.id,
        //     version: data.version - 1
        // })
        const ticket = await Ticket.findByEvent(data);
        if (!ticket) {
            throw new Error('Ticket Not found');
        }
        const { title, price } = data;
        ticket.set({ title, price });
        await ticket.save();
        console.log("updated ticket in order service->", ticket);
        msg.ack();
    }
}