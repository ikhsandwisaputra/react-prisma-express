import { useEffect, useState } from "react"
import { getAllCustomer } from "../services/apiService";
interface User {
  customerID: number,
  firstName: String,
  lastName: String,
  birthDate: number | string,
  moneySpent: number
}
const UserList: React.FC = () =>{
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const data = await getAllCustomer();
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
    return(
        <div>
                <h1>DAFTAR PENGGUNA</h1>
                <ul>
                    {users.map(customer=>(
                        <li key={customer.customerID}>
                            {customer.firstName}{customer.lastName}
                        </li>
                    ))}
                </ul>
        </div>
    )
}

export default UserList;