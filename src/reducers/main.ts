import moment from 'moment';
import { sendDbMessage } from 'services/firebase';
import {
    MAIN_MESSAGES_LIST_FETCH,
    MAIN_MESSAGES_LIST_SUCCESS,
    MAIN_MESSAGES_LIST_FAILED,

    MAIN_SEND_MESSAGE,

    MAIN_CHANGE_USERNAME,
    TAction,
} from '../actions/mainActions';
import { MessagesList } from '../types';

export type TState = {
    username: string,
    messagesList: MessagesList | null,
    messengerError: Error | null,
}

const initialState: TState = {
    username: 'Anonim',
    messagesList: null,
    messengerError: null,
}

const main = (state = initialState, action: TAction) => {
    switch (action.type) {
        case MAIN_MESSAGES_LIST_FETCH: {
            const newState = Object.assign({}, state);
            newState.messagesList = null;
            return newState;
        }
        case MAIN_MESSAGES_LIST_SUCCESS: {
            const newState = Object.assign({}, state);
            newState.messagesList = action.messagesList;
            console.log(newState.messagesList)
            return newState;
        }
        case MAIN_MESSAGES_LIST_FAILED: {
            const newState = Object.assign({}, state);
            newState.messengerError = action.error;
            return newState;
        }
            
        case MAIN_SEND_MESSAGE: {
            const newState = Object.assign({}, state);
            const newMessage = {
                time: moment().format('HH:MM'),
                text: action.messageText,
                sender: newState.username,
            };
            sendDbMessage(newMessage);
            const messageList = [
                ...newState.messagesList ? newState.messagesList : [],
                newMessage
            ]
            newState.messagesList = messageList;
            return newState;
        }

        case MAIN_CHANGE_USERNAME: {
            const newState = Object.assign({}, state);
            newState.username = action.newUsername;
            return newState;
        }
        default: {
            return state;
        }
    }

};

export default main;
