import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Others/navbar'
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addGroup } from '../../redux/Group/groupActions';
import { Link } from 'react-router-dom';

export default function GroupAdd() {

    const dispatch = useDispatch();

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
                dispatch(addGroup(formik.values))
                formik.handleReset()
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

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header">
                    <div className="text-dark">Agregar Grupo</div>
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
                                    <label htmlFor="teacher" className="form-label text-black-50">Nombre</label>
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
                                    <button type="submit" className="btn btn-primary">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}
