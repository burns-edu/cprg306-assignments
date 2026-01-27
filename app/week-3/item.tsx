export function Item({ name, quantity, category }) {
  return (
    <div className="p-2 mx-30 my-1 border rounded bg-green-100">
      <p>{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </div>
  );
}
