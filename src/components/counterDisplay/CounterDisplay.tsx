import React from 'react'
import { ScreenModeTypes } from '../../redux/reducers'

type CounterDisplayProps = {
    screenMode: ScreenModeTypes
    currentValue: number
    isMaxValue: boolean
}

const CounterDisplayForMemo = ({screenMode, currentValue, isMaxValue}: CounterDisplayProps) => {
    console.log("DISPLAY")
    return (
        <div className='display'>
            {screenMode === 'count' && <p className={isMaxValue ? 'display-max-result' : 'display-result'}>{currentValue}</p>}
            {screenMode === 'edit' && <p className='display-setting'>enter values and press 'set'</p>}
            {screenMode === 'error' && <p className='display-setting-error'>Incorrect value!</p>}
        </div>
    )
}

export const CounterDisplay = React.memo(CounterDisplayForMemo)