export function Item({ name, quantity, category, onSelect }) {
  return (
    <div
      className="p-2 mx-10 my-1 border rounded bg-green-100"
      onClick={onSelect}
    >
      <p className="font-bold capitalize">{name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </div>
  );
}
