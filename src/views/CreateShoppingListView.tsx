import React from "react";
import cuid from "cuid";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";
import { NewShoppingList, ShoppingListType } from "../interfaces/ShoppingList";

import Page from "../components/Page";
import Stack from "../components/Stack";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

const CreateShoppingListView: React.FC = () => {
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState(
    `Shopping list for ${new Date().toLocaleDateString("fi-FI")}`
  );
  const [type, setType] = React.useState<ShoppingListType>("private");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      setError("Invalid user");

      return;
    }

    const currentDate = new Date();

    const newShoppingList: NewShoppingList = {
      title,
      type,
      collaborationKey: type === "collaborative" ? cuid() : null,
      roles: { [user.uid]: "owner" },
      createdAt: currentDate,
      createdBy: user.uid,
      updatedAt: currentDate,
      updatedBy: user.uid,
    };

    firestore
      .collection("shoppingLists")
      .add(newShoppingList)
      .then((shoppingList: any) => history.push(`/lists/${shoppingList.id}`))
      .catch((err: string) => {
        setError(err);
      });
  };

  return (
    <Page title="Create a shopping list">
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Checkbox
            legend="Type"
            name="type"
            type="radio"
            value={type}
            onChange={(e) => setType(e.target.value as ShoppingListType)}
            options={[
              { value: "private", label: "Private" },
              { value: "collaborative", label: "Collaborative" },
            ]}
          />
          <Button type="submit" variant="primary" disabled={title.length < 1}>
            Create
          </Button>
          {error.length > 0 && <Alert title="Error" message={error} />}
        </Stack>
      </form>
    </Page>
  );
};

export default CreateShoppingListView;
