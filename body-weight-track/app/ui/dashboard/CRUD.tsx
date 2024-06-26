import Link from "next/link";
export default function CRUD() {
  return (
    <div>
      <Link key="Create" href="/dashboard/create">
        Create
      </Link>
      <Link key="Update" href="/dashboard/update">
        Update
      </Link>
      <Link key="Delete" href="/dashboard/delete">
        Delete
      </Link>
    </div>
  );
}
