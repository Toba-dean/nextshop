import { useRouter } from "next/router";

import { LayOut } from "../components";

export default function Shipping() {

  const router = useRouter();
  router.push("/login");

  return (
    <LayOut>

    </LayOut>
  )
}
