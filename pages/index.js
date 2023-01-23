import { Grid } from "@material-ui/core";

import { LayOut, ProductCard } from "../components";
import { data } from "../data";

export default function Home() {
  return (
    <LayOut>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {
            data.products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          }
        </Grid>
      </div>
    </LayOut>
  )
}
