"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define type data
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

type SortKey = "name" | "email" | "website";
type SortOrder = "asc" | "desc";

// Sort Component
function SortIndicator({col, sortKey, sortOrder}: {
  col: SortKey;
  sortKey: SortKey;
  sortOrder: SortOrder;
}) {
  // Jika sort tidak aktif
  if (sortKey !== col)
    return <div>↕</div>;
  
  return (
    <div>
      {sortOrder === "asc" ? "↑" : "↓"}
    </div>
  );
}

export default function UsersTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const router = useRouter();

  // Filter berdasarkan name atau email
  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((dataA, dataB) => {
    const nilaiA = dataA[sortKey].toLowerCase();
    const nilaiB = dataB[sortKey].toLowerCase();
    if (nilaiA < nilaiB) 
      return sortOrder === "asc" ? -1 : 1;
    if (nilaiA > nilaiB) 
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  function updateSort(key: SortKey) {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <input type="text" placeholder="Search by name or email.."
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:border-blue-700"
          suppressHydrationWarning
        />
      </div>

      {/* Table */}
      <div>
        <table className="w-full table-fixed border border-gray-200">
          <thead>
            <tr className=""> 
              {(["name", "email", "website"] as SortKey[]).map((col) => (
                <th key={col} onClick={() => updateSort(col)}
                className="text-left cursor-pointer select-none hover:bg-blue-700"
                >
                  <div className="flex gap-2 px-4 py-1">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    <SortIndicator col={col} sortKey={sortKey} sortOrder={sortOrder} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6">No matching users found</td>
              </tr>
            ) : (
              sorted.map((user) => (
                <tr key={user.id} className="hover:bg-blue-700 border-t cursor-pointer" 
                onClick={()=> router.push(`/users/${user.id}`)}>
                  <td className="px-4 py-1">{user.name}</td>
                  <td className="px-4 py-1">{user.email}</td>
                  <td className="px-4 py-1">{user.website}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}