import React, { memo } from 'react';
import { ListItem, makeStyles } from '@material-ui/core';

export interface Props {
  message: string
}

const useNoMessagesStyle = makeStyles({
  noMessageContainer: {
    listStyleType: "none",
  },
  noMessage: {
    color: "gray",
    textAlign: "center",
    lineHeight: "100px",
    margin: "0 auto",
  },
});

const NoMessages = (props: Props) => {
  const { message } = props;

  const noMessagesStyle = useNoMessagesStyle();

  return (
    <ListItem className={noMessagesStyle.noMessageContainer}>
      <p className={noMessagesStyle.noMessage}>{message}</p>
    </ListItem>
  )
};

export default memo(NoMessages);
