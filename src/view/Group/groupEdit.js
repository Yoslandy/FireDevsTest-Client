import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Others/navbar'
import { useDispatch, useSelector } from "react-redux";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addGroup, getGroup, updateGroup } from '../../redux/Group/groupActions';
import { Link, Redirect } from 'react-router-dom';
import { returnErrors } from '../../redux/Error/errorActions';
import { CLEAR_GROUPS, LOADING_GROUPS } from '../../redux/Group/groupTypes';

export default function GroupEdit(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id;
    const { group, loading } = useSelector(state => state.groups);
    const [modificado, set_Modificado] = useState(false)

    const initialValues = {
        name: '',
        teacher: '',
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Campo requerido!"),
        teacher: Yup.string()
            .required("Campo requerido!"),
    })

    const onSubmit = async () => {
        try {
            if (formik.values.teacher === 'select') {
                formik.setErrors({
                    ...formik.errors,
                    teacher: "Campo requerido!"
                })
            } else {
                dispatch(updateGroup(group._id, formik.values))
                formik.handleReset()
                set_Modificado(true)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        try {
            dispatch({ type: LOADING_GROUPS })
            dispatch(getGroup(id));
        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status))
        }
    }, [])

    useEffect(() => {
        if (group !== null && group !== undefined) {
            formik.setValues({
                name: group.name,
                teacher: group.teacher
            })
        }
    }, [group])

    if (modificado)
        return <Redirect to="/groups" />

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header">
                    {group && !loading ?
                        <>
                            <div className="text-dark">Editar Grupo</div>
                            <div className="card bg-transparent m-2 w-75">
                                <div className="card-body">
                                    <form className="card_placeForm" onSubmit={formik.handleSubmit} autoComplete="off" >
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label text-black-50">Nombre</label>
                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre..."
                                                value={formik.values.name}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.name && formik.errors.name ?
                                                <div className="text-danger">{formik.errors.name}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="teacher" className="form-label text-black-50">Profesor</label>
                                            <select
                                                id="teacher"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.teacher}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="select">Selecciona un Profesor...</option>
                                                <option value="Pedro Perez">Pedro Perez</option>
                                                <option value="Ramon Arteaga">Ramon Arteaga</option>
                                                <option value="Pablo Martinez">Pablo Martinez</option>
                                            </select>
                                            {formik.touched.teacher && formik.errors.teacher ?
                                                <div className="text-danger">{formik.errors.teacher}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <Link to="/groups" className="btn btn-primary">Volver</Link>
                                            <button type="submit" className="btn btn-primary">Guardar </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </> :
                        <Dots color={'blue'} />
                    }
                </header>
            </div>
        </>
    )
}
