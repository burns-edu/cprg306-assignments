"use client";

import { Item } from "./item";
import rawItems from "./items.json";
import { useState } from "react";

type ItemProps = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  // Sort list by name or category
  const sortedItems = [...rawItems].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    else if (sortBy === "category") return a.category.localeCompare(b.category);
    else return 0;
  });

  // Create unordered list of items, grouped by category
  const groupedItems = rawItems.reduce<Record<string, ItemProps[]>>(
    (groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }

      groups[item.category].push(item);
      return groups;
    },
    {},
  );

  // Sort categories and items in groupedItems list
  const sortedGroupedItems: { category: string; items: ItemProps[] }[] =
    Object.entries(groupedItems)
      .sort(([a], [b]) => a.localeCompare(b)) // sort categories
      .map(([category, items]) => ({
        category,
        items: [...items].sort((a, b) => a.name.localeCompare(b.name)),
      }));

  return (
    <div>
      {/* Buttons */}
      <div className="flex justify-center">
        {/* Sort by name */}
        <button
          onClick={() => setSortBy("name")}
          className={
            sortBy === "name"
              ? "bg-green-600 text-white p-2 mx-2 rounded"
              : "bg-green-300 text-white p-2 mx-2 rounded"
          }
        >
          Sort by name
        </button>

        {/* Sort by category */}
        <button
          onClick={() => setSortBy("category")}
          className={
            sortBy === "category"
              ? "bg-green-600 text-white p-2 mx-2 rounded"
              : "bg-green-300 text-white p-2 mx-2 rounded"
          }
        >
          Sort by category
        </button>

        {/* Group by category */}
        <button
          onClick={() => setSortBy("group")}
          className={
            sortBy === "group"
              ? "bg-green-600 text-white p-2 mx-2 rounded"
              : "bg-green-300 text-white p-2 mx-2 rounded"
          }
        >
          Group by category
        </button>
      </div>

      <div>
        <ul>
          {/* Sort by name or category */}
          {sortBy !== "group" &&
            sortedItems.map((item) => (
              <li key={item.id}>{<Item {...item}></Item>}</li>
            ))}

          {/* Group by category */}
          {sortBy === "group" &&
            sortedGroupedItems.map(({ category, items }) => (
              <li
                key={category}
                className="p-2 mx-30 my-1 border rounded bg-green-100"
              >
                <h2 className="font-bold capitalize">{category}</h2>

                <ul className="pl-4 capitalize">
                  {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
