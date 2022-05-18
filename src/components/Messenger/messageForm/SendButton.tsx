import React, { memo } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";

export interface Props {
  hasMessageText: boolean
  sendNewMessage: Function
}

const useSendButtonStyles = makeStyles({
  messageSendButton: {
    background: "none",
    border: "none",
  },
  sendImage: {
    width: "20px",
    height: "20px",
  },
});

const SendButton = (props: Props) => {
  const { hasMessageText, sendNewMessage } = props;

  const sendButtonStyles = useSendButtonStyles();

  return (
    <Button
      className={sendButtonStyles.messageSendButton}
      disabled={!hasMessageText}
      onClick={(event) => {
        sendNewMessage(event);
      }}
    >
      <img
        className={sendButtonStyles.sendImage}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAADe0lEQVR4nO3bTahVVRQH8J8v6z0ry6KIPknySTUoSKIIIwJHhTRIaVDpLGyUM6EEkz5oFjWLRtnMaiQ0eSF9YkWkFGQEFYXSJ0WKPS2ft8G6l32M+/x47+x9jp77hzu55+y9/nvdvdde/7X3ZYQRRhhhBDvxNTbi4oa5NIIv0Ot/DuBlTDbKqDDukxww+BzDFFZjQXPUyuFtMfD38Sr+lpzxFTbggsbYFcCN+AczWCFiwRP4QXLEX3gJ1zfEMTteFAP9QJr2Y2IZTEmOmMEOrGqAY1Yswa9ikGuGPL8Nr2BacsZuPIZFhThmxwYxsB9x/izvXIFN2Cc54he8gGsLcMyKc7BHDOqpk7x7HtZil+SII9iOuzJyzI57xWAO4bpTbLMC2/Cv5IzPsA7nZuCYHW+KQWw7zXZX4mn8Ljnip/53l9VJMDeWimB3DCvn0H5c/PpfSo44LBx6S00cs+M5aSqPzaOflSIuHJWc8aGIHwvnyTErLsR+QfjRGvq7QewUf0qO+FbsKJfW0H8WrJPW8UU19blY5A57JUccFDnGzTXZqA0L8LEg+WzNfY+JbHKHiDWtFWF3CmKHsSyTjeVCZxySZsU3Qo+0QoS9Lki9kdlOa0XY1WKd9pQRQa0UYZv7RPaIlLkUWiPCFuH7PoEtmChpXGSZW/Gz40XY1v6zIlhbMf6HqB+WzuzGsR6fV7gcEXHq9hIEHsanFeM9fCKm5OISBCq4W+iWapb5ER5SQITdJDK73yrGp0Xau0rZfbxRETYulsaUlND0xFnDJlyem8D/uDQqwpYJr1f38UGRZLWyu0ejImwhHhD7dpXAu7kND8GkCNYHKjzeY34Sd67oNWBzGLLxmNTBJTBbENyrfBCcUDAItmkbvErBbbDTidCaiqHOpcITOi6GBnJ4tw7K4WpB5J4C9lpXEBmUxLZnttPKktigKDqdkURri6LVsvgzNfc9rCw+o2Vl8fWC2D5xUlQHzpiDkerR2CM19Heio7FLaui/djwvSO4yv+l4Rh6OVo/H75hD+6KiJAfeEqRfO812RUVJLgyuyBwUAzoVnDVXZKqXpJ48ybtn5SWpx8VAvjO72DnRNblrCnDMhiVScePBIc9bIUpyYnBVdmflu9aJklwYXJY+ilu1VJTkRKevy9/v+PpeK0VJTnT+LzPv6PifpkYYYYQROon/AMqXkYAs2UHIAAAAAElFTkSuQmCC"
      />
    </Button>
  );
};

export default memo(SendButton);
