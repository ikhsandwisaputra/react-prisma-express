import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
import userRoutes from './routes/customer.route';
import employeeRoutes from './routes/employee.route';
import orderRoutes from './routes/order.route';
import productRoutes from './routes/product.route';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/customers', userRoutes)
app.use('/api/employees', employeeRoutes )
app.use('/api/products', productRoutes )
app.use('/api/orders', orderRoutes )


const PORT = process.env.PORT || 3000;


app.listen(PORT, () =>{
    console.log(`server berjalan di http://localhost:${PORT}`)
})

export default app;
