import { useRouter } from "next/router";
import NextLink from "next/link";
import Image from "next/image";

import { LayOut } from "../../components";
import { data } from "../../utils/data";
import { Button, Card, Grid, Link, List, ListItem, Typography } from "@material-ui/core";
import { useStyles } from "../../utils/styles";

const SingleProduct = () => {

  const classes = useStyles();
  const { query: { slug } } = useRouter();
  const product = data.products.find(item => item.slug === slug);

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