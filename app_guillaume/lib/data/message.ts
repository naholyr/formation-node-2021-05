import { client } from "../redis-client";
import { Message } from "../model/message.model";
import {omit} from 'lodash'


export const addMessage = async (message: Message) => await client.lpush("M:" + message.room, JSON.stringify([omit(message, 'room')]));

export const getMessages = async ({room, limit}: any): Promise<any> => {
    const list = await client.lrange("M:" + room, 0, limit);
        console.log(list)
    list.map((string: any) => {
        const [username, message, date, system] = JSON.parse(string);
        return { username, message, date, system, room };
    })
  };


