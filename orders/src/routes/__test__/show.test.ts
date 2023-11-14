import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../../models/ticket'
import { Order, OrderStatus } from '../../../models/order'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

it('fetches the order', async () => {

    // create a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20
    })
    await ticket.save();

    // make a request to build an order with this ticket
    const user = global.signin();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);

    // const expiration = new Date();
    // expiration.setSeconds(expiration.getSeconds() + 15 * 60)

    // const payload = {
    //     id: new mongoose.Types.ObjectId().toHexString(),
    //     email: 'adfkjko@llakwf.com'
    // }

    // const token = jwt.sign(payload, process.env.JWT_KEY!);

    // const session = { jwt: token };

    // const sessionJSON = JSON.stringify(session);

    // const base64 = Buffer.from(sessionJSON).toString('base64')

    // // return [`express:sess=${base64}`]
    // const sess = [`session=${base64}`]

    // const order = Order.build({
    //     userId: payload.id,
    //     status: OrderStatus.Created,
    //     expiresAt: expiration,
    //     ticket
    // })
    // order.save()

    // fetch the order
    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);

    // console.log("FetchedOrder->", fetchedOrder);
    // console.log("Order->", order);
    expect(fetchedOrder.id).toEqual(order.id);
})


it('returns an error if an user tries to fetch order that does not belong to him', async () => {

    // create a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: "concert",
        price: 20
    })
    await ticket.save();

    // make a request to build an order with this ticket
    const user = global.signin();

    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ ticketId: ticket.id })
        .expect(201);
    // console.log("=========", order);

    // fetch the order
    const { body: fetchedOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', global.signin())
        .send()
        .expect(401);
})