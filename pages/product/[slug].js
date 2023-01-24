import { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { Button, Card, Grid, Link, List, ListItem, Typography } from "@material-ui/core";

import { LayOut } from "../../components";
import { useStyles } from "../../utils/styles";
import db from "../../utils/db";
import { Product } from "../../model/products";
import { Store } from "../../utils/store";

const SingleProduct = ({ product }) => {

  const classes = useStyles();
  const { state, dispatch } = useContext(Store);

  const handleCart = async () => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry, Product is out of stock.")
    }
    dispatch({
      type: "ADD_CART_ITEM",
      payload: {
        ...product, quantity: 1
      }
    })
  }

  return product ? (
    <LayOut title={product.name} desc={product.desc}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>

      <Grid container spacing={1}>
        <Grid item md={6}>
          <Image
            src={product.image}
            alt={product.name}
            width={570}
            height={570}
            layout="responsive"
          />
        </Grid>

        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">{product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} star ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Description: {product.description}
              </Typography>
            </ListItem>
          </List>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography>{product.countInStock ? "In Stock" : "Out of Stock"}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleCart}
                >
                  add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </LayOut>
  ) : (
    <h1 align="center">No Product Found!!</h1>
  )
}

export default SingleProduct

export async function getServerSideProps({ params }) {
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product)
    }
  }
}