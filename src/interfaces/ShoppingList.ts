import { Timestamp } from "firebase/firestore";

export interface NewShoppingList {
  title: string;
  type: ShoppingListType;
  invitationKey: string | null;
  createdAt: Timestamp;
  createdBy: string;
  updatedAt: Timestamp;
  updatedBy: string;
}

export interface ShoppingList extends NewShoppingList {
  id: string;
}

export type ShoppingListType = "private" | "collaborative";
