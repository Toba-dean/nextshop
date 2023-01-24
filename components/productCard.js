import { useContext } from "react";
import {
  Button, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Grid, Typography
} from "@material-ui/core";
import NextLink from "next/link";
import axios from "axios";

import { Store } from "../utils/store";

const ProductCard = ({ product }) => {

  const { dispatch, state: { cart: { cartItems } } } = useContext(Store)

  const addToCart = async product => {
    const existItem = cartItems.find(item => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, Product is out of stock.")
    }

    dispatch({
      type: "ADD_CART_ITEM",
      payload: { ...product, quantity }
    })
  }

  return (
    <Grid item md={4}>
      <Card>
        <NextLink href={`/product/${product.slug}`} passHref>
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image}
              title={product.name}
            />

            <CardContent>
              <Typography>
                {product.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </NextLink>

        <CardActions>
          <Typography>
            ${product.price}
          </Typography>

          <Button
            size="small"
            color="primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductCard