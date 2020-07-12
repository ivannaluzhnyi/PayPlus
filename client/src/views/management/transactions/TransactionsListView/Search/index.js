/* eslint-disable react/prop-types */
import React, { useEffect, useCallback, useState } from 'react';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Chip,
  Divider,
  Card,
  Input,
  makeStyles,
  Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MultiSelect from './MultiSelect';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2)
  },
  searchInput: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Search = ({ getTransactions, setMerchant }) => {
  const isMountedRef = useIsMountedRef();
  const [merchants, setMerchants] = useState(null);

  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const [selectOptions, setOptions] = useState([]);

  const handleInputChange = event => {
    event.persist();
    setInputValue(event.target.value);
  };

  const handleInputKeyup = event => {
    event.persist();

    if (event.keyCode === 13 && inputValue) {
      if (!chips.includes(inputValue)) {
        setChips(prevChips => [...prevChips, inputValue]);
        setInputValue('');
      }
    }
  };

  const handleChipDelete = chip => {
    setChips(prevChips => prevChips.filter(prevChip => chip !== prevChip));
  };

  const handleMultiSelectChange = value => {
    setChips(value);
  };

  const getMerchant = useCallback(() => {
    axios.get('/api/merchants/transactions').then(response => {
      if (isMountedRef.current) {
        setMerchants(response.data.merchants);

        setOptions([
          ...selectOptions,
          {
            label: 'Marchands',
            options: response.data.merchants.map(mrc => mrc.name)
          }
        ]);
      }
    });
  }, [isMountedRef]);

  useEffect(() => {
    getMerchant();
  }, [getMerchant]);

  const handleCall = () => {
    const IDs = chips.reduce((acc, curr) => {
      const merchant = merchants.find(mrc => mrc.name === curr);

      return merchant ? [...acc, merchant.id] : acc;
    }, []);

    getTransactions(IDs);
  };

  return (
    <Card className={clsx(classes.root)}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          fullWidth
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Enter a keyword"
          value={inputValue}
        />
      </Box>
      <Divider />
      <Box p={2} display="flex" alignItems="center" flexWrap="wrap">
        {chips.map(chip => (
          <Chip
            className={classes.chip}
            key={chip}
            label={chip}
            onDelete={() => handleChipDelete(chip)}
          />
        ))}
      </Box>
      <Divider />
      <Box display="flex" alignItems="center" flexWrap="wrap" p={1}>
        {selectOptions.map(option => (
          <MultiSelect
            key={option.label}
            label={option.label}
            onChange={handleMultiSelectChange}
            options={option.options}
            value={chips}
          />
        ))}
        <Box flexGrow={1} />
        <Button
          color="secondary"
          variant="contained"
          disabled={chips.length === 0}
          className={classes.action}
          onClick={handleCall}
        >
          Chercher les transactions
        </Button>
      </Box>
    </Card>
  );
};

export default Search;
