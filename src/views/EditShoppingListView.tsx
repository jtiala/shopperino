import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDocumentDataOnce } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { DocumentReference } from "firebase/firestore";

import { auth, firestoreCompat } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";

import Page from "../components/Page";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Stack from "../components/Stack";
import Alert from "../components/Alert";
import Input from "../components/Input";
import Button from "../components/Button";

const DataWrapper: React.FC = () => {
  const { listId } = useParams<{ listId: string }>();

  const [shoppingList, shoppingListLoading, shoppingListError] =
    useDocumentDataOnce<ShoppingList>(
      firestoreCompat.doc(
        `shoppingLists/${listId}`
      ) as unknown as DocumentReference<ShoppingList>,
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
  const [error, setError] = React.useState<Error>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      setError(new Error("Invalid user"));

      return;
    }

    firestoreCompat
      .collection("shoppingLists")
      .doc(shoppingList.id)
      .update({
        title,
        updatedAt: new Date(),
        updatedBy: user.uid,
      })
      .then(() => history.push(`/lists/${shoppingList.id}`))
      .catch((error: Error) => setError(error));
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

export default DataWrapper;
