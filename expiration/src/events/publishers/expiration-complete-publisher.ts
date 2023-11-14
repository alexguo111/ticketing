import { Subjects, Publisher, ExpirationCompleteEvent } from "@alexguotickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete
}