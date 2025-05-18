import { useEffect, useState } from "react";
import { getAllCustomer } from "../services/apiService";
// import CustomerForm from "../components/Form";
import FormCustom from "../components/FormCustom";
interface User {
  customerID: number,
  firstName: String,
  lastName: String,
  birthDate: number | string,
  moneySpent: number
}
const Customers: React.FC = () => {
  


     const [users, setUsers] = useState<User[]>([]);
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState('');
   const [editingCustomer, setEditingCustomer] = useState(null);
      useEffect(() => {
  const fetchUsers = async () => {
    try {
      const data = await getAllCustomer();
      setUsers(data);
    } catch (err) {
      setError('Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  const handleEditClick = (customer: any) => {
    setEditingCustomer(customer);
  };
// Pindahkan ke luar useEffect
const deleteCustomer = async (customerID: number) => {
  if (!confirm("Yakin ingin menghapus?")) return;

  try {
    await fetch(`http://localhost:3000/api/customers/${customerID}`, {
      method: "DELETE"
    });
    // Refresh data setelah delete
    const updatedUsers = await getAllCustomer();
    setUsers(updatedUsers);
  } catch (err) {
    alert("Gagal menghapus data pengguna");
  }
};


       if (loading) return <p>Loading</p>;
       if (error) return <p>{error}</p>


    return(
<>
{/* Main Content */}
   <div className="min-h-screen bg-gray-50">
      <div className="pt-24 max-w-5xl mx-auto px-4">
        {/* <CustomerForm></CustomerForm>      */}
        <FormCustom customerData={editingCustomer} />
        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Customer List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Birth Date</th>
                  <th className="px-4 py-2 border">Money Spent</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((customer, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{customer.customerID}</td>
                    <td className="px-4 py-2 border">{customer.firstName}</td>
                    <td className="px-4 py-2 border">{customer.lastName}</td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(customer.birthDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 border text-right">Rp {Number(customer.moneySpent).toLocaleString()}</td>
                    <td className="px-4 py-2 space-x-2">                      
                     <button
          key={customer.customerID}
          onClick={() => handleEditClick(customer)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Update
        </button>
                      <button onClick={() =>deleteCustomer(customer.customerID)} className="bg-red-500 text-white px-3 py-1 rounder hover:bg-red-600">Delete</button>
                      
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td col-span="5" className="text-center text-gray-400 py-4">No customer data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
</>
    )
}

export default Customers;