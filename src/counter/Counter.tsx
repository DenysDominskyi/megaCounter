import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import './counter.css'
import { Button } from '../components/button/Button'
import { Input } from '../components/input/Input'
import { CounterDisplay } from '../components/counterDisplay/CounterDisplay'
import { useDispatch, useSelector } from 'react-redux'
import { selectState } from '../redux/selectors'
import { incrementAC, resetAC, setMaxValueAC, setSettingAC, setStartValueAC } from '../redux/actions'


// enum TEST  {
//  COUNT='count',
//  EDIT = 'edit',
//  ERROR = 'error'
// }
export type SettingType = { startValue: number, maxValue: number }

export const Counter = () => {
    const dispatch = useDispatch()

    // state
    const {startValue, maxValue, currentValue, screenMode} = useSelector(selectState)
    
    // variables
    let increaseBtnDisabled: boolean = useMemo(()=> screenMode === 'error' || screenMode === 'edit' || currentValue >= maxValue, [screenMode, currentValue, maxValue]) 
    let resetBtnDisabled: boolean = useMemo(()=> screenMode === 'error' || screenMode === 'edit' || currentValue === startValue,[screenMode, currentValue, startValue])
    let setBtnDisabled: boolean = useMemo(()=> screenMode === 'error' || screenMode !== 'edit', [screenMode]) 
    let isMaxValue: boolean = useMemo(()=>currentValue === maxValue, [currentValue, maxValue])

    let startInputClass: string = startValue < 0 || startValue >= maxValue ? 'red' : ''
    let endInputClass: string = maxValue <= startValue || maxValue <= 0 ? 'red' : ''

    // functions
    const increment = useCallback(() => {
        dispatch(incrementAC())
    }, [])

    const reset = useCallback(() => {
        dispatch(resetAC())
    }, [startValue])

    const set = useCallback(() => {
        dispatch(setSettingAC())
    }, [])

    const settingValuesHandler = useCallback((key: 'startValue' | 'endValue', value: number) => {
        if (key === 'startValue') {
            dispatch(setStartValueAC(value))
        }

        if (key === 'endValue') {
            dispatch(setMaxValueAC(value))
        }
    }, [])

    // local storage
    // useEffect(() => {
    //     let settings = localStorage.getItem('setting')
    //     let currentValueAsString = localStorage.getItem('currentValue')
    //     let screenModeAsString = localStorage.getItem('screenMode')

    //     if (settings) { setSetting(JSON.parse(settings)) }
    //     if (currentValueAsString) { setcurrentValue(JSON.parse(currentValueAsString)) }
    //     if (screenModeAsString) { setScreenMode(JSON.parse(screenModeAsString)) }
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem('setting', JSON.stringify(setting))
    //     localStorage.setItem('currentValue', JSON.stringify(currentValue))
    //     localStorage.setItem('screenMode', JSON.stringify(screenMode))
    // }, [setting, currentValue, screenMode])

    // console.log("Counter")
    return (
        <div className='counter'>
            <div className='container'>
                <div className='display'>
                    <Input
                        id='max-value'
                        name='max-value'
                        inputValue={maxValue}
                        inputClass={endInputClass}
                        settingValuesHandler={settingValuesHandler}
                    />
                    <Input
                        id='start-value'
                        name='start-value'
                        inputValue={startValue}
                        inputClass={startInputClass}
                        settingValuesHandler={settingValuesHandler}
                    />
                </div>
                <div className='button-box'>
                    <Button title='set' onClick={set} disabled={setBtnDisabled} />
                </div>
            </div>
            <div className='container'>
                <CounterDisplay
                    screenMode={screenMode}
                    currentValue={currentValue}
                    isMaxValue={isMaxValue}
                />
                <div className='button-box'>
                    <Button  title='inc' onClick={increment} disabled={increaseBtnDisabled} />
                    <Button title='reset' onClick={reset} disabled={resetBtnDisabled} />
                </div>
            </div>
        </div>
    )
}