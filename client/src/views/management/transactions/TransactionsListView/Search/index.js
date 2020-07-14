/* eslint-disable react/prop-types */
import React, { useEffect, useCallback, useState } from 'react';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import clsx from 'clsx';
import {
  Box,
  Chip,
  Divider,
  Card,
  Input,
  makeStyles,
  Button,
  MenuItem,
  FormControl
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import { OPERATIONS_STATE, OPERATIONS_TYPE } from 'src/constants';
import InputLabel from '@material-ui/core/InputLabel';
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
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

const Search = ({ getTransactions, setMerchant }) => {
  const isMountedRef = useIsMountedRef();
  const [merchants, setMerchants] = useState(null);

  const [optionsFilter, setOptionsFilter] = useState({});

  const classes = useStyles();
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const [selectOptions, setOptions] = useState([]);

  const handleSetOptions = opt => {
    setOptionsFilter({
      ...optionsFilter,
      [opt.name]: opt.value
    });
  };

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
  }, [isMountedRef, selectOptions]);

  useEffect(() => {
    getMerchant();
  }, [getMerchant]);

  const handleCall = () => {
    const IDs = chips.reduce((acc, curr) => {
      const merchant = merchants.find(mrc => mrc.name === curr);

      return merchant ? [...acc, merchant.id] : acc;
    }, []);

    getTransactions({ merchantsId: IDs });
  };

  return (
    <Card className={clsx(classes.root)}>
      <Box p={2} display="flex" alignItems="center">
        <SearchIcon />
        <Input
          disableUnderline
          className={classes.searchInput}
          onChange={handleInputChange}
          onKeyUp={handleInputKeyup}
          placeholder="Enter a keyword"
          value={inputValue}
          dis
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="status-operation-select-label">
            Status d'opération
          </InputLabel>
          <Select
            labelId="status-operation-select-label"
            id="status-operation-select"
            value={optionsFilter.operation_status || ''}
            autoWidth
            name="operation_status"
            onChange={e => {
              handleSetOptions(e.target);
            }}
          >
            {Object.keys(OPERATIONS_STATE).map(k => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="type-operation-select-label">
            Type d'opération
          </InputLabel>
          <Select
            labelId="type-operation-select-label"
            id="type-operation-select"
            value={optionsFilter.operation_type || ''}
            autoWidth
            name="operation_type"
            onChange={e => {
              handleSetOptions(e.target);
            }}
          >
            {Object.keys(OPERATIONS_TYPE).map(k => (
              <MenuItem key={k} value={k}>
                {k}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          disabled={
            chips.length === 0 && Object.keys(optionsFilter).length === 0
          }
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
