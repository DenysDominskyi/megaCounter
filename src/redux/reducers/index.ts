import { ActionsType } from "../actions"

export type ScreenModeTypes = 'count' | 'edit' | 'error'

export type InitStateType = typeof initState

const initState = {
    startValue: 0,
    maxValue: 5,
    currentValue: 0,
    screenMode: 'count' as ScreenModeTypes
}

export const countReducer = (state: InitStateType = initState, action: ActionsType): InitStateType=> {
    switch (action.type) {
        case 'INCREMENT': {
            return {
                ...state,
                currentValue: state.currentValue + 1
            }
        }
        case 'RESET': {
            return {
                ...state,
                currentValue: state.startValue
            }
        }
        case 'SET': {
            return {
                ...state,
                screenMode: 'count'
            }
        }
        case 'START_VALUE': {
            const stateCopy = {...state}
            const {value} = action.payload
            if(value < 0 || value >= state.maxValue) {
                stateCopy.screenMode = 'error'
            } else {
                stateCopy.screenMode = 'edit'
            }
            stateCopy.currentValue = value
            stateCopy.startValue = value
            return stateCopy
        }
        case 'MAX_VALUE': {
            const stateCopy = {...state}
            const {value} = action.payload
            if(value <= state.startValue || state.currentValue < 0) {
                stateCopy.screenMode = 'error'
            } else {
                stateCopy.screenMode = 'edit'
            }
            stateCopy.maxValue = value
            return stateCopy
        }
        default: {
            return state
        }
    }
}