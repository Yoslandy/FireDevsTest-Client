import axios from 'axios';
import {
    ADD_STUDENT, GET_STUDENT, GET_STUDENTS, DELETE_STUDENT, UPDATE_STUDENT
} from './studentTypes';
import { returnErrors } from '../Error/errorActions';
import swal from 'sweetalert';

var API_URI = process.env.REACT_APP_API_URI

export const getStudents = () => async dispatch => {
    await axios.get(`${API_URI}/api/students/get/allStudents`)
        .then(res =>
            dispatch({
                type: GET_STUDENTS,
                payload: res.data.students
            }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const getStudent = id => async (dispatch, getState) => {
    await axios.get(`${API_URI}/api/students/get/${id}`)
        .then(res => {
            dispatch({
                type: GET_STUDENT,
                payload: res.data.student
            })
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const deleteStudent = id => async (dispatch) => {
    await axios.delete(`${API_URI}/api/students/delete/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_STUDENT,
                payload: res.data.student
            }),
            swal(
                'Estudiante deleted',
                'The Estudiante has been deleted successfully',
                'success'
            ),

        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};


export const addStudent = (student, group) => async (dispatch) => {
    student.group = group
    /* console.log(student) */
    await axios.post(`${API_URI}/api/students/addStudent`, student)
        .then(res =>
            dispatch({
                type: ADD_STUDENT,
                payload: res.data.student
            }),
            swal(
                'Estudiante Agregado!!!',
                'El Estudiante fue agregado satisfactoriamente',
                'success'
            )
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

export const updateStudent = (id, student, group) => async (dispatch) => {
    student.group = group
    await axios.put(`${API_URI}/api/students/update/${id}`, student)//, tokenConfig(getState)
        .then(res =>
            dispatch({
                type: UPDATE_STUDENT,
                payload: res.data.student
            }),
            swal(
                'Estudiante Modificado!!!',
                'El Estudiante fue modificado satisfactoriamente',
                'success'
            )
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        )
};

