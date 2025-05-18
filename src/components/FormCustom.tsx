import { useEffect, useState } from "react";

export default function FormCustom({ customerData }: { customerData?: any }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    moneySpent: "",
    Orders: [
      {
        employeeID: "",
        productID: "",
        orderTotal: "",
        orderDate: "",
      },
    ],
  });

  const [isUpdate, setIsUpdate] = useState(false);

 useEffect(() => {
    if (customerData) {
      setFormData({
        ...customerData,
        moneySpent: customerData.moneySpent?.toString() || "",
        Orders: customerData.Orders?.length
          ? customerData.Orders.map((o: any) => ({
              employeeID: o.employeeID.toString(),
              productID: o.productID.toString(),
              orderTotal: o.orderTotal.toString(),
              orderDate: o.orderDate.split("T")[0], // format ke YYYY-MM-DD
            }))
          : [
              {
                employeeID: "",
                productID: "",
                orderTotal: "",
                orderDate: "",
              },
            ],
      });
      setIsUpdate(true);
    }
  }, [customerData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    const { name, value } = e.target;
    if (name.startsWith("Orders.") && typeof index === "number") {
      const key = name.split(".")[1];
      const updatedOrders = [...formData.Orders];
      updatedOrders[index] = {
        ...updatedOrders[index],
        [key]: value,
      };
      setFormData({ ...formData, Orders: updatedOrders });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addOrder = () => {
    setFormData({
      ...formData,
      Orders: [
        ...formData.Orders,
        { employeeID: "", productID: "", orderTotal: "", orderDate: "" },
      ],
    });
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isUpdate
      ? `http://localhost:3000/api/customers/${customerData.customerID}`
      : "http://localhost:3000/api/customers/";

    const method = isUpdate ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          moneySpent: parseFloat(formData.moneySpent),
          Orders: formData.Orders.map((o) => ({
            ...o,
            employeeID: parseInt(o.employeeID),
            productID: parseInt(o.productID),
            orderTotal: parseFloat(o.orderTotal),
          })),
        }),
      });

      await res.json();
      alert(isUpdate ? "Customer updated!" : "Customer created!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Create New Customer</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Money Spent</label>
          <input
            type="number"
            name="moneySpent"
            value={formData.moneySpent}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg text-gray-700">Orders</h3>
        {formData.Orders.map((order, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded">
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="number"
                name="Orders.employeeID"
                value={order.employeeID}
                onChange={(e) => handleChange(e, index)}
                className="w-full mt-1 px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Product ID</label>
              <input
                type="number"
                name="Orders.productID"
                value={order.productID}
                onChange={(e) => handleChange(e, index)}
                className="w-full mt-1 px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Order Total</label>
              <input
                type="number"
                name="Orders.orderTotal"
                value={order.orderTotal}
                onChange={(e) => handleChange(e, index)}
                className="w-full mt-1 px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Order Date</label>
              <input
                type="date"
                name="Orders.orderDate"
                value={order.orderDate}
                onChange={(e) => handleChange(e, index)}
                className="w-full mt-1 px-3 py-2 border rounded"
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addOrder}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Another Order
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
      >
        Submit Customer
      </button>
    </form>
  );
}
