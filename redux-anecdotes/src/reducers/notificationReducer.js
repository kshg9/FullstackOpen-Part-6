import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification(){
            return ''
        }
    }
})

const { setNotification: setNotificationState,
    clearNotification: clearNotificationState } = notificationSlice.actions

export const setNotification = (message, timeInSeconds) => {
    return dispatch => {
        dispatch(setNotificationState(message))
        setTimeout(() => {
            dispatch(clearNotificationState())
        }, 1000 * timeInSeconds)
    }
}

export default notificationSlice.reducer