import UsersTable from "./UsersTable";

// Define data type
type User = {
  id:number
  name:string
  username:string
  email:string
  address: {
    street:string
    suite:string
    city:string
    zipcode:string
    geo: {
      lat:string
      lng:string
    }
  }
  phone:string
  website:string
  company:{
    name:string
    catchPhrase:string
    bs:string
  }
}

async function getUsers(): Promise<User[]> {
  // Fetch data
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetching data");
  }

  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <a href="/" className="text-sm text-gray-300 hover:underline">&larr; Back</a>
      <h1 className="text-2xl font-semibold my-2">Users List</h1>
      <p className="text-sm text-gray-500 mb-4">
        Source: <a href="https://jsonplaceholder.typicode.com" target="_blank" className="hover:underline">jsonplaceholder.typicode.com</a>
      </p>
      
      <UsersTable users={users} />
    </main>
  );
}