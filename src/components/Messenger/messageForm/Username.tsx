import React, { memo } from 'react';
import { Dispatch } from 'redux';
import { Box, FormLabel, TextField, makeStyles, styled, TextFieldProps } from '@material-ui/core';
import { mainActions } from 'actions';
import { connect } from 'react-redux';

export interface Props {
  username: string
  handleUsernameChange: Function
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleUsernameChange: (newUsername: string) => dispatch(mainActions.mainChangeUsername(newUsername)),
});

const useUsernameStyles = makeStyles({
  usernameContainer: {
    padding: "0 8px",
    borderRight: "1px solid gray",
  },
  usernameLabel: {
    fontSize: "12px",
    color: "gray",
  }
});

const StyledInput = styled(TextField)<TextFieldProps>(({
  border: "none",
  background: "none",
  width: "fit-content",
}));

const Username = (props: Props) => {
  const {
    username,
    handleUsernameChange,
  } = props;

  const usernameStyles = useUsernameStyles();

  return (
    <Box className={usernameStyles.usernameContainer}>
      <FormLabel
        className={usernameStyles.usernameLabel}
        htmlFor="username"
      >
        Ваше имя:
      </FormLabel>
      <StyledInput
        name="username"
        defaultValue={username}
        onChange={(event) => {
          handleUsernameChange(event.target.value)
        }}
      />
    </Box>
  )
};

export default connect(mapDispatchToProps)(memo(Username));

