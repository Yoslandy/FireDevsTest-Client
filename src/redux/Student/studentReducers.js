import {
    ADD_STUDENT, GET_STUDENT, GET_STUDENTS, DELETE_STUDENT, UPDATE_STUDENT, CLEAR_STUDENTS, LOADING_STUDENTS
} from './studentTypes';

const initialState = {
    students: [],
    student: null,
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STUDENTS:
            return {
                ...state,
                students: action.payload,
                loading: false
            };
        case GET_STUDENT:
            return {
                ...state,
                student: action.payload,
                loading: false
            };
        case DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student._id !== action.payload._id),
                loading: false
            };
        case UPDATE_STUDENT:
            var studentL = state.students.map((student) => {
                if (student._id === action.payload._id) {
                    return {
                        ...student,
                        name: action.payload.name,
                        email: action.payload.email,
                        sex: action.payload.sex,
                        age: action.payload.age,
                        dateBirth: action.payload.dateBirth,
                        cityBirth: action.payload.cityBirth,
                        group: action.payload.group._id,
                    }
                } else {
                    return student;
                }
            });
            return {
                ...state,
                students: studentL,
                loading: false
            };
        case ADD_STUDENT:
            return {
                ...state,
                students: [action.payload, ...state.students],
                loading: false
            };
        case LOADING_STUDENTS:
            return {
                ...state,
                loading: true,
            };
        default: return state
    }
}