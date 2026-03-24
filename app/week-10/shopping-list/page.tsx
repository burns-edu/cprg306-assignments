"use client";

import { ItemList } from "./item-list";
import { NewItem } from "./new-item";
import { getItems, addItem } from "../_services/shopping-list-service";
import MealIdeas from "./meal-ideas";
import { useState, useEffect } from "react";
import { useUserAuth } from "../_utils/auth-context";
import { useRouter } from "next/navigation";

export default function Page() {
  // Item State Variables
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Verify user authentication
  const { user } = useUserAuth();
  const router = useRouter();

  // Redirect if user CANNOT be authenticated
  if (!user) {
  router.push("/week-10");
  return null;
  }

  // Load shopping list
  async function loadItems() {
  let itemsData = await getItems(user.uid);
  setItems(itemsData);
  }

  useEffect(() => {
    loadItems();
  }, []);

  // Event Handlers
  const handleAddItem = async (newItem) => {
    const id = await addItem(user.uid, newItem);
    setItems((prevItems) => [...prevItems, {...newItem, id}]);
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
