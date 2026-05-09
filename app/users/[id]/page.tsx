import Link from "next/link";

type User = {
  id:string
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

async function getUserDetail(id:string):Promise<User>{
  // Fetch data
  const fetchDetail = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
    cache: "no-store",
  });

  if (!fetchDetail.ok){
    throw new Error("Failed to fetch User Detail")
  }

  return fetchDetail.json();
}


export default async function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const user = await getUserDetail(id);

  return (
    <main className="max-w-4xl mx-auto py-16">
      <Link href="/users" className="text-sm text-gray-300 hover:underline">&larr; Back to list</Link>

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
      </div>
    </main>
  );
}