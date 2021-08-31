import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Others/navbar'
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Redirect } from 'react-router-dom';
import { getStudent, updateStudent } from '../../redux/Student/studentActions';
import { getGroup, getGroups } from '../../redux/Group/groupActions';
import { returnErrors } from '../../redux/Error/errorActions';
import { LOADING_STUDENTS } from '../../redux/Student/studentTypes';
import Dots from 'react-activity/dist/Dots';

export default function StudentEdit(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id;
    const { groups, group } = useSelector(state => state.groups)
    const { student, loading } = useSelector(state => state.students)
    const [modificado, set_Modificado] = useState(false)

    const initialValues = {
        name: '',
        email: '',
        sex: '',
        age: '',
        dateBirth: '',
        cityBirth: '',
        group: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Campo requerido!"),
        email: Yup.string()
            .required("Campo requerido!")
            .email("El email tiene formato incorrecto!"),
        sex: Yup.string()
            .required("Campo requerido!"),
        age: Yup.string()
            .required("Campo requerido!"),
        dateBirth: Yup.string()
            .required("Campo requerido!"),
        cityBirth: Yup.string()
            .required("Campo requerido!"),
        group: Yup.string()
            .required("Campo requerido!"),
    })

    const onSubmit = async () => {
        try {
            if (formik.values.sex === 'selectSex') {
                formik.setErrors({
                    ...formik.errors,
                    sex: "Campo requerido!"
                })
            } else
                if (formik.values.city === 'selectCity') {
                    formik.setErrors({
                        ...formik.errors,
                        cityBirth: "Campo requerido!"
                    })
                } else
                    if (formik.values.city === 'selectGroup') {
                        formik.setErrors({
                            ...formik.errors,
                            cityBirth: "Campo requerido!"
                        })
                    } else {
                        dispatch(updateStudent(student._id, formik.values, group))
                        formik.handleReset()
                        set_Modificado(true)
                    }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        try {
            dispatch({ type: LOADING_STUDENTS })
            dispatch(getStudent(id));
            if (Object.keys(groups).length === 0)
                dispatch(getGroups())
        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status))
        }
    }, [])

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        if (student !== null && student !== undefined) {
            formik.setValues({
                name: student.name,
                email: student.email,
                sex: student.sex,
                age: student.age,
                dateBirth: student.dateBirth,
                cityBirth: student.cityBirth,
                group: student.group._id,
            })
            dispatch(getGroup(student.group._id))
        }
    }, [student])

    const handleChange = (select) => {
        dispatch(getGroup(select.target.value))
        formik.setValues({
            ...formik.values,
            group: select.target.value
        })
    }

    if (modificado)
        return <Redirect to="/students" />

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header">
                    {student && !loading ?
                        <>
                            <div className="text-dark">Editar Estudiante</div>
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
                                            <label htmlFor="email" className="form-label text-black-50">Correo</label>
                                            <input
                                                id="email"
                                                type="text"
                                                className="form-control"
                                                placeholder="Correo..."
                                                value={formik.values.email}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.email && formik.errors.email ?
                                                <div className="text-danger">{formik.errors.email}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="sex" className="form-label text-black-50">Sexo</label>
                                            <select
                                                id="sex"
                                                className="form-control"
                                                onChange={formik.handleChange}
                                                value={formik.values.sex}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="selectSex">Selecciona el Sexo...</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                            {formik.touched.sex && formik.errors.sex ?
                                                <div className="text-danger">{formik.errors.sex}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="age" className="form-label text-black-50">Edad</label>
                                            <input
                                                id="age"
                                                type="number"
                                                className="form-control"
                                                placeholder="Edad..."
                                                value={formik.values.age}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.age && formik.errors.age ?
                                                <div className="text-danger">{formik.errors.age}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="cityBirth" className="form-label text-black-50">Ciudad de Nacimiento</label>
                                            <select
                                                id="cityBirth"
                                                className="form-control"
                                                value={formik.values.cityBirth}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            >
                                                <option value="selectCity">Selecciona la Ciudad...</option>
                                                <option value="Valparaíso">Valparaíso</option>
                                                <option value="Los Lagos">Los Lagos</option>
                                                <option value="Atacama">Atacama</option>
                                                <option value="Tarapacá">Tarapacá</option>
                                                <option value="Antofagasta">Antofagasta</option>
                                            </select>
                                            {formik.touched.cityBirth && formik.errors.cityBirth ?
                                                <div className="text-danger">{formik.errors.cityBirth}</div> :
                                                null
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="dateBirth" className="form-label text-black-50">Fecha de Nacimiento</label>
                                            <input
                                                id="dateBirth"
                                                type="date"
                                                className="form-control"
                                                placeholder="Fecha de Nacimiento..."
                                                value={formik.values.dateBirth}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            {formik.touched.dateBirth && formik.errors.dateBirth ?
                                                <div className="text-danger">{formik.errors.dateBirth}</div> :
                                                null
                                            }
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="group" className="form-label text-black-50">Grupo</label>
                                            <select
                                                id="group"
                                                className="form-control"
                                                onChange={handleChange}
                                                value={formik.values.group}
                                                onBlur={formik.handleBlur}
                                            >
                                                {Object.keys(groups).length > 0 ?
                                                    <>
                                                        <option value="selectGroup">Seleccione el Grupo...</option>
                                                        {groups.map((group) => (
                                                            <option key={group._id} value={group._id}>{group.name}</option>
                                                        ))
                                                        }
                                                    </> :
                                                    <option value="selectGroup">Pero no hay Grupos para mostrar...</option>
                                                }
                                            </select>
                                            {formik.touched.group && formik.errors.group ?
                                                <div className="text-danger">{formik.errors.group}</div> :
                                                null
                                            }
                                        </div>


                                        <div className="d-flex justify-content-between">
                                            <Link to="/students" className="btn btn-primary">Volver</Link>
                                            <button type="submit" className="btn btn-primary">
                                                Guardar
                                            </button>
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
