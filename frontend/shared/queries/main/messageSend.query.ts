import { makeQuery } from "../utilities";

type RequestType = {
    messages: {
        role: 'user' | 'assistant',
        content: string,
    }[],
};

type ResponseType = {
    message: string
}

export const messageSendQuery = async (body: RequestType) => {
    return await makeQuery<ResponseType>("POST", {
        endpoint: '/message/send',
        body
    });
}
