
import { PrismaClient } from "../../generated/prisma";
import { Router } from "express";


const prisma = new PrismaClient();
const router = Router();

router.get('/', async (_req, res)=>{
    try{
        const customers = await prisma.customer.findMany()
        res.json(customers)
    }catch(error){
        res.status(500).json({
            error: "internal server error"
        })
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try{
        const customers = await prisma.customer.findUnique({
            where: {customerID: Number(id)},
        });
        res.json(customers)
    }catch(error){
        res.status(500).json({
            error: "internal server error"
        })
    }
})


router.post('/', async (req, res) => {
  const { firstName, lastName, birthDate, moneySpent, Orders } = req.body;

  try {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        moneySpent: parseFloat(moneySpent),
        Orders: {
          create: Orders.map((order: { employeeID: string; productID: string; orderTotal: string; orderDate: string | number | Date; }) => ({
            employeeID: parseInt(order.employeeID),
            productID: parseInt(order.productID),
            orderTotal: parseFloat(order.orderTotal),
            orderDate: new Date(order.orderDate),
          })),
        },
      },
      include: {
        Orders: true, // optional, if you want to return the created orders
      },
    });

    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error); // debug log
    res.status(400).json({ error: 'Bad Request'});
  }
});

// UPDATE (PUT)
router.put('/:id', async (req, res) => {
  const customerId = parseInt(req.params.id);
  const { firstName, lastName, birthDate, moneySpent, Orders } = req.body;

  try {
    const updatedCustomer = await prisma.customer.update({
      where: { customerID: customerId },
      data: {
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        moneySpent,
        Orders: {
          deleteMany: {}, // hapus orders lama
          create: Orders.map((order: any) => ({
            employeeID: order.employeeID,
            productID: order.productID,
            orderTotal: order.orderTotal,
            orderDate: new Date(order.orderDate),
          })),
        },
      },
    });

    res.json(updatedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update customer" });
  }
});

router.delete('/:id', async(req, res)=>{
  const customerID = parseInt(req.params.id);
  try {
    await prisma.customer.delete({
      where :{
        customerID : customerID
      }
    });
    res.json({message : "berhasil dihapus"})
  }catch (error){
    console.error(error);
      res.status(500).json({error: "gagal menghapus"});
  }})


export default router;