/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import {
  labelColorsOperationState,
  labelColorsOperationType,
  labelColorsProductState,
  OPERATIONS_STATE
} from 'src/constants';
import Label from 'src/components/Label';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

function compareOpeartion(a, b) {
  if (a.createdAt > b.createdAt) {
    return -1;
  }
  if (a.createdAt < b.createdAt) {
    return 1;
  }
  return 0;
}

const Row = props => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.order_amount}</TableCell>
        <TableCell>
          {row.client_first_name} {row.client_last_name}
        </TableCell>
        <TableCell>{row.delivery_address}</TableCell>
        <TableCell>
          {row.delivery_city} {row.delivery_zip_code}
        </TableCell>
        <TableCell>{row.delivery_country}</TableCell>
        <TableCell align="right">
          {moment(
            row.operations.find(op => op.state === OPERATIONS_STATE.CREATED)
              .createdAt
          ).format('DD/MM/YYYY HH:mm:ss')}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 15 }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Opération
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>State</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.operations
                    .sort(compareOpeartion)
                    .map((operationRow, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Label
                            color={
                              labelColorsOperationState[operationRow.state]
                            }
                          >
                            {console.log('operationRow => ', operationRow)}
                            {operationRow.state}
                          </Label>
                        </TableCell>

                        <TableCell>
                          {operationRow.type && (
                            <Label
                              color={
                                labelColorsOperationType[operationRow.type]
                              }
                            >
                              {operationRow.type}
                            </Label>
                          )}
                        </TableCell>

                        <TableCell align="right">
                          {moment(operationRow.createdAt).format(
                            'DD/MM/YYYY HH:mm:ss'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>

            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Produits
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Quantité</TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Montant Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((productRow, productIdx) => (
                    <TableRow key={productIdx}>
                      <TableCell>{productRow.qte}</TableCell>
                      <TableCell>{productRow.product.name}</TableCell>
                      <TableCell>{productRow.product.description}</TableCell>

                      <TableCell>
                        <Label
                          color={
                            labelColorsProductState[productRow.product.states]
                          }
                        >
                          {productRow.product.states}
                        </Label>
                      </TableCell>
                      <TableCell>{productRow.product.price_symbol}</TableCell>
                      <TableCell>
                        {parseFloat(productRow.product.price) *
                          Number(productRow.qte)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const Results = ({ transactions }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          <TableCell>ID</TableCell>
          <TableCell>Montant de la commande</TableCell>
          <TableCell>Nom du client</TableCell>
          <TableCell>Adresse de livraison</TableCell>
          <TableCell>Ville</TableCell>
          <TableCell>Pays</TableCell>
          <TableCell align="right">Creation</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.reverse().map((row, idx) => (
          <Row key={idx} row={row} />
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

Results.propTypes = {
  transactions: PropTypes.array
};

Results.defaultProps = {
  transactions: []
};

export default Results;
