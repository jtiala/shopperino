export interface NewShoppingListItem {
  title: string;
  status: ShoppingListItemStatus;
  createdAt: firebase.firestore.Timestamp;
  createdBy: string;
  updatedAt: firebase.firestore.Timestamp;
  updatedBy: string;
}

export interface ShoppingListItem extends NewShoppingListItem {
  id: string;
}

export type ShoppingListItemStatus = "active" | "inactive";
