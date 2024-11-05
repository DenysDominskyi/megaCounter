import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'
import './input.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type InputPropsType = DefaultInputPropsType & {
    id: string
    inputValue: number
    inputClass: string
    settingValuesHandler: (key: 'startValue' | 'endValue', value: number) => void
}
const InputForMemo = ({
    id,
    inputValue,
    name,
    inputClass,
    settingValuesHandler,
    ...rest
}: InputPropsType) => {

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (name === 'max-value') {
            let newValue = Number(e.currentTarget.value)
            settingValuesHandler('endValue', newValue)
        }
        if (name === 'start-value') {
            let newValue = Number(e.currentTarget.value)
            settingValuesHandler('startValue', newValue)
        }
    }

    // console.log("INPUT")

    return (
        <div className="input-group">
            <label htmlFor={name}>{name}:</label>
            <input
                id={id}
                type="number"
                value={inputValue}
                onChange={onInputChangeHandler}
                onFocus={onInputChangeHandler}
                className={inputClass}
            />
        </div>
    )
}

export const Input = React.memo(InputForMemo)