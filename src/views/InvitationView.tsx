import React, { useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import { auth, firestore } from "../firebase";
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

  if (subscribedShoppingListsLoading) {
    return <LoadingPage />;
  }

  if (!user || !subscribedShoppingLists || subscribedShoppingListsError) {
    return <ErrorPage message={subscribedShoppingListsError?.message} />;
  }

  return <InvitationView subscribedShoppingLists={subscribedShoppingLists} />;
};

interface Props {
  subscribedShoppingLists: SubscribedShoppingList[];
}

const InvitationView: React.FC<Props> = ({ subscribedShoppingLists }) => {
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

  const foundList = subscribedShoppingLists.find((list) => list.id === listId);

  return (
    <Page title="Collaboration invitation">
      <Text>You have been invited to collaborate on a shopping list.</Text>
      {foundList ? (
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
