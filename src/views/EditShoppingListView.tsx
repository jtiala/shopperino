import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";

import Page from "../components/Page";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Stack from "../components/Stack";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";

const DataWrapper: React.FC = () => {
  const { listId } = useParams();

  const [
    shoppingList,
    shoppingListLoading,
    shoppingListError,
  ] = useDocumentDataOnce<ShoppingList>(
    firestore.doc(`shoppingLists/${listId}`),
    {
      idField: "id",
    }
  );

  if (shoppingListLoading) {
    return <LoadingPage />;
  }

  if (shoppingListError || !shoppingList) {
    return <ErrorPage message={shoppingListError?.message} />;
  }

  return <CreateShoppingListView shoppingList={shoppingList} />;
};

interface Props {
  shoppingList: ShoppingList;
}

const CreateShoppingListView: React.FC<Props> = ({ shoppingList }) => {
  const history = useHistory();
  const [user] = useAuthState(auth);

  const [title, setTitle] = React.useState(shoppingList.title);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      setError("Invalid user");

      return;
    }

    firestore
      .collection("shoppingLists")
      .doc(shoppingList.id)
      .update({
        title,
        updatedAt: new Date(),
        updatedBy: user.uid,
      })
      .then(() => history.push(`/lists/${shoppingList.id}`))
      .catch((err: string) => {
        setError(err);
      });
  };

  return (
    <Page title={`Edit ${shoppingList.title}`}>
      <form onSubmit={handleSubmit}>
        <Stack>
          <Input
            label="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <Button type="submit" variant="primary" disabled={title.length < 1}>
            Save
          </Button>
          {error.length > 0 && <Alert title="Error" message={error} />}
        </Stack>
      </form>
    </Page>
  );
};

export default DataWrapper;
