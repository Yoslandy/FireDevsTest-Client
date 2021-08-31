import React, { useEffect } from 'react'
import Dots from 'react-activity/dist/Dots';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Others/navbar';
import { returnErrors } from '../../redux/Error/errorActions';
import { getStudent } from '../../redux/Student/studentActions';
import { LOADING_STUDENTS } from '../../redux/Student/studentTypes';

export default function StudentGroupDetails(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id;

    const { student, loading } = useSelector(state => state.students)

    useEffect(() => {
        try {
            dispatch({ type: LOADING_STUDENTS })
            dispatch(getStudent(id));
        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status))
        }
    }, [])

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header">
                    {student && !loading ?
                        <>
                            <div className="text-dark">Grupo del Estudiantes "{student && student.name}"</div>
                            <div className="card bg-transparent m-2 w-75">
                                <div className="card-body">
                                    <div className="text-black">Name: <span className="text-black-50">{student.group.name}</span></div>
                                    <div className="text-black">Profesor: <span className="text-black-50">{student.group.teacher}</span></div>
                                    <Link to="/students" className="btn btn-primary">Volver</Link>
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
