import {
  Button, Grid, Link, List, ListItem, MenuItem, Select, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Typography, Table,
  Card
} from "@material-ui/core";
import { useContext } from "react";
import NextLink from "next/link";

import { LayOut } from "../components";
import { Store } from "../utils/store";
import Image from "next/image";

export default function Cart() {

  const { state: { cart: { cartItems } }, dispatch } = useContext(Store);

  return (
    <LayOut title="Shopping Cart">
      <Typography component="h1" variant="h1">Shopping Cart</Typography>

      {
        cartItems.length === 0 ? (
          <div>
            Cart is Empty.
            <NextLink href="/">Go Home</NextLink>
          </div>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      cartItems.map(item => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                />
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell align="right">
                            <Select value={item.quantity}>
                              {
                                [...Array(item.countInStock).keys()].map(ele => (
                                  <MenuItem key={ele + 1} value={ele + 1}>
                                    {ele + 1}
                                  </MenuItem>
                                ))
                              }
                            </Select>
                          </TableCell>

                          <TableCell align="right">
                            ${item.price}
                          </TableCell>

                          <TableCell align="right">
                            <Button variant="contained" color="secondary">x</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography component="h2">
                      Subtotal ({
                        cartItems.reduce((a, c) => a + c.quantity, 0)
                      } {" "} item(s)) : ${cartItems.reduce((a, c) =>
                        a + c.quantity * c.price, 0)}
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Check Out
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )
      }
    </LayOut>
  )
}