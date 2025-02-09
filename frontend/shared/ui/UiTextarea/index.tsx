'use client';

import { observer } from "mobx-react-lite";
import React from "react";

import { UiControlPropsType } from "../types";

type PropsType = UiControlPropsType<string, {
    placeholder?: string | React.ReactNode,
}>;

export const UiTextarea = observer((
    {
        name = 'ui-textarea',
        className = '',
        value,
        onChange,
        placeholder,
    }: PropsType
) => {
    const handleChange = (value: string | undefined | null) => {
        if (typeof onChange === 'function') {
            if(value.length<=3000) {
                onChange({
                    name,
                    value: value || ''
                });
            }
        }
    };

    return (
        <div className={"ui-textarea"}>
            <textarea
                className={'ui-textarea__control'}
                value={value || ''}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={' '}
            />
            {(placeholder && !value) && (
                <div className="ui-textarea__placeholder">
                    {placeholder}
                </div>
            )}
        </div>
    )
})

