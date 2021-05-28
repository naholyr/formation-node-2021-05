export interface Message {
    username: string;
    text: string;
    room: string;
    date: number,
    system?: boolean
}