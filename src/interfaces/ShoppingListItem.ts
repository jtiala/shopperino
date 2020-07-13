export interface NewShoppingListItem {
  title: string;
  status: ShoppingListItemStatus;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface ShoppingListItem extends NewShoppingListItem {
  id: string;
}

export type ShoppingListItemStatus = "active" | "inactive";
