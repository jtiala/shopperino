import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import { auth, firestore } from "../firebase";
import { ShoppingList } from "../interfaces/ShoppingList";
import { SubscribedShoppingList } from "../interfaces/SubscribedShoppingList";

import Page from "../components/Page";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Text from "../components/Text";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";

const DataWrapper: React.FC = () => {
  const [user] = useAuthState(auth);

  const [
    shoppingLists,
    shoppingListsLoading,
    shoppingListsError,
  ] = useCollectionDataOnce<ShoppingList>(
    firestore.collection("shoppingLists").where("createdBy", "==", user?.uid),
    { idField: "id" }
  );

  const [
    subscribedShoppingLists,
    subscribedShoppingListsLoading,
    subscribedShoppingListsError,
  ] = useCollectionDataOnce<SubscribedShoppingList>(
    firestore
      .collection("users")
      .doc(user?.uid)
      .collection("subscribedShoppingLists"),
    { idField: "id" }
  );

  if (shoppingListsLoading || subscribedShoppingListsLoading) {
    return <LoadingPage />;
  }

  if (
    !user ||
    !shoppingLists ||
    !subscribedShoppingLists ||
    shoppingListsError ||
    subscribedShoppingListsError
  ) {
    return (
      <ErrorPage
        message={
          shoppingListsError?.message || subscribedShoppingListsError?.message
        }
      />
    );
  }

  return (
    <InvitationView
      shoppingLists={shoppingLists}
      subscribedShoppingLists={subscribedShoppingLists}
    />
  );
};

interface Props {
  shoppingLists: ShoppingList[];
  subscribedShoppingLists: SubscribedShoppingList[];
}

const InvitationView: React.FC<Props> = ({
  shoppingLists,
  subscribedShoppingLists,
}) => {
  const { listId, invitationKey } = useParams();
  const history = useHistory();
  const [error, setError] = useState<Error>();
  const [user] = useAuthState(auth);

  const acceptInvitation = () => {
    if (!user) {
      setError(new Error("Invalid user"));

      return;
    }

    firestore
      .collection("shoppingLists")
      .doc(listId)
      .collection("collaborators")
      .doc(user.uid)
      .set({
        invitationKey,
        acceptedAt: new Date(),
      })
      .then(() => {
        firestore
          .collection("users")
          .doc(user.uid)
          .collection("subscribedShoppingLists")
          .doc(listId)
          .set({
            shoppingList: firestore.collection("shoppingLists").doc(listId),
          })
          .then(() => history.push(`/lists/${listId}`))
          .catch((error: Error) => setError(error));
      })
      .catch((error: Error) => setError(error));
  };

  const isOwnList =
    shoppingLists.find((list) => list.id === listId) !== undefined;
  const hasAlreadySubscribed =
    subscribedShoppingLists.find((list) => list.id === listId) !== undefined;

  return (
    <Page title="Collaboration invitation">
      <Text>You have been invited to collaborate on a shopping list.</Text>
      {isOwnList ? (
        <Alert variant="success" title="This shopping lists is made by you">
          {<Link to={`/lists/${listId}`}>Check it out!</Link>}
        </Alert>
      ) : hasAlreadySubscribed ? (
        <Alert
          variant="success"
          title="You have already subscribed to the list"
        >
          {<Link to={`/lists/${listId}`}>Check it out!</Link>}
        </Alert>
      ) : (
        <Button variant="primary" onClick={() => acceptInvitation()}>
          Accept the invitation!
        </Button>
      )}

      {error && (
        <Alert variant="error" title="Error">
          {error.message}
        </Alert>
      )}
    </Page>
  );
};

export default DataWrapper;
