import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/ai.routes.js'
import userRouter from './routes/user.routes.js'
import connectCloudinary from './config/cloudinary.js'

await connectCloudinary();  

// constants
const app = express();
const PORT_NO = process.env.PORT_NO || 3000;


// middlewares
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// routes
app.get('/', (req, res) => {
    res.send('Backend API working ...');
})

// protected routes
app.use (requireAuth());

app.use('/api/user', userRouter);
app.use('/api/ai', aiRouter);


app.listen(PORT_NO, () => {
    console.log(`Server running on ${PORT_NO}`);
})
