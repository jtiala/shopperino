import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";

import Page from "../components/Page";
import Stack from "../components/Stack";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";

const CreateShoppingListView: React.FC = () => {
  const history = useHistory();
  const [user] = useAuthState(auth);
  const [title, setTitle] = React.useState(
    `Shopping list for ${new Date().toLocaleDateString("fi-FI")}`
  );
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    firestore
      .collection("lists")
      .add({
        title,
        uid: user?.uid,
        timestamp: new Date().getTime(),
      })
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
