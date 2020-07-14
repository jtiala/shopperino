export interface NewShoppingList {
  title: string;
  type: ShoppingListType;
  invitationKey: string | null;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  updatedAt: firebase.firestore.Timestamp;
  updatedBy: string;
}

export interface ShoppingList extends NewShoppingList {
  id: string;
}

export type ShoppingListType = "private" | "collaborative";
