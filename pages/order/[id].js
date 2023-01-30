import {
  Button, Grid, Link, List, ListItem, TableBody, Card, Table, TableCell,
  TableContainer, TableHead, TableRow, Typography, CircularProgress
} from "@material-ui/core";
import { useContext, useEffect, useReducer } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import axios from "axios";
import Cookies from "js-cookie";

import { LayOut, CheckOutWizard } from "../../components";
import { Store } from "../../utils/store";
import { useStyles } from "../../utils/styles";
import { getError } from "../../utils/error";


function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: '',
      };
    default:
      state;
  }
}

export default function Order({ params }) {

  const { state: { currentUser } } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const orderId = params.id;
  const [{ order, loading, error }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: ""
  });

  const {
    shippingAddress, paymentMethod, orderItems, itemsPrice,
    taxPrice, shippingPrice, totalPrice, isPaid, paidAt,
    isDelivered, deliveredAt,
  } = order;

  useEffect(() => {
    if (!currentUser) {
      return router.push('/login');
    }

    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${currentUser.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order]);

  return (
    <LayOut title={`Order ${orderId}`}>
      <CheckOutWizard activeStep={3} />

      <Typography component="h1" variant="h1">Order {orderId}</Typography>

      {
        loading ? (
          <CircularProgress />
        ) : (
          error
        ) ? (
          <Typography className={classes.error}>{error}</Typography>
        ) : (
          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">Shipping Address</Typography>
                  </ListItem>

                  <ListItem>
                    {shippingAddress.fullName}, {shippingAddress.address},{' '}
                    {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                    {shippingAddress.country}
                  </ListItem>

                  <ListItem>
                    Status:  {isDelivered ? `delivered at ${deliveredAt}` : "not delivered"}
                  </ListItem>
                </List>
              </Card>

              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">Payment Method</Typography>
                  </ListItem>

                  <ListItem>
                    {paymentMethod}
                  </ListItem>

                  <ListItem>
                    Status:  {isPaid ? `paid at ${paidAt}` : "not paid"}
                  </ListItem>
                </List>
              </Card>

              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2" variant="h2">Order Items</Typography>
                  </ListItem>

                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Price</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {
                            orderItems.map(item => (
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
                                  <Typography>{item.quantity}</Typography>
                                </TableCell>

                                <TableCell align="right">
                                  <Typography>${item.price}</Typography>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                </List>

              </Card>
            </Grid>

            <Grid item md={3} xs={12}>
              <Card className={classes.section}>
                <List>
                  <ListItem>
                    <Typography component="h2">
                      Order Summary
                    </Typography>
                  </ListItem>

                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Items:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">${itemsPrice}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Tax:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">${taxPrice}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Shipping:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">${shippingPrice}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>

                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>
                          <strong>Total:</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          <strong>${totalPrice}</strong>
                        </Typography>
                      </Grid>
                    </Grid>
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

export async function getServerSideProps({ params }) {
  return { props: { params } };
}