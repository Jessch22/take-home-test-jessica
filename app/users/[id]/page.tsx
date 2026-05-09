import type { Metadata } from 'next';
import { User, Post, Todo } from "../dataType";
import BackButton from "./BackButton";

async function getUserDetail(id:string){
  // Fetch data
  const [fetchUsers, fetchPosts, fetchTodos] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,  { cache: "no-store" }),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`,  { cache: "no-store" }),
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${id}`,  { cache: "no-store" }),
  ]);

  if (!fetchUsers.ok || !fetchPosts.ok || !fetchTodos.ok) {
    throw new Error("Failed to fetch data");
  }

  const user: User = await fetchUsers.json();
  const posts: Post[] = await fetchPosts.json();
  const todos: Todo[] = await fetchTodos.json();

  return { user, posts, todos };
}


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;
  const { user } = await getUserDetail(id);
  
  return {
    title: `User detail - ${user.name}`,
    description: `User detail - ${user.name} from ${user.company.name}`
  }
}


export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { user, posts, todos } = await getUserDetail(id);

  return (
    <main className="max-w-4xl mx-auto py-16 px-6">
      <BackButton/>

      <div>
        <header>
          <h1 className="text-4xl pt-4 mb-2">
            {user.name}
          </h1>
          <p className="text-lg pb-4">
            @{user.username}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-blue-700 pt-8">
          <div>
            <h2 className="text-xs font-bold uppercase text-blue-500">Contact</h2>
            <div className="text-sm">
              <h4 className="text-blue-300 pt-4">Email</h4>
              <a href={`mailto:${user.email}`} className="hover:underline">{user.email}</a>
              <h4 className="text-blue-300 pt-4">Phone</h4>
              <p className="hover:underline">{user.phone}</p>
              <h4 className="text-blue-300 pt-4">Website</h4>
              <a href={`https://${user.website}`} target="_blank" className="hover:underline">{user.website}</a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-blue-500 mb-4">Address</h2>
            <div className="text-sm">
              <p>{user.address.street}, {user.address.suite}</p>
              <p>{user.address.city}</p>
              <p>{user.address.zipcode}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-blue-500 mb-4">Company</h2>
            <p className="text-sm">{user.company.name}</p>
            <p className="text-sm italic text-zinc-500 leading-relaxed">
              "{user.company.catchPhrase}"
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-blue-700 pt-8 mt-12">
          <div>
            <h2 className="text-xs font-bold uppercase text-blue-500 mb-4">Task List (Todos)
            <span className="mx-4 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {todos.filter(t => t.completed).length} / {todos.length} Done
            </span>
            </h2>
            <ul className="max-h-80 overflow-y-auto space-y-2 pr-2">
              {todos.map(todo => (
                <li key={todo.id} className="flex items-start gap-2 text-sm bg-zinc-50 dark:bg-zinc-900 p-2 rounded">
                  <input type="checkbox" checked={todo.completed} readOnly className="mt-1" />
                  <span className={todo.completed ? "line-through text-gray-500" : ""}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase text-blue-500 mb-4">Recent Posts ({posts.length})</h2>
            <div className="max-h-80 overflow-y-auto space-y-4 pr-2">
              {posts.map(post => (
                <div key={post.id} className="bg-zinc-50 dark:bg-zinc-900 p-3 rounded">
                  <h3 className="font-bold text-sm mb-1 truncate">{post.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{post.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}