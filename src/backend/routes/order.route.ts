
import { PrismaClient } from "../../generated/prisma";
import { Router } from "express";


const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_req, res)=>{
    try{
        const orders = await prisma.orders.findMany()
        res.json(orders)
    }catch(error){
        res.status(500).json({
            error: "internal server error"
        })
    }
})

export default router;