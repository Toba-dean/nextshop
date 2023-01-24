import { Grid } from "@material-ui/core";

import { LayOut, ProductCard } from "../components";
import { Product } from "../model/products";
import db from "../utils/db";

export default function Home({ products }) {
  return (
    <LayOut>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {
            products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))
          }
        </Grid>
      </div>
    </LayOut>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}