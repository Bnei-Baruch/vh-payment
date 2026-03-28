import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMembershipProduct } from "../services/productservice";
import { setMembershipProduct } from "../redux/actions/orderActions";

const dedupedFetch = (fn) => {
  const inFlight = new Map();
  return (kc_id) => {
    if (!inFlight.has(kc_id)) {
      const promise = fn(kc_id).finally(() => inFlight.delete(kc_id));
      inFlight.set(kc_id, promise);
    }
    return inFlight.get(kc_id);
  };
};

const fetchMembershipProduct = dedupedFetch(getMembershipProduct);

export function useMembershipProduct() {
  const dispatch = useDispatch();
  const keycloakSubject = useSelector((state) => state.user.keycloak?.subject);
  const membershipProduct = useSelector((state) => state.order.membershipProduct);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (keycloakSubject && !membershipProduct && !error) {
      fetchMembershipProduct(keycloakSubject).then((result) => {
        if (result) dispatch(setMembershipProduct(result));
        else setError(true);
      });
    }
  }, [keycloakSubject, membershipProduct, error, dispatch]);

  return { membershipProduct, error };
}
