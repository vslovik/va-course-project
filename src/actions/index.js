export const VIEW = 'VIEW';
export const CHEMICAL = 'CHEMICAL';
export const MONTH = 'MONTH';
export const SENSOR = 'SENSOR';
export const DAYHOUR = 'DAYHOUR';
export const LOGLINEAR = 'LOGLINEAR';

export const selectView = (view) => ({
    type: VIEW,
    value: view
});

export const selectChemical = (chemical) => ({
    type: CHEMICAL,
    value: chemical
});

export const selectMonth = (month) => ({
    type:  MONTH,
    value: month
});

export const selectSensor = (sensor) => ({
    type:  SENSOR,
    value: sensor
});

export const toggleDayHour = (daily) => ({
    type:  DAYHOUR,
    value: daily
});

export const toggleLogLinear = (linearly) => ({
    type:  LOGLINEAR,
    value: linearly
});