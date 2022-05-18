import { List, makeStyles } from "@material-ui/core";
import React, { memo, useRef } from "react";
import { AppState } from "reducers";
import { Dispatch } from 'redux';
import { getMainMessagesList } from "selectors/mainSelector";
import _ from 'lodash';
import { mainActions } from "actions";
import { connect } from "react-redux";
import { db, getMessages } from "services/firebase";
import { Message, MessagesList } from '../../../types';
import ChatMessage from "../chatMessage/ChatMessage";
import NoMessages from "../noMessages/NoMessages";

export interface Props {
  messages: MessagesList
  getMessagesList: Function
};

const mapStateToProps = (state: AppState) => ({
  messages: getMainMessagesList(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getMessagesList: (setMessages: Function) => dispatch(mainActions.mainMessagesListFetch(setMessages)),
});

const useMessageListStyles = makeStyles({
  root: {
    minWidth: "320px",
    maxWidth: "900px",
    maxHeight: "100vh",
    height: "100vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },        
  messagesList: {
    width: "100%",
    height: "100%",
    padding: "14px !important",
    overflow: "auto",
    margin: "0",
    boxSizing: "border-box",
    background: "#f7fafc",
  },
});

const MessagesList = (props: Props) => {
  const { getMessagesList } = props;

  const [messages, setMessages] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const isMessagesEmpty = messages !== null && !messages.length;

  const latestMessage = useRef<HTMLLIElement>(null);

  const setMessageRef = (message: Message) => {
    if (_.isEqual(message, _.last(messages))) {
      return latestMessage;
    }
  }

  const scrollToLatestMessage = () => {
    latestMessage.current.scrollIntoView(false);
  };

  const messageListStyles = useMessageListStyles();

  React.useEffect(() => {
    getMessagesList(setMessages);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    if (db) getMessages(setMessages);
  }, [db]);

  React.useEffect(() => {
    if (!_.isEmpty(messages)) {
      scrollToLatestMessage();
    }
  }, [messages]);

  return (
    <List className={messageListStyles.messagesList}>
      {
        isLoading && <NoMessages message="Загрузка..." />
      }
      {
        !isLoading && isMessagesEmpty
          ? <NoMessages message="Нет сообщений" />
          : messages.map((message: Message) => <ChatMessage message={message} setMessageRef={setMessageRef} />)
      }
    </List>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MessagesList));
