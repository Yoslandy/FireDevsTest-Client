import axios from 'axios';
import {
    ADD_GROUP, GET_GROUP, GET_GROUPS, DELETE_GROUP, UPDATE_GROUP, CLEAR_GROUPS
} from './groupTypes';
import { returnErrors } from '../Error/errorActions';
import swal from 'sweetalert';

var API_URI = process.env.REACT_APP_API_URI

export const getGroups = () => async dispatch => {
    await axios.get(`${API_URI}/api/groups/get/allGroup`)
        .then(res =>
            dispatch({
                type: GET_GROUPS,
                payload: res.data.groups
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const getGroup = id => async (dispatch, getState) => {
    await axios.get(`${API_URI}/api/groups/get/${id}`)
        .then(res => {
            dispatch({
                type: GET_GROUP,
                payload: res.data.group
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const deleteGroup = id => async (dispatch) => {
    await axios.delete(`${API_URI}/api/groups/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_GROUP,
                payload: res.data.group
            }),
            swal(
                'Grupo deleted',
                'The Grupo has been deleted successfully',
                'success'
            ),

        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};


export const addGroup = (group) => async (dispatch) => {
    await axios.post(`${API_URI}/api/groups/addGroup`, group)
        .then(res =>
            dispatch({
                type: ADD_GROUP,
                payload: res.data.group
            }),
            swal(
                'Grupo Agregado!!!',
                'El Grupo fue agregado satisfactoriamente',
                'success'
            )
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const updateGroup = (id, group) => async (dispatch) => {
    await axios.put(`${API_URI}/api/groups/update/${id}`, group)//, tokenConfig(getState)
        .then(res =>
            dispatch({
                type: UPDATE_GROUP,
                payload: res.data.group
            }),
            swal(
                'Grupo Modificado!!!',
                'El Grupo fue modificado satisfactoriamente',
                'success'
            )
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

