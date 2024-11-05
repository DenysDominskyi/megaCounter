import React, { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'
import './button.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    title: string
}

const ButtonForMemo = ({title ,...rest}: ButtonPropsType) => {
    // console.log(`button ${title}`)
    return (
        <button
            className='button'
            {...rest}
        >
            {title}
        </button>
    )
}

export const Button = React.memo(ButtonForMemo)