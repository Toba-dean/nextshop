import {
  Button, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Grid, Typography
} from "@material-ui/core";
import NextLink from "next/link";

const ProductCard = ({ product }) => {
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

          <Button size="small" color="primary">
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProductCard