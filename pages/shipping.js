import { useRouter } from "next/router";
import { useContext } from "react";

import { LayOut } from "../components";
import { Store } from "../utils/store";

export default function Shipping() {

  const router = useRouter();
  const { state: { currentUser } } = useContext(Store);

  if (!currentUser) {
    router.push("/login?redirect=/shipping");
  }

  return (
    <LayOut>
      Shipping
    </LayOut>
  )
}
