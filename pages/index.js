import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";

import LayOut from "../components/layout";
import { data } from "../data";

export default function Home() {
  return (
    <LayOut>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {
            data.products.map((product, idx) => (
              <Grid item md={4} key={idx}>
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
            ))
          }
        </Grid>
      </div>
    </LayOut>
  )
}
