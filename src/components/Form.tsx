import { useState } from "react";

interface Customer {
  firstName: string;
  lastName: string;
  birthDate: string;
  moneySpent: number;
//   Orders: string;
}

export default function CustomerForm() {
  const [form, setForm] = useState<Customer>({
    firstName: "",
    lastName: "",
    birthDate: "",
    moneySpent: 0,
    // Orders: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "moneySpent" ? parseFloat(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jsonData = JSON.stringify(form);
    console.log("data yang dikirm :", jsonData);
    try {
      const res = await fetch("http://localhost:3000/api/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus("Customer added successfully!");
        setForm({
          firstName: "",
          lastName: "",
          birthDate: "",
          moneySpent: 0,
        //   Orders: ""
        });
      } else {
        setStatus("Failed to add customer.");
      }
    } catch (error) {
      setStatus("Error connecting to the server.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded"
          type="number"
          name="moneySpent"
          placeholder="Money Spent"
          value={form.moneySpent}
          onChange={handleChange}
          required
        />
        {/* <input
          className="w-full p-2 border border-gray-300 rounded"
          type="text"
          name="Orders"
          placeholder="Orders"
          value={form.Orders}
          onChange={handleChange}
          required
        /> */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
