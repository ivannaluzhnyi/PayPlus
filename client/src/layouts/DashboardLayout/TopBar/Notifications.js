import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  IconButton,
  List,
  ListItem,
  Popover,
  SvgIcon,
  Tooltip,
  Typography,
  makeStyles,
  Badge,
  ListItemText
} from '@material-ui/core';
import axios from 'src/utils/axios';
import {
  Bell as BellIcon,
  Package as PackageIcon,
  MessageCircle as MessageIcon,
  Truck as TruckIcon
} from 'react-feather';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Label from 'src/components/Label';
import { labelColorsUserStatus, MERCURE_TOPICS } from 'src/constants';
import useMercureSubscriber from 'src/hooks/useMercureSubscriber';

const iconsMap = {
  order_placed: PackageIcon,
  new_message: MessageIcon,
  item_shipped: TruckIcon
};

const useStyles = makeStyles(theme => ({
  popover: {
    width: 320
  },
  icon: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const Notifications = () => {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [merchants, setMerchants] = useState([]);

  useMercureSubscriber({
    topic: MERCURE_TOPICS.NOTIFICATIONS.PENDING_MERCHANT,
    callback: passedData => {

      if (passedData !== null) {
        setMerchants([passedData]);
      }
    }
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge badgeContent={merchants.length || 0} color="error">
        <Tooltip title="Notifications">
          <IconButton color="inherit" ref={ref} onClick={handleOpen}>
            <SvgIcon>
              <BellIcon />
            </SvgIcon>
          </IconButton>
        </Tooltip>
      </Badge>

      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        classes={{ paper: classes.popover }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2}>
          <Typography variant="h5" color="textPrimary">
            Marchands à valider
          </Typography>
        </Box>
        {merchants.length === 0 ? (
          <Box p={2}>
            <Typography variant="h6" color="textPrimary">
              Il n'y a pas de notifications
            </Typography>
          </Box>
        ) : (
          <>
            <List className={classes.list} disablePadding>
              {merchants.map(merchant => {
                return (
                  <ListItem
                    className={classes.listItem}
                    component={RouterLink}
                    divider
                    key={merchant.id || 1}
                    to={`/app/management/merchants/${merchant.id}`}
                    onClick={() => {
                      setMerchants([]);
                    }}
                  >
                    <ListItemText
                      primary={merchant.name}
                      primaryTypographyProps={{
                        variant: 'subtitle2',
                        color: 'textPrimary'
                      }}
                    />

                    <Label color={labelColorsUserStatus[merchant.state]}>
                      {merchant.state}
                    </Label>
                  </ListItem>
                );
              })}
            </List>
          </>
        )}
      </Popover>
    </>
  );
};

export default Notifications;
