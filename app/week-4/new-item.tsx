"use client";

import { useState } from "react";

export function NewItem() {
  // Initialize state variables
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (event) => {
    // Prevent default behaviour
    event.preventDefault();

    // Validate name
    if (!name || name.length < 2) {
      alert("Name must be at least 2 characters long.");
      return;
    }

    // Create item object
    const item = {
      name,
      quantity,
      category,
    };

    // Log item to console
    console.log(item);

    // Display alert
    alert(`Name: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    // Reset variables to initial values
    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-4 p-5 w-80 bg-white rounded-lg shadow"
    >
      <label>
        Name:
        <input
          type="text"
          placeholder="Enter item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onBlur={() => setNameTouched(true)}
          className={`border mx-1 px-3 py-2 rounded ${
            nameTouched && name.length == 0
              ? "border-red-500"
              : "border-gray-300"
          }`}
        />
        {nameTouched && name === "" && (
          <p className="text-red-500 text-sm m-1">Name is required.</p>
        )}
      </label>

      <label>
        Quantity:
        <input
          type="number"
          min="1"
          max="99"
          placeholder="Enter item quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="border mx-1 px-3 py-2 rounded border-gray-300"
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border mx-1 px-3 py-2 rounded border-gray-300"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </label>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!name || quantity < 1}
          className="bg-blue-500 text-white p-2 rounded
            hover:bg-blue-600
            disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
