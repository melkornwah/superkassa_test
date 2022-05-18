import { getMessagesData } from "services/firebase";
import { Message, MessagesList } from "../types";

class MainApi {
    static async getMessagesList(): Promise<MessagesList> {
        const messages: MessagesList = [];
        const dbMessages = await getMessagesData();
        dbMessages.forEach((message: Message) => {
            return messages.push({
                sender: message.sender,
                text: message.text,
                time: message.time,
            });
        });
        messages.push()
        return messages;
    }
}

export default MainApi;