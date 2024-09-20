import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { theme } from './theme';

type DisplayPropsType = {
    count: number
}

export const Counter = () => {

    const [count, setCount] = useState(0)

    useEffect(()=>{
        let newCount = localStorage.getItem("counter value")
        if(newCount){
            let correctCount = JSON.parse(newCount)
            setCount(correctCount)
        }
    }, []) 

    useEffect(() => {
        localStorage.setItem("counter value", JSON.stringify(count))
    }, [count])

    const increase = () => count < 5 && setCount(n => n + 1)
    const reset = () =>count !== 0 && setCount(0)

    let equalFive = count === 5
    let equalZero = count === 0

    return (
        <StyledCounter theme={theme}>
            <StyledDisplay theme={theme} count={count}>{count}</StyledDisplay>
            <ButtonContainer theme={theme}>
                <StyledButton
                    onClick={increase}
                    theme={theme}
                    disabled={equalFive}
                    >
                    inc
                </StyledButton>
                <StyledButton
                    onClick={reset}
                    theme={theme}
                    disabled={equalZero}
                >
                    reset
                </StyledButton>
            </ButtonContainer>
        </StyledCounter>
    )
}

// ---Styles---

const StyledCounter = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const StyledDisplay = styled.div<DisplayPropsType>`
    ${props => props.theme.flexCenter}
    background-color: ${props => props.theme.prime};
    flex-grow: 1;
    font-size: 50px;

    ${props => props.count === 5 && css`
        color: red;
        font-size: 62px;
    `}
`
const ButtonContainer = styled.div`
    ${props => props.theme.flexCenter}
    gap: 20px;
    padding: 20px;
`
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