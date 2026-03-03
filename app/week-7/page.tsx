"use client";

import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas";
import { useState } from "react";

export default function Page() {
  // State Variables
  const [items, setItems] = useState([...itemsData]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Event Handlers
  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    // Remove emojis
    let cleanedItemName = item.name.replace(
      /[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu,
      "",
    );
    // Remove text after comma
    cleanedItemName = cleanedItemName.split(",")[0];
    // Trim whitespace
    cleanedItemName = cleanedItemName.replace(/\s+/g, " ").trim();

    console.log("Fetching meals for ingredient:", cleanedItemName);
    setSelectedItemName(cleanedItemName);
  };

  return (
    <main className="bg-slate-50">
      <h1 className="text-center text-xl font-bold py-3">Shopping List</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <NewItem onAddItem={handleAddItem} />
        <ItemList items={items} onItemSelect={handleItemSelect}/>
        <MealIdeas ingredient={selectedItemName} />
      </div>
    </main>
  );
}
