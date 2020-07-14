import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

import { auth, firestore, FieldPath } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";
import { SubscribedShoppingList } from "../interfaces/SubscribedShoppingList";

import Page from "../components/Page";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import Alert from "../components/Alert";
import ButtonLink from "../components/ButtonLink";
import Badge from "../components/Badge";

const WithSubscribedShoppingLists: React.FC = () => {
  const [user] = useAuthState(auth);

  const [
    subscribedShoppingLists,
    subscribedShoppingListsLoading,
    subscribedShoppingListsError,
  ] = useCollectionData<SubscribedShoppingList>(
    firestore
      .collection("users")
      .doc(user?.uid)
      .collection("subscribedShoppingLists"),
    { idField: "id" }
  );

  if (subscribedShoppingListsLoading) {
    return <LoadingPage />;
  }

  if (!user || !subscribedShoppingLists || subscribedShoppingListsError) {
    return <ErrorPage message={subscribedShoppingListsError?.message} />;
  }

  if (subscribedShoppingLists.length > 0) {
    return (
      <WithPopulatedSubscribedShoppingLists
        subscribedShoppingLists={subscribedShoppingLists}
      />
    );
  }

  return <WithShoppingLists shoppingLists={[]} />;
};

const WithPopulatedSubscribedShoppingLists: React.FC<{
  subscribedShoppingLists: SubscribedShoppingList[];
}> = ({ subscribedShoppingLists }) => {
  const [user] = useAuthState(auth);

  const [
    shoppingLists,
    shoppingListsLoading,
    shoppingListsError,
  ] = useCollectionData<ShoppingList>(
    firestore.collection("shoppingLists").where(
      FieldPath.documentId(),
      "in",
      subscribedShoppingLists.map((list) => list.id)
    ),
    { idField: "id" }
  );

  if (shoppingListsLoading) {
    return <LoadingPage />;
  }

  if (!user || !shoppingLists || shoppingListsError) {
    return <ErrorPage message={shoppingListsError?.message} />;
  }

  return <WithShoppingLists shoppingLists={shoppingLists} />;
};

const WithShoppingLists: React.FC<{
  shoppingLists: ShoppingList[];
}> = ({ shoppingLists: initialShoppingLists }) => {
  const [user] = useAuthState(auth);

  const [
    shoppingLists,
    shoppingListsLoading,
    shoppingListsError,
  ] = useCollectionData<ShoppingList>(
    firestore.collection("shoppingLists").where("createdBy", "==", user?.uid),
    { idField: "id" }
  );

  if (shoppingListsLoading) {
    return <LoadingPage />;
  }

  if (!user || !shoppingLists || shoppingListsError) {
    return <ErrorPage message={shoppingListsError?.message} />;
  }

  const allShoppingLists = [...shoppingLists, ...initialShoppingLists];

  allShoppingLists.sort((a, b) =>
    a.createdAt.toMillis() > b.createdAt.toMillis() ? -1 : 1
  );

  return <ShoppingListsView shoppingLists={allShoppingLists} />;
};

interface Props {
  shoppingLists: ShoppingList[];
}

const ShoppingListsView: React.FC<Props> = ({ shoppingLists }) => (
  <Page title="Your shopping lists">
    {shoppingLists.length < 1 ? (
      <Alert variant="warning" title="No shopping lists!" />
    ) : (
      <ul>
        {shoppingLists.map((shoppingList) => (
          <li key={shoppingList.id} className="list-disc list-inside mb-2">
            <Link to={`/lists/${shoppingList.id}`}>{shoppingList.title}</Link>
            {shoppingList.type === "collaborative" && (
              <>
                {" "}
                <Badge>Collaborative shopping list</Badge>
              </>
            )}
          </li>
        ))}
      </ul>
    )}
    <ButtonLink to="/lists/create" variant="primary">
      Create a shopping list
    </ButtonLink>
  </Page>
);

export default WithSubscribedShoppingLists;
