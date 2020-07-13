import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";

import Page from "../components/Page";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Alert from "../components/Alert";
import ButtonLink from "../components/ButtonLink";

const DataWrapper: React.FC = () => {
  const [user] = useAuthState(auth);

  const [
    shoppingLists,
    shoppingListsLoading,
    shoppingListsError,
  ] = useCollectionData<ShoppingList>(
    firestore
      .collection("shoppingLists")
      .where(`roles.${user?.uid}`, "==", "owner"),
    { idField: "id" }
  );

  if (shoppingListsLoading) {
    return <LoadingPage />;
  }

  if (!user || !shoppingLists || shoppingListsError) {
    return <ErrorPage message={shoppingListsError?.message} />;
  }

  return <ShoppingListsView shoppingLists={shoppingLists} />;
};

interface Props {
  shoppingLists: ShoppingList[];
}

const ShoppingListsView: React.FC<Props> = ({ shoppingLists }) => (
  <Page title="Your shopping lists">
    {shoppingLists.length < 1 ? (
      <Alert variant="warning" message="No shopping lists!" />
    ) : (
      <ul>
        {shoppingLists.map((shoppingList) => (
          <li key={shoppingList.id} className="list-disc list-inside">
            <Link to={`/lists/${shoppingList.id}`}>{shoppingList.title}</Link>
          </li>
        ))}
      </ul>
    )}
    <ButtonLink to="/lists/create" variant="primary">
      Create a shopping list
    </ButtonLink>
  </Page>
);

export default DataWrapper;
