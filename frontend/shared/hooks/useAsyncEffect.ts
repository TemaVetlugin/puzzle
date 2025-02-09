import { DependencyList, useEffect } from "react";

export function useAsyncEffect(callback: () => Promise<void>, dependencyList: DependencyList) {
    useEffect(() => {
        callback();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyList);
}
