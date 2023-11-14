import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

declare global {
    var signin: (id?: string) => string[];
}
jest.mock('../nats-wrapper');
// jest.mock('../stripe')

process.env.STRIPE_KEY = 'sk_test_51OBAUzBaHFHi1xgldNprCvSiny1Xi060L0n0nBj92tEDyCJPR8SBiIMqZXx6b1DoF6iK4E81WeiL31mZT73wu1Xl00IjXcoFRs'

let mongo: any;
beforeAll(async () => {
    // process.env.STRIPE_KEY = 'sk_test_51OBAUzBaHFHi1xgldNprCvSiny1Xi060L0n0nBj92tEDyCJPR8SBiIMqZXx6b1DoF6iK4E81WeiL31mZT73wu1Xl00IjXcoFRs'
    process.env.JWT_KEY = "asdf"
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany();
    }
})

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    // const email = 'test@test.com';
    // const password = 'password';

    // const response = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email, password
    //     })
    //     .expect(201);

    // const cookie = response.get("Set-Cookie");


    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'adfkjko@llakwf.com'
    }

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = { jwt: token };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64')

    // return [`express:sess=${base64}`]
    return [`session=${base64}`]

    // return ["session=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalkxTXpsak1tVTRPRGN3WWpBNFptUXlaVFJpTnpsa1pTSXNJbVZ0WVdsc0lqb2lkbloyUUhaMmRpNWpiMjBpTENKcFlYUWlPakUyT1RneU9EUXlOalI5LnBlQ291ZWFtU1JRZDV3R3luMHBBOXZtbGc1eTNUdTJRZTAzenhYQ014V1UifQ=="]
}