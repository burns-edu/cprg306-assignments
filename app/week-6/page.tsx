"use client"

import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import itemsData from "./items.json"
import { useState } from "react";

export default function Page() {
  const [items, setItems] = useState([...itemsData]);

  const handleAddItem = (newItem) => {
    setItems (prevItems => [...prevItems, newItem])
  }

  return (
    <main className="bg-slate-50">
      <h1 className= "text-center text-xl font-bold py-3">Shopping List</h1>
      <div className= "flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
        <NewItem onAddItem = {handleAddItem} />
        <ItemList items = {items} />
      </div>
    </main>
  );
}
