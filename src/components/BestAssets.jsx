import React from "react";
import useSelectedItemStore from "../../useSelectedItemStore";

function BestAssets() {
  const selectedItems = useSelectedItemStore((state) => state.selectedItems);
  console.log(selectedItems);

  return (
    <div>
      <h2>Selected Items</h2>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default BestAssets;
