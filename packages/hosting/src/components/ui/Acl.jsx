import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../providers";
import * as assert from "assert";

export const Acl = ({ children, name, redirect }) => {
  const navigate = useNavigate();

  const { authUser } = useAuthentication();

  assert(authUser, "Missing user");

  const [enabled, setEnabled] = useState(true);

  const navigateTo403 = () => {
    return navigate("/403");
  };

  const isValidateAclName = (name) =>
    (authUser?.acls || []).some((acl) => acl === name);

  useMemo(() => {
    if (!name) return;

    const isValidateAcl = isValidateAclName(name);

    redirect && !isValidateAcl && navigateTo403();

    setEnabled(isValidateAcl);
  }, [authUser]);

  return enabled ? <>{children}</> : <></>;
};
