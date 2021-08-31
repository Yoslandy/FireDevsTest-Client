import { combineReducers } from 'redux';

import groupReducer from './Group/groupReducers';
import studentsReducer from './Student/studentReducers';

export default combineReducers({
    groups: groupReducer,
    students: studentsReducer,
});


