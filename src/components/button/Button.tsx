import React, { useState } from 'react'
import './button.css'

type ButtonPropsType = {
    title: string
    disabled?: boolean
    callbackFunction: () => void
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callbackFunction()
    }

    return (
        <button
            disabled={props.disabled}
            className='button'
            onClick={onClickHandler}
        >
            {props.title}
        </button>
    )
}
