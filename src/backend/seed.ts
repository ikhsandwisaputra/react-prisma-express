import { PrismaClient } from "../generated/prisma"

const prisma = new PrismaClient();


async function main(){
   // Seed Products
  await prisma.product.createMany({
    data: [
      { category: 'Electronics', price: 299.99 },
      { category: 'Clothing', price: 49.99 },
      { category: 'Books', price: 15.5 },
      { category: 'Home Appliances', price: 120.0 },
    ],
  });

  // Seed Employees
  await prisma.employees.createMany({
    data: [
      {
        firstName: 'Alice',
        lastName: 'Johnson',
        birthDate: new Date('1990-05-10'),
      },
      {
        firstName: 'Bob',
        lastName: 'Smith',
        birthDate: new Date('1985-09-25'),
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        birthDate: new Date('1992-12-15'),
      },
    ],
  });

  // Seed Customers (assuming the model exists and already has data, or do it similarly)
  await prisma.customer.createMany({
    data: [
      {
        firstName: 'Ikhsan',
        lastName: 'Dwi Saputra',
        birthDate: new Date('2002-11-05'),
        moneySpent: 5000,
      },
      {
        firstName: 'Rina',
        lastName: 'Hartati',
        birthDate: new Date('1995-07-19'),
        moneySpent: 2000,
      },
    ],
  });

  // Seed Orders (must reference valid IDs from above inserts)
  await prisma.orders.createMany({
    data: [
      {
        customerID: 1,
        employeeID: 1,
        productID: 1,
        orderTotal: 299.99,
        orderDate: new Date('2024-01-01'),
      },
      {
        customerID: 2,
        employeeID: 2,
        productID: 2,
        orderTotal: 49.99,
        orderDate: new Date('2024-02-15'),
      },
      {
        customerID: 1,
        employeeID: 3,
        productID: 3,
        orderTotal: 15.5,
        orderDate: new Date('2024-03-20'),
      },
    ],
  });

  console.log('Seeding complete!');
}

main();