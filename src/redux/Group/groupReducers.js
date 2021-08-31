import {
    ADD_GROUP, GET_GROUP, GET_GROUPS, DELETE_GROUP, UPDATE_GROUP, CLEAR_GROUPS, LOADING_GROUPS
} from './groupTypes';

const initialState = {
    groups: [],
    group: null,
    loading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload,
                loading: false
            };
        case GET_GROUP:
            return {
                ...state,
                group: action.payload,
                loading: false
            };
        case DELETE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload._id),
                loading: false
            };
        case UPDATE_GROUP:
            var groupL = state.groups.map((group) => {
                if (group._id === action.payload._id) {
                    return {
                        ...group,
                        name: action.payload.name,
                        teacher: action.payload.teacher,
                    }
                } else {
                    return group;
                }
            });
            return {
                ...state,
                groups: groupL,
                loading: false
            };
        case ADD_GROUP:
            return {
                ...state,
                groups: [action.payload, ...state.groups],
                loading: false
            };
        case LOADING_GROUPS:
            return {
                ...state,
                loading: true,
            };
        default: return state
    }
}