// app/users/UsersTable.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnrichedUser } from "./dataType";

type SortKey = "name" | "email" | "website" | "totalPosts" | "completedTodos" | "pendingTodos";
type SortOrder = "asc" | "desc";
type FilterOption = "all" | "hasPending" | "noCompleted";

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

export default function UsersTable({ users }: { users: EnrichedUser[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  
  const [filterTodo, setFilterTodo] = useState<FilterOption>("all");

  let processedUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (filterTodo === "hasPending") {
    processedUsers = processedUsers.filter((u) => u.pendingTodos > 0);
  } else if (filterTodo === "noCompleted") {
    processedUsers = processedUsers.filter((u) => u.completedTodos === 0);
  }

  processedUsers.sort((dataA, dataB) => {
    let nilaiA = dataA[sortKey];
    let nilaiB = dataB[sortKey];

    if (typeof nilaiA === "string" && typeof nilaiB === "string") {
      nilaiA = nilaiA.toLowerCase();
      nilaiB = nilaiB.toLowerCase();
      if (nilaiA < nilaiB) return sortOrder === "asc" ? -1 : 1;
      if (nilaiA > nilaiB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    } 
    else {
      return sortOrder === "asc" ? (nilaiA as number) - (nilaiB as number) : (nilaiB as number) - (nilaiA as number);
    }
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
      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input type="text" placeholder="Search by name or email.."
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 border px-4 py-2 rounded focus:outline-none focus:border-blue-700"
          suppressHydrationWarning
        />
        
        <select 
          value={filterTodo} 
          onChange={(e) => setFilterTodo(e.target.value as FilterOption)}
          className="w-full md:w-1/3 border px-4 py-2 rounded focus:outline-none focus:border-blue-700 bg-white dark:bg-black"
        >
          <option value="all">All Task Status</option>
          <option value="hasPending">Has Pending Todos</option>
          <option value="noCompleted">No Completed Todos</option>
        </select>
      

      {/* tampilan hp */}
      <select
          value={`${sortKey}-${sortOrder}`}
          onChange={(e) => {
            // Memecah value (misal "name-asc") menjadi sortKey dan sortOrder
            const [key, order] = e.target.value.split("-");
            setSortKey(key as SortKey);
            setSortOrder(order as SortOrder);
          }}
          className="w-full md:hidden border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-gray-500 bg-white dark:bg-black"
        >
          <option value="name-asc">Sort Name (A-Z)</option>
          <option value="name-desc">Sort Name (Z-A)</option>
          <option value="email-asc">Sort Email (A-Z)</option>
          <option value="totalPosts-desc">Most Posts</option>
          <option value="completedTodos-desc">Most Completed Todos</option>
          <option value="pendingTodos-desc">Most Pending Todos</option>
        </select>
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {processedUsers.length === 0 ? (
          <div className="text-center py-6 border border-gray-200 text-gray-500">No matching users found</div>
        ) : (
          processedUsers.map((user) => (
            <div key={user.id} onClick={()=> router.push(`/users/${user.id}`)} className="border border-gray-200 p-4 rounded hover:border-gray-400 cursor-pointer transition-colors">
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-gray-500 mb-3">{user.email} | {user.website}</div>
              <div className="text-sm font-medium">Posts: {user.totalPosts}</div>
              <div className="text-sm font-medium">Todos: {user.completedTodos} Done / {user.pendingTodos} Pending</div>
            </div>
          ))
        )}
      </div>
      {/* tampilan desktop */}
      <div className="hidden md:block overflow-x-auto pb-4">
        <table className="w-full border border-gray-200 whitespace-nowrap">
          <thead>
            <tr> 
              {(["name", "email", "website", "totalPosts", "completedTodos", "pendingTodos"] as SortKey[]).map((col) => (
                <th key={col} onClick={() => updateSort(col)}
                className="text-left cursor-pointer select-none hover:bg-blue-500 group transition-colors"
                >
                  <div className="flex gap-2 px-4 py-2 text-sm">
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                    <SortIndicator col={col} sortKey={sortKey} sortOrder={sortOrder} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6">No matching users found</td>
              </tr>
            ) : (
              processedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-500 border-t cursor-pointer transition-colors" 
                onClick={()=> router.push(`/users/${user.id}`)}>
                  <td className="px-4 py-2 truncate">{user.name}</td>
                  <td className="px-4 py-2 truncate">{user.email}</td>
                  <td className="px-4 py-2 truncate">{user.website}</td>
                  <td className="px-4 py-2">{user.totalPosts}</td>
                  <td className="px-4 py-2">{user.completedTodos}</td>
                  <td className="px-4 py-2">{user.pendingTodos}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}