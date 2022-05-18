import React, { memo } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { FormControl, Input, FormControlProps } from "@material-ui/core";
import { makeStyles } from '@mui/styles';
import { AppState } from "reducers";
import { getMainUsername } from "selectors/mainSelector";

import SendButton from "./SendButton";
import Username from "./Username";
import { styled } from "@material-ui/styles";
import { mainActions } from "actions";

export interface Props {
  username: string
  sendMessage: Function
}

const mapStateToProps = (state: AppState) => ({
  username: getMainUsername(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendMessage: (messageText: string) => dispatch(mainActions.mainSendMessage(messageText)),
});

const useMessageFormStyles = makeStyles({
  messageInput: {
    width: "100%",
    border: "none",
    background: "none",
    padding: "10px",
    outline: "none",
  },
});

const StyledForm = styled(FormControl)<FormControlProps>(({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  background: "#bfcdde",
  minHeight: "50px",
}));

const MessageForm = (props: Props) => {
  const { username, sendMessage } = props;

  const [messageText, setMessageText] = React.useState("");

  const messageFormStyles = useMessageFormStyles();

  const sendNewMessage = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (messageText) {
      sendMessage(messageText);
      setMessageText('');
    }
  };

  return (
    <StyledForm>
      <Username username={username} />
      <Input
        className={messageFormStyles.messageInput}
        value={messageText}
        onChange={(event) => {
          setMessageText(event.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            sendNewMessage(event);
          }
        }}
        placeholder="Введите сообщение"
        autoFocus
      />
      <SendButton hasMessageText={!!messageText} sendNewMessage={sendNewMessage} />
    </StyledForm>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(MessageForm));
