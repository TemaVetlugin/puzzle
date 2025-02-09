import { useMemo } from "react";
import { action, extendObservable, makeObservable, set, toJS } from "mobx";

class Observable<T extends Object> {
    private readonly entry: T;

    constructor(entry: T) {
        this.entry = { ...entry };
        makeObservable(this, {
            reset: action,
            set: action,
            update: action,
            handleChange: action
        });
        extendObservable(this, entry);
    }

    reset = () => {
        for (const key in this.entry) {
            this.set(key, this.entry[key]);
        }
    }

    update = (entry: Partial<T>) => {
        for (const key in entry) {
            set(this, key, entry[key]);
        }
    }

    set = <Key extends keyof T>(key: Key, value: T[Key]): T[Key] => {
        if((this as any)[key] !== value){
            set(this, key, value);
        }
        return value;
    }

    handleChange = <R>(data: { name: string, value: R }) => {
        set(this, data.name, data.value);
    }

    toObject = (): T => {
        const result: any = {};
        for (const key in this.entry) {
            result[key] = (this as any as T)[key];
        }
        return result as T;
    }

    toRaw = () => {
        return toJS(this);
    }
}

export function useStore<T extends Object>(entry: T): Observable<T> & T {
    return useMemo(() => {
        return new Observable(entry) as Observable<T> & T;
    }, []);
}
