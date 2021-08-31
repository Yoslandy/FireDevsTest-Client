import React, { useMemo, Fragment, useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import swal from "sweetalert";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";
import { COLUMNS_STUDENTS } from '../../components/Group/groupTableColumns'
import { GlobalFilter } from "../../components/Group/GlobalFilter";
import '../../assets/css/testcss.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from "react-router-dom";
import Navbar from "../../components/Others/navbar";
import { returnErrors } from "../../redux/Error/errorActions";
import { deleteStudent, getStudents } from "../../redux/Student/studentActions";
import { CLEAR_STUDENTS } from "../../redux/Student/studentTypes";
import dayjs from 'dayjs'

function StudentList() {

    const { students, loading } = useSelector(state => state.students)
    const dispatch = useDispatch();
    const columns = useMemo(() => COLUMNS_STUDENTS, [])
    const data = useMemo(() => students, [students])

    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, state, setGlobalFilter,
        nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, gotoPage, pageCount }
        = useTable({
            columns,
            data
        }, useGlobalFilter, useSortBy, usePagination)
    const { globalFilter, pageIndex } = state

    useEffect(() => {
        try {
            if (Object.keys(students).length === 0) {
                dispatch(getStudents());
            }
            dispatch({ type: CLEAR_STUDENTS })
        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status))
        }
    }, [])

    /* console.log(students) */

    const deletePhoneBtn = (id) => {
        swal({
            title: "Estás seguro?",
            text: "Eliminaras el Estudiante permanentemente!",
            dangerMode: true,
            buttons: true,
            icon: 'warning'
        }).then((willDeleted) => {
            if (willDeleted) {
                dispatch(deleteStudent(id))
            } else {
                swal(
                    "Operación Cancelada",
                    "El Estudiante no fue eliminado",
                    'info'
                );
            }
        })
    }

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header p-5">
                    <div className="text-dark">Lista de Estudiantes</div>
                    <div className="card bg-transparent m-2 w-100">
                        <div className="card-body">
                            <Link to="/students/add" className="btn btn-sm btn-success mb-4">
                                Nuevo Estudiante
                            </Link>
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                            {students.length > 0 && !loading ?
                                <>
                                    <Table striped responsive size="sm" className="bg-tabla" {...getTableProps()}>
                                        <thead>
                                            {headerGroups.map((headerGroup) => (
                                                <tr {...headerGroup.getHeaderGroupProps()} >
                                                    <th>No</th>
                                                    {headerGroup.headers.map((column) => (
                                                        <th className="text-right pr-5" {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                            {column.render('Header') !== "Id" ? column.render('Header') : ""}
                                                            <span>
                                                                {column.isSorted ? (column.isSortedDesc ? ' ↓' : ' ↑') : ''}
                                                            </span>
                                                        </th>
                                                    ))}
                                                    <th>{"Grupo"}</th>
                                                    <th>{" "}</th>
                                                    <th>{" "}</th>
                                                </tr>
                                            ))}
                                        </thead>
                                        <tbody {...getTableBodyProps()} >
                                            {page.map((row) => {
                                                prepareRow(row)
                                                return (
                                                    <Fragment key={row.index}>
                                                        <tr {...row.getRowProps()}>
                                                            <td className="align-middle">
                                                                {row.index + 1}
                                                            </td>
                                                            {row.cells.map((cell) => {

                                                                return (
                                                                    <td className="align-middle text-right pr-3" {...cell.getCellProps()}>
                                                                        {cell.column.render('Header') === "Id" ? "" :
                                                                            cell.column.render('Header') === "Fecha de Nacimiento" ?
                                                                                dayjs(row.values.dateBirth).format('DD/MM/YYYY') :
                                                                                cell.render('Cell')}
                                                                    </td>
                                                                )
                                                            })
                                                            }
                                                            <td className="align-middle" >
                                                                <Link to={`/students/${row.values._id}/group/details`} className="btn btn-sm btn-info m-1">
                                                                    Grupo
                                                                </Link>
                                                            </td>
                                                            <td className="align-middle" >
                                                                <Link to={`/students/edit/${row.values._id}`} className="btn btn-sm btn-primary m-1">
                                                                    Modificar
                                                                </Link>

                                                            </td>
                                                            <td className="align-middle" >
                                                                <button onClick={() => { deletePhoneBtn(row.values._id) }}
                                                                    className="btn btn-sm btn-danger m-1">
                                                                    {'Eliminar'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </Table>
                                </>
                                :
                                students.length === 0 && !loading ?
                                    <div className="text-black">No hay elementos</div> :
                                    <Dots color={'blue'} />
                            }
                            <div className="text-center text-black-50">
                                <span>
                                    Página{' '} <strong>{pageIndex + 1} of {pageOptions.length}</strong>{' '}
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center ">
                                <div className="text-black-50 m-2">
                                    Ir a la página
                                </div>
                                <input
                                    className="form-control sm ml-2"
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={e => {
                                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(pageNumber)
                                    }}
                                    style={{ width: '60px' }}
                                ></input>
                            </div>
                            <div className="text-center">
                                <button
                                    className="btn btn-sm btn-round bg-arrows text-white me-sm-2"
                                    onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    {'<<'}
                                </button>
                                <button
                                    className="btn btn-sm btn-round bg-arrows text-white me-sm-2"
                                    onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>
                                <button
                                    className="btn btn-sm btn-round bg-arrows text-white me-sm-2"
                                    onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>
                                <button
                                    className="btn btn-sm btn-round bg-arrows text-white "
                                    onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    {'>>'}
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}

export default StudentList;