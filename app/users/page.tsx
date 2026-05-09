import { Suspense } from "react";
import UsersTable from "./UsersTable";
import { User, Post, Todo, EnrichedUser } from "./dataType";
import Link from "next/link";
import BackButton from "./[id]/BackButton";

async function getData(): Promise<{ enrichedUsers: EnrichedUser[] }> {
  const [fetchUsers, fetchPosts, fetchTodos] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users",  { cache: "no-store" }),
    fetch("https://jsonplaceholder.typicode.com/posts",  { cache: "no-store" }),
    fetch("https://jsonplaceholder.typicode.com/todos",  { cache: "no-store" }),
  ]);

  if (!fetchUsers.ok || !fetchPosts.ok || !fetchTodos.ok) {
    throw new Error("Failed to fetch data");
  }

  const users: User[] = await fetchUsers.json();
  const posts: Post[] = await fetchPosts.json();
  const todos: Todo[] = await fetchTodos.json();

  const enrichedUsers: EnrichedUser[] = users.map((user) => {
    const userPosts = posts.filter((p) => p.userId === user.id);
    const userTodos = todos.filter((t) => t.userId === user.id);

    return {
      ...user,
      totalPosts: userPosts.length,
      completedTodos: userTodos.filter((t) => t.completed).length,
      pendingTodos:   userTodos.filter((t) => !t.completed).length,
    };
  });
  return { enrichedUsers };
}

export default async function UsersPage() {
  const { enrichedUsers } = await getData();

  return (
    <main className="max-w-6xl mx-auto px-8 py-12">
      <BackButton/>
      <h1 className="text-2xl font-semibold my-2">Users Operations</h1>
      <p className="text-sm text-gray-500 mb-4">
        Source: <a href="https://jsonplaceholder.typicode.com" target="_blank" className="hover:underline">jsonplaceholder.typicode.com</a>
      </p>
      
      <UsersTable users={enrichedUsers} />
    </main>
  );
}