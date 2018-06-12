import {VIEW, CHEMICAL, MONTH, SENSOR} from './../actions/'
import {ALL, TEMPORAL} from "../constants";
import {DAYHOUR, LOGLINEAR} from "../constants";

const initialState = {
    view: TEMPORAL,
    chemical: ALL,
    month: ALL,
    sensor: 1,
    daily: true,
    linearly: true
};

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case VIEW:
            return {
                ...state,
                view: action.value
            };
        case CHEMICAL:
            return {
                ...state,
                chemical: action.value,
            };
        case MONTH:
            return {
                ...state,
                month: action.value,
            };
        case SENSOR:
            return {
                ...state,
                sensor: action.value,
            };
        case DAYHOUR:
            console.log('DayHour', action.value);
            return {
                ...state,
                daily: action.value,
            };
        case LOGLINEAR:
            console.log('LogLinear', action.value);
            return {
                ...state,
                linearly: action.value,
            };
        default:
            return state;
    }
};

export default rootReducer;