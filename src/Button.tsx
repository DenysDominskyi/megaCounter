import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { theme } from './theme'

type ButtonPropsType = {
    title: string
    disabled?: boolean
    callbackFunction: () => void
}

export const Button = (props: ButtonPropsType) => {

    const [isDisabled, setIsDisabled] = useState(false)

    const onClickHandler = () => {
        props.callbackFunction()
    }

    return (
        <StyledButton
            disabled={isDisabled}
            theme={theme}
            onClick={onClickHandler}
        >
            {props.title}
        </StyledButton>
    )
}

const StyledButton = styled.button`
    ${props => props.theme.flexCenter}
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.prime};
    border: none;
    padding: 10px 5px;
    font-size: 32px;
    opacity: 1;
    cursor: pointer;
    transition: .1s ease-out;

    ${props => !props.disabled && css`
        &:hover {
            background-color: ${props => props.theme.secondary};
        }
        &:active{
            background-color: ${props => props.theme.backgroundColor};
            transform: scale(.99);
            color: ${props => props.theme.prime};
            box-shadow: inset 0 0 10px 1px #121416;
        }
    `}
    
    ${props => props.disabled && css`
        opacity: 0.3;
        cursor: not-allowed;
    `}
`