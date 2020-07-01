import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';
import {
  makeStyles,
  Card,
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Checkbox,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Typography,
  Link,
  IconButton,
  TablePagination
} from '@material-ui/core';
import {
  Edit as EditIcon,
  ArrowRight as ArrowRightIcon,
  Search as SearchIcon
} from 'react-feather';
import getInitials from 'src/utils/getInitials';
import { labelColorsUserRole } from 'src/constants';
import Label from 'src/components/Label';

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Dernière mise à jour (les plus récentes en premier)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Dernière mise à jour (la plus ancienne en premier)'
  },
  {
    value: 'createdAt|desc',
    label: 'Dernière création (les plus récentes en premier)'
  },
  {
    value: 'createdAt|asc',
    label: 'Dernière création (la plus ancienne en premier)'
  }
];

function applyFilters(users, query, filters) {
  return users.filter(user => {
    let matches = true;

    if (query) {
      const properties = [
        'email',
        'first_name',
        'last_name',
        'phone',
        'createdAt',
        'updatedAt'
      ];
      let containsQuery = false;

      properties.forEach(property => {
        if (user[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach(key => {
      const value = filters[key];

      if (value && user[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(users, page, limit) {
  return users.slice(page * limit, page * limit + limit);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySort(customers, sort) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    // eslint-disable-next-line no-shadow
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {},
  queryField: {
    width: 500
  },
  bulkOperations: {
    position: 'relative'
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default
  },
  bulkAction: {
    marginLeft: theme.spacing(2)
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  }
}));

const Results = ({ users }) => {
  const classes = useStyles();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    isProspect: null,
    isReturning: null,
    acceptsMarketing: null
  });

  const handleQueryChange = event => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = event => {
    event.persist();
    setSort(event.target.value);
  };

  const handleSelectAllUsers = event => {
    setSelectedUsers(event.target.checked ? users.map(user => user.id) : []);
  };

  const handleSelectOneUsers = (event, userId) => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers(prevSelected => [...prevSelected, userId]);
    } else {
      setSelectedUsers(prevSelected =>
        prevSelected.filter(id => id !== userId)
      );
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const filteredUsers = applyFilters(users, query, filters);
  const sortedUsers = applySort(filteredUsers, sort);
  const paginatedUsers = applyPagination(sortedUsers, page, limit);
  const enableBulkOperations = selectedUsers.length > 0;
  const selectedSomeUsers =
    selectedUsers.length > 0 && selectedUsers.length < users.length;
  const selectedAllUsers = selectedUsers.length === users.length;

  return (
    <Card className={classes.root}>
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Rechercher des utilisateurs"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <TextField
          label="Trier par"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllUsers}
              indeterminate={selectedSomeUsers}
              onChange={handleSelectAllUsers}
            />
            <Button variant="outlined" className={classes.bulkAction}>
              Delete
            </Button>
            <Button variant="outlined" className={classes.bulkAction}>
              Edit
            </Button>
          </div>
        </div>
      )}
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllUsers}
                    indeterminate={selectedSomeUsers}
                    onChange={handleSelectAllUsers}
                  />
                </TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Créé</TableCell>
                <TableCell>Modifié</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map(user => {
                const isUserSelected = selectedUsers.includes(user.id);

                return (
                  <TableRow hover key={user.id} selected={isUserSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isUserSelected}
                        onChange={event => handleSelectOneUsers(event, user.id)}
                        value={isUserSelected}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar className={classes.avatar} src={user.avatar}>
                          {getInitials(`${user.first_name} ${user.last_name}`)}
                        </Avatar>
                        <div>
                          <Link
                            color="inherit"
                            component={RouterLink}
                            to={`/app/management/users/${user.id}`}
                            variant="h6"
                          >
                            {user.first_name} {user.last_name}
                          </Link>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Label color={labelColorsUserRole[user.role]}>
                        {user.role}
                      </Label>
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>

                    <TableCell>
                      {moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell>
                      {moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/users/${user.id}/edit`}
                      >
                        <SvgIcon fontSize="small">
                          <EditIcon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        to={`/app/management/users/${user.id}`}
                      >
                        <SvgIcon fontSize="small">
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  users: PropTypes.array
};

Results.defaultProps = {
  users: []
};

export default Results;
