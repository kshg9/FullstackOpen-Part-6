import { createContext, useContext, useReducer } from "react";
import PropTypes from 'prop-types';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return action.data;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}
const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
    const [notification, dispatch] = useReducer(notificationReducer, null);
    return (
        <NotificationContext.Provider value={[notification, dispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export const useNotificationValue = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const counterAndDispatch = useContext(NotificationContext)
    return counterAndDispatch[1]
}

export default NotificationContext;