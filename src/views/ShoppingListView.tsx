import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  useDocumentDataOnce,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";
import { ShoppingListItem } from "../interfaces/ShoppingListItem";

import Page from "../components/Page";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Alert from "../components/Alert";
import ItemList from "../components/ItemList";
import AddItem from "../components/AddItem";
import ButtonLink from "../components/ButtonLink";
import Divider from "../components/Divider";
import Stack from "../components/Stack";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Text from "../components/Text";

const DataWrapper: React.FC = () => {
  const { listId } = useParams();
  const [user] = useAuthState(auth);

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

  const [items, itemsLoading, itemsError] = useCollectionData<ShoppingListItem>(
    firestore.doc(`shoppingLists/${listId}`).collection("items"),
    { idField: "id" }
  );

  if (shoppingListLoading || itemsLoading) {
    return <LoadingPage />;
  }

  if (!user || !shoppingList || !items || shoppingListError || itemsError) {
    return (
      <ErrorPage message={shoppingListError?.message || itemsError?.message} />
    );
  }

  return <ShoppingListView shoppingList={shoppingList} items={items} />;
};

interface Props {
  shoppingList: ShoppingList;
  items: ShoppingListItem[];
}

const ShoppingListView: React.FC<Props> = ({ shoppingList, items }) => {
  const [user] = useAuthState(auth);
  const history = useHistory();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(false);
  const isCollaborativeList = shoppingList.type === "collaborative";
  const isOwnList = shoppingList.createdBy === user?.uid;

  if (loading) {
    return <LoadingPage />;
  }

  const deleteList = () => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      setLoading(true);

      items.forEach((item) =>
        firestore
          .collection("shoppingLists")
          .doc(shoppingList.id)
          .collection("items")
          .doc(item.id)
          .delete()
          .catch((error: Error) => {
            setError(error);
            setLoading(false);
          })
      );

      firestore
        .collection("shoppingLists")
        .doc(shoppingList.id)
        .delete()
        .then((doc: any) => history.push("/"))
        .catch((error: Error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  const unsubscribeList = () => {
    const confirmed = window.confirm("Are you sure?");

    if (!user) {
      setError(new Error("Invalid user"));

      return;
    }

    if (confirmed) {
      setLoading(true);

      firestore
        .collection("users")
        .doc(user.uid)
        .collection("subscribedShoppingLists")
        .doc(shoppingList.id)
        .delete()
        .then(() => {
          firestore
            .collection("shoppingLists")
            .doc(shoppingList.id)
            .collection("collaborators")
            .doc(user.uid)
            .delete()
            .then(() => history.push("/"))
            .catch((error: Error) => {
              setError(error);
              setLoading(false);
            });
        })
        .catch((error: Error) => {
          setError(error);
          setLoading(false);
        });
    }
  };

  return (
    <Page title={shoppingList.title}>
      {shoppingList.type === "collaborative" && (
        <Badge variant="primary">Collaborative shopping list</Badge>
      )}
      <AddItem shoppingList={shoppingList} />
      {items.length < 1 ? (
        <Alert variant="warning" title="No items!" />
      ) : (
        <ItemList shoppingList={shoppingList} items={items} />
      )}
      <Divider />
      <Stack>
        <Stack dir="row" gap={2}>
          {isOwnList ? (
            <>
              <ButtonLink to={`/lists/${shoppingList.id}/edit`} size="small">
                Edit shopping list details
              </ButtonLink>
              <Button
                onClick={() => deleteList()}
                size="small"
                variant="danger"
              >
                Delete shopping list
              </Button>
            </>
          ) : (
            <Button
              onClick={() => unsubscribeList()}
              size="small"
              variant="danger"
            >
              Unsubscribe
            </Button>
          )}
        </Stack>

        {isCollaborativeList && (
          <Stack gap={2}>
            <Text>Invite collaborators using this link</Text>
            <Text
              as="code"
              className="p-2 border border-gray-200 bg-gray-100"
            >{`${window.location.origin}/invite/${shoppingList.id}/${shoppingList.invitationKey}`}</Text>
          </Stack>
        )}
      </Stack>
      {error && (
        <Alert variant="error" title="Error">
          {error.message}
        </Alert>
      )}
    </Page>
  );
};

export default DataWrapper;
