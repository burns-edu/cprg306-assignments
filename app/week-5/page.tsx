import { ItemList } from "./item-list";

export default function Page() {
  return (
    <main className="bg-slate-50">
      <h1 className= "text-center text-xl font-bold py-3">Shopping List</h1>
      <ItemList />
    </main>
  );
}
