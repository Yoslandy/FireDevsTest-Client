import dayjs from 'dayjs';
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import Dots from 'react-activity/dist/Dots';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import { Table } from 'reactstrap';
import { GlobalFilter } from '../../components/Group/GlobalFilter';
import { COLUMNS_STUDENTS } from '../../components/Group/groupTableColumns';
import Navbar from '../../components/Others/navbar';
import { returnErrors } from '../../redux/Error/errorActions';
import { getGroup, getGroups } from '../../redux/Group/groupActions';
import { LOADING_GROUPS } from '../../redux/Group/groupTypes';
import { LOADING_STUDENTS } from '../../redux/Student/studentTypes';

export default function GroupStudentsDetails(props) {

    const dispatch = useDispatch();
    const id = props.match.params.id;

    const { group, loading } = useSelector(state => state.groups)
    const [students, set_Students] = useState([])

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
            dispatch({ type: LOADING_GROUPS })
            dispatch(getGroup(id));
            dispatch(getGroups());
        } catch (error) {
            dispatch(returnErrors(error.response.data, error.response.status))
        }
    }, [])

    useEffect(() => {
        if (group !== null && group !== undefined) {
            set_Students(group.students)
        }
    }, [group])

    return (
        <>
            <Navbar />
            <div className="App">
                <header className="App-header">
                    {students &&
                        <>
                            <div className="text-dark">Lista de Estudiantes para el Grupo "{group && group.name}"</div>
                            <div className="card bg-transparent m-2 w-75">
                                <div className="card-body">
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

                                <Link to="/groups" className="btn btn-primary">Volver</Link>
                            </div>
                        </>
                    }

                </header>
            </div>
        </>
    )
}