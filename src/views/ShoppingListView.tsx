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

const DataWrapper: React.FC = () => {
  const { listId } = useParams();
  const [user] = useAuthState(auth);

  const [
    shoppingList,
    shoppingListLoading,
    shoppingListError,
  ] = useDocumentDataOnce<ShoppingList>(firestore.doc(`lists/${listId}`), {
    idField: "id",
  });

  const [items, itemsLoading, itemsError] = useCollectionData<ShoppingListItem>(
    firestore
      .collection("items")
      .where("uid", "==", user?.uid)
      .where("list", "==", firestore.collection("lists").doc(listId))
      .orderBy("timestamp", "desc"),
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
  const history = useHistory();
  const [error, setError] = useState("");

  const deleteList = () => {
    const confirmed = window.confirm("Are you sure?");

    if (confirmed) {
      items.forEach((item) =>
        firestore
          .collection("items")
          .doc(item.id)
          .delete()
          .catch((err: string) => {
            setError(err);
          })
      );

      firestore
        .collection("lists")
        .doc(shoppingList.id)
        .delete()
        .then((doc: any) => history.push("/"))
        .catch((err: string) => {
          setError(err);
        });
    }
  };

  return (
    <Page title={shoppingList.title}>
      <AddItem shoppingList={shoppingList} />
      {items.length < 1 ? (
        <Alert variant="warning" message="No items!" />
      ) : (
        <ItemList items={items} />
      )}
      <Divider />
      <Stack dir="row" gap={2}>
        <ButtonLink to={`/lists/${shoppingList.id}/edit`} size="small">
          Edit shopping list details
        </ButtonLink>
        <Button onClick={() => deleteList()} size="small" variant="danger">
          Delete shopping list
        </Button>
      </Stack>
      {error.length > 0 && <Alert title="Error" message={error} />}
    </Page>
  );
};

export default DataWrapper;
