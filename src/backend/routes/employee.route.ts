
import { PrismaClient } from "../../generated/prisma";
import { Router } from "express";


const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_req, res)=>{
    try{
        const customers = await prisma.employees.findMany()
        res.json(customers)
    }catch(error){
        res.status(500).json({
            error: "internal server error"
        })
    }
})

export default router;