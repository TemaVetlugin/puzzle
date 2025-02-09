import { makeQuery } from "../utilities";


type ResponseType = {
    messages: {
        role: 'user' | 'assistant',
        content: string,
    }[]
}

export const messageGetQuery = async () => {
    return await makeQuery<ResponseType>("GET", {
        endpoint: '/message/get',
    });
}
