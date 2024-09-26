import React, { ChangeEvent, useEffect, useState } from 'react'
import './counter.css'
import { Button } from '../components/button/Button'

type ScreenModesType = 'count' | 'edit' | 'error'
type SettingType = { startValue: number, maxValue: number }

export const Counter = () => {

    // state
    const [setting, setSetting] = useState<SettingType>({
        startValue: 0,
        maxValue: 5
    })
    const [counterValue, setCounterValue] = useState<number>(setting.startValue)
    const [screenMode, setScreenMode] = useState<ScreenModesType>('count')

    // functions
    const increment = () => setCounterValue(prev => prev + 1)

    const reset = () => setCounterValue(setting.startValue)

    const set = () => {
        setScreenMode('count')
    }

    const maxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(e.currentTarget.value)
        setScreenMode('edit')
        if ( newValue <= setting.startValue || counterValue < 0) {
            setScreenMode('error')
        }
        setSetting({ ...setting, maxValue: newValue })
    }

    const startValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newValue = Number(e.currentTarget.value)
        setScreenMode('edit')
        if (newValue < 0 || newValue >= setting.maxValue) {
            setScreenMode('error')
        }
        setCounterValue(newValue)
        setSetting({ ...setting, startValue: newValue })
    }

    useEffect(() => {
        let settings = localStorage.getItem('setting')
        let counterValueAsString = localStorage.getItem('counterValue')
        let screenModeAsString = localStorage.getItem('screenMode')

        if (settings) { setSetting(JSON.parse(settings)) }
        if (counterValueAsString) { setCounterValue(JSON.parse(counterValueAsString)) }
        if (screenModeAsString) { setScreenMode(JSON.parse(screenModeAsString)) }
    }, [])

    useEffect(() => {
        localStorage.setItem('setting', JSON.stringify(setting))
        localStorage.setItem('counterValue', JSON.stringify(counterValue))
        localStorage.setItem('screenMode', JSON.stringify(screenMode))
    }, [setting, counterValue, screenMode])

    let increaseBtnDisabled = screenMode === 'edit' ? true : counterValue === setting.maxValue
    let resetBtnDisabled = screenMode === 'edit' ? true : counterValue === setting.startValue
    let setBtnDisabled = screenMode === 'error' || screenMode !== 'edit'

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
                            value={setting.maxValue}
                            onChange={maxValueHandler}
                            onFocus={maxValueHandler}
                            className={setting.maxValue <= setting.startValue || setting.maxValue < 0 ? 'red' : ''}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor='start-value'>start value:</label>
                        <input
                            id='start-value'
                            type="number"
                            name='max-value'
                            value={setting.startValue}
                            onChange={startValueHandler}
                            onFocus={startValueHandler}
                            className={setting.startValue < 0 || setting.startValue >= setting.maxValue ? 'red' : ''}
                        />
                    </div>
                </div>
                <div className='button-box'>
                    <Button title='set' callbackFunction={set} disabled={setBtnDisabled} />
                </div>
            </div>
            <div className='container'>
                <div className='display'>
                    {screenMode === 'count' && <p className={counterValue === setting.maxValue ? 'display-max-result' : 'display-result'}>{counterValue}</p>}
                    {screenMode === 'edit' && <p className='display-setting'>enter values and press 'set'</p>}
                    {screenMode === 'error' && <p className='display-setting-error'>Incorrect value!</p>}
                </div>
                <div className='button-box'>
                    <Button title='inc' callbackFunction={increment} disabled={increaseBtnDisabled} />
                    <Button title='reset' callbackFunction={reset} disabled={resetBtnDisabled} />
                </div>
            </div>
        </div>
    )
}