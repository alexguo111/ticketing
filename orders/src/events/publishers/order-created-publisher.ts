import { Publisher, OrderCreatedEvent, Subjects } from "@alexguotickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}