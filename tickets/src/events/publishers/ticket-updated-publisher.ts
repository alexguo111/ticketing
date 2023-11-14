import { Publisher, Subjects, TicketUpdatedEvent } from "@alexguotickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TickekUpdated = Subjects.TickekUpdated;
}
