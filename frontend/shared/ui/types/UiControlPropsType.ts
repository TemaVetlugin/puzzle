import React from "react";

import { OnChangeType } from "../../types";

export type UiControlPropsType<ValueType, AdditionalProps = {}> = {
    name?: string,
    value?: ValueType | null,
    start?: ValueType | null,
    end?: ValueType | null,
    style?: React.CSSProperties,
    className?: string,
    onChange?: OnChangeType<ValueType | null>
} & AdditionalProps;
