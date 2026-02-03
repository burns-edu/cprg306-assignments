import { NewItem } from "./new-item";

export default function Page() {
  return (
    <main className="bg-slate-50">
      <h1 className="text-xl font-bold px-30 py-3">Shopping List</h1>
      <NewItem />
    </main>
  );
}
