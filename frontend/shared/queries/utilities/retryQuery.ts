import { wait } from "../../utilities";

import { ResponseType } from '../types/ResponseType';

const retry = async <T>(query: () => Promise<ResponseType<T>>, attempts = -1, delay = 0): Promise<ResponseType<T>> => {
    const response: any = await query();
    if (response?.isSuccess || (attempts < 2 && attempts !== -1)) {
        return response;
    }
    if (delay > 0) {
        await wait(delay);
    }
    if (attempts === -1) {
        return await retry(query, attempts, delay);
    }
    if (attempts > 1) {
        return await retry(query, attempts - 1, delay);
    }
    return response;
}
type OptionsType = {
    attempts?: number,
    delay?: number
}
export const retryQuery = async <T>(query: () => Promise<ResponseType<T>>, {
    attempts = -1,
    delay = 0
}: OptionsType = {}): Promise<ResponseType<T>> => {
    return await retry(query, attempts, delay);
}
