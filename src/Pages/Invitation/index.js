import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInvitation } from "../../Services/InvitationService";
import Register from "../Register/index";
import PageNotFound from "../PageNotFound";
import InvitationForm from "./InvitationForm";

const Invitation = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState(true);
  const [user, setUser] = useState(false);

  const [invi, setInvi] = useState();

  function invitation(id) {
    getInvitation(id)
      .then((response) => {
        setInvi(response.data);
        const expiration =
          Date.parse(new Date()) < Date.parse(response.data.dateExpiration) &&
          !response.data.expired;
        setExpiration(expiration);
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        setExpiration(false);
        console.log(err);
      });
  }

  useEffect(() => {
    invitation(id);
  }, []);
  function handleChange(newValue) {
    setUser(newValue);
  }
  return (
    <>
      {!loading && !expiration && (
        <>
          <PageNotFound />
        </>
      )}
      {user && (
        <>
          <Register invi={invi} />
        </>
      )}
      {!user && (
        <>
          <InvitationForm
            expiration={expiration}
            invi={invi}
            loading={loading}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
};

export default Invitation;
