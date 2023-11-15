import create from "zustand";

const useSelectedItemStore = create((set) => ({
  selectedItems: [],
  addSelectedItem: (item) =>
    set((state) => ({ selectedItems: [...state.selectedItems, item] })),
}));

export default useSelectedItemStore;
