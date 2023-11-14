import { Publisher, Subjects, TicketCreateEvent } from "@alexguotickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
