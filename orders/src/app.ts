import express from 'express'
import 'express-async-errors';
import { json } from 'body-parser'
import { newOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';

import { handleError, NotFoundError, currentUser } from '@alexguotickets/common';

import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUser);
app.use(indexOrderRouter);
app.use(newOrderRouter)
app.use(showOrderRouter)
app.use(deleteOrderRouter)
app.all('*', async (req, res, next) => {
    throw new NotFoundError();
})
app.use(handleError);

export { app }