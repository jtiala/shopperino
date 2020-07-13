export interface NewShoppingList {
  title: string;
  type: ShoppingListType;
  collaborationKey: string | null;
  roles: {
    [uid: string]: ShoppingListRole;
  };
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface ShoppingList extends NewShoppingList {
  id: string;
}

export type ShoppingListType = "private" | "collaborative";

export type ShoppingListRole = "owner" | "collaborator";
