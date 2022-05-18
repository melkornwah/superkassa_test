import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@mui/styles';
import MessagesList from './messagesList/MessagesList';
import MessageForm from './messageForm/MessageForm';

const useHomeStyles = makeStyles({
  root: {
    minWidth: "320px",
    maxWidth: "900px",
    maxHeight: "100vh",
    height: "100vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
  },        
});

const Home = () => {
    const homeStyles = useHomeStyles();

    return (
        <Box className={homeStyles.root}>
            <MessagesList />
            <MessageForm />
        </Box>
    )
};

export default Home;
