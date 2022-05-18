import React, { memo } from 'react';
import { ListItem, Box, makeStyles } from '@material-ui/core';
import { Message } from 'types';

export interface Props {
  message: Message
  setMessageRef: Function
}

const useChatMessageStyle = makeStyles({
  messageItem: {
    listStyleType: "none",
    margin: "10px 0",
    padding: "0 !important",
  },
  messageSender: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4974ad",
  },
  messageText: {
    background: "#e1e8f0",
    padding: "8px",
    paddingRight: "32px",
    borderRadius: "4px",
    wordBreak: "break-all",
    width: "100%",
  },
  messageTime: {
    position: "absolute",
    right: "4px",
    bottom: "2px",
    fontSize: "12px",
    color: "#7b98ba",
  },
});

const ChatMessage = (props: Props) => {
  const { message, setMessageRef } = props;

  const chatMessageStyle = useChatMessageStyle();

  return (
    <ListItem className={chatMessageStyle.messageItem} ref={setMessageRef(message)}>
      <Box className={chatMessageStyle.messageText}>
          <Box className={chatMessageStyle.messageSender}>
              {message.sender}
          </Box>
          <Box>
            {message.text}
          </Box>
      </Box>
      <Box component="span" className={chatMessageStyle.messageTime}>
          {message.time}
      </Box>
    </ListItem>
  )
};

export default memo(ChatMessage);
