import { Publisher, OrderCancelledEvent, Subjects } from "@alexguotickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}