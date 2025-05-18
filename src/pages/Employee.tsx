import { useEffect, useState } from "react";
import { getAllEmployee } from "../services/apiService";
interface Employee {
  employeeID: number;
  firstName: string;
  lastName: string;
  birthDate: Date;
}
const Employee: React.FC = () => {
     const [employees, setUsers] = useState<Employee[]>([]);
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState('');
   
       useEffect(()=>{
           const fetchUsers = async () =>{
               try{
                   const data = await getAllEmployee();
                   setUsers(data);
               }catch(err){
                   setError('Gagal mengambil data pengguna');
               } finally{
                   setLoading(false);
               }
           };
           fetchUsers();
       }, []);
   
   
       if (loading) return <p>Loading</p>;
       if (error) return <p>{error}</p>

//   const [formData, setFormData] = useState({
//     customerID: "",
//     firstName: "",
//     lastName: "",
//     birthDate: "",
//     moneySpent: ""
//   });

//   const [customers, setCustomers] = useState([]);


//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setCustomers([...customers, formData]);
//     setFormData({
//       customerID: "",
//       firstName: "",
//       lastName: "",
//       birthDate: "",
//       moneySpent: ""
//     });
//   };
    return(
<>
{/* Main Content */}
   <div className="min-h-screen bg-gray-50">
      <div className="pt-24 max-w-5xl mx-auto px-4">
        {/* Form */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Customer</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="customerID"
              placeholder="Customer ID"
              value={formData.customerID}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="moneySpent"
              placeholder="Money Spent"
              value={formData.moneySpent}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div> */}

        {/* Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Employees List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-blue-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Birth Date</th>                  
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{employee.employeeID}</td>
                    <td className="px-4 py-2 border">{employee.firstName}</td>
                    <td className="px-4 py-2 border">{employee.lastName}</td>
                    <td className="px-4 py-2 border text-center">
                      {new Date(employee.birthDate).toLocaleDateString()}
                    </td>
                  
                  </tr>
                ))}
                {employees.length === 0 && (
                  <tr>
                    <td col-Span="5" className="text-center text-gray-400 py-4">No employee data yet.</td>
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

export default Employee;