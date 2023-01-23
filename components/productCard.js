import {
  Button, Card, CardActionArea, CardActions,
  CardContent, CardMedia, Grid, Typography
} from "@material-ui/core";

const ProductCard = ({ product }) => {
  return (
    <Grid item md={4}>
      <Card>
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