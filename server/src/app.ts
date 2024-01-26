import express from 'express';
import cors from 'cors';
import adminRouter from './routes/adminsRouter';
import applicationsRouter from './routes/applicationsRouter';
import devicesRouter from './routes/devicesRouter';
import notificationsRouter from './routes/notificationsRouter';
import usersRouter from './routes/userRouter';
import loginRoutes from './routes/loginRoutes';

export const app = express();



app.use(express.json());
app.use(cors());



app.get('/', (_req, res)=>{
    res.send('hola mundo')
});


app.use('/', adminRouter)
app.use('/', applicationsRouter)
app.use('/', devicesRouter)
app.use('/', notificationsRouter)
app.use('/', usersRouter)
app.use('/', loginRoutes)