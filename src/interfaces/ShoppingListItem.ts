import { Timestamp } from "firebase/firestore";

export interface NewShoppingListItem {
  title: string;
  status: ShoppingListItemStatus;
  createdAt: Timestamp;
  createdBy: string;
  updatedAt: Timestamp;
  updatedBy: string;
}

export interface ShoppingListItem extends NewShoppingListItem {
  id: string;
}

export type ShoppingListItemStatus = "active" | "inactive";
