import React from "react";
import cuid from "cuid";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore, Timestamp } from "../firebase";
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
  const [error, setError] = React.useState<Error>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      setError(new Error("Invalid user"));

      return;
    }

    const currentDate = Timestamp.fromDate(new Date());

    const newShoppingList: NewShoppingList = {
      title,
      type,
      invitationKey: type === "collaborative" ? cuid() : null,
      createdAt: currentDate,
      createdBy: user.uid,
      updatedAt: currentDate,
      updatedBy: user.uid,
    };

    firestore
      .collection("shoppingLists")
      .add(newShoppingList)
      .then((shoppingList: any) => history.push(`/lists/${shoppingList.id}`))
      .catch((error: Error) => setError(error));
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
          {error && (
            <Alert variant="error" title="Error">
              {error.message}
            </Alert>
          )}
        </Stack>
      </form>
    </Page>
  );
};

export default CreateShoppingListView;
