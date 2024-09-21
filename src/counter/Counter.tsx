import React, { ChangeEvent, useEffect, useState } from 'react'
import './counter.css'
import { Button } from '../components/button/Button'

export const Counter = () => {

    // state
    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(7)
    const [counterValue, setCounterValue] = useState<number>(startValue)
    const [settingMode, setSettingMode] = useState(false)
    const [error, setError] = useState(false)

    // functions
    const increment = () => setCounterValue(prev => prev + 1)

    const reset = () => setCounterValue(startValue)

    const set = () => {
        setSettingMode(false)
    }

    const maxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(e.currentTarget.value)
        if (newValue <= startValue) {
            setError(true)
        } else {
            setError(false)
        }
        setMaxValue(newValue)
    }
    
    const startValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(e.currentTarget.value)
        if (newValue < 0 || newValue >= maxValue) {
            setError(true)
        } else {
            setError(false)
        }
        setCounterValue(newValue)
        setStartValue(newValue)
    }

    useEffect(() => {
        let startValueAsString = localStorage.getItem('startValue')
        let maxValueAsString = localStorage.getItem('maxValue')
        let counterValueAsString = localStorage.getItem('counterValue')
        let settingModeAsString = localStorage.getItem('settingMode')
        let errorAsString = localStorage.getItem('error')
        if(startValueAsString) {setStartValue(JSON.parse(startValueAsString))}
        if(maxValueAsString) {setMaxValue(JSON.parse(maxValueAsString))}
        if(counterValueAsString) {setCounterValue(JSON.parse(counterValueAsString))}
        if(settingModeAsString) {setSettingMode(JSON.parse(settingModeAsString))}
        if(errorAsString) {setError(JSON.parse(errorAsString))}
    }, [])
    
    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        localStorage.setItem('counterValue', JSON.stringify(counterValue))
        localStorage.setItem('settingMode', JSON.stringify(settingMode))
        localStorage.setItem('error', JSON.stringify(error))
    }, [startValue, maxValue, counterValue, settingMode, error])

    // bll

    return (

        <div className='counter'>
            <div className='container'>
                <div className='display'>
                    <div className="input-group">
                        <label htmlFor='max-value'>max value:</label>
                        <input
                            id='max-value'
                            type="number"
                            name='max-value'
                            value={maxValue}
                            onChange={maxValueHandler}
                            onClick={() => setSettingMode(true)}
                            className={maxValue <= startValue ? 'red' : ''}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='start-value'>start value:</label>
                        <input
                            id='start-value'
                            type="number"
                            name='max-value'
                            value={startValue}
                            onChange={startValueHandler}
                            onClick={() => setSettingMode(true)}
                            className={startValue < 0 || startValue >= maxValue ? 'red' : ''}
                        />
                    </div>
                </div>
                <div className='button-box'>
                    <Button title='set' callbackFunction={set} disabled={settingMode ? error : !error} />
                </div>
            </div>
            <div className='container'>
                <div className='display'>
                    {settingMode ?
                        error ?
                            <p className='display-setting-error'>Incorrect value!</p> :
                            <p className='display-setting'>enter values and press 'set'</p>
                        :
                        <p className={counterValue === maxValue ? 'display-max-result' : 'display-result'}>{counterValue}</p>
                    }

                </div>
                <div className='button-box'>
                    <Button title='inc' callbackFunction={increment} disabled={settingMode ? true : counterValue === maxValue} />
                    <Button title='reset' callbackFunction={reset} disabled={settingMode ? true : counterValue === startValue} />
                </div>
            </div>
        </div>
    )
}