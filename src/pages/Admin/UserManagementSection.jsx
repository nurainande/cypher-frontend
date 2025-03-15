import { useState, useEffect } from "react";

// Sample users data (this would typically come from a backend)
// const initialUsers = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 3, name: "Mark Brown", email: "mark@example.com", role: "User" },
// ];

const UserManagementSection = () => {
  const [users, setUsers] = useState([]);

  async function fetchUsers(){
    const res = await fetch("http://127.0.0.1:3000/api/v1/user/all-users",{
      method: "GET",
      credentials: "include",
    })
    const data = await res.json();

    if(data.success){
      setUsers(data.data);
    } else {
      console.error(data.error);
    }
    // console.log(data)
    // setUsers(data);
  }

  // Fetch users from the backend or set initial data
  useEffect(() => {
    // Ideally, you'd fetch users from an API here
    fetchUsers();
    // console.log(users);
    // Example: fetch("/api/users").then(res => res.json()).then(data => setUsers(data));
    // fetch("http://127.0.0.1:3000/api/v1/user/all-users")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data));

    // setUsers(initialUsers);
  }, []);

  // Handle deleting a user
  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    // Make DELETE request to backend here
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      {/* Add User Button */}
      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-center">
                  <button className="bg-green-500 text-white px-3 py-1 rounded-md mr-2">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* If no users exist */}
        {users.length === 0 && (
          <div className="p-6 text-gray-500 text-center">No users found.</div>
        )}
      </div>
    </section>
  );
};

export default UserManagementSection;
