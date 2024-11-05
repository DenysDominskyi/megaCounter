type IncrementType = ReturnType<typeof incrementAC>
type ResetType = ReturnType<typeof resetAC>
type SetSettingsType = ReturnType<typeof setSettingAC>
type SetStartValue = ReturnType<typeof setStartValueAC>
type SetMaxValue = ReturnType<typeof setMaxValueAC>

export type ActionsType = 
| IncrementType 
| ResetType 
| SetSettingsType 
| SetStartValue 
| SetMaxValue

export const incrementAC = () => {
    return {
        type: 'INCREMENT'
    } as const
}
export const resetAC = () => {
    return {
        type: 'RESET'
    } as const
}
export const setSettingAC = () => {
    return {
        type: 'SET'
    } as const
}
export const setStartValueAC = (value: number) => {
    return {
        type: 'START_VALUE',
        payload: {
            value
        }
    } as const
}
export const setMaxValueAC = (value: number) => {
    return {
        type: 'MAX_VALUE',
        payload: {
            value
        }
    } as const
}