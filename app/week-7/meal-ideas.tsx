"use client";

import { useState, useEffect } from "react";

// Meal Interface
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealIdeasProps {
  ingredient: string;
}

// API Fetching Function
async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
    );
    const data: { meals: Meal[] | null } = await response.json();
    return data.meals;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}

// Component
export default function MealIdeas({ ingredient }: MealIdeasProps) {
  // State variables
  const [meals, setMeals] = useState<Meal[]>([]);

  // Define Load function
  async function loadMealIdeas() {
    const fetchedMeals = await fetchMealIdeas(ingredient);
    setMeals(fetchedMeals ?? []);
  }

  // Set render conditions
  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  // Render
  return (
    <div className="py-3 max-w-100">
      <h2 className="text-lg font-bold text-center">Meals</h2>

      {meals.map((meal) => (
        <div key={meal.idMeal} className="flex flex-col items-center gap-2 mx-4 my-1 border rounded bg-green-100">
          <p className="font-bold">{meal.strMeal}</p>
          <img src={meal.strMealThumb} width="150" />
        </div>
      ))}
    </div>
  );
}
