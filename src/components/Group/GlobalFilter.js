import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div>
      <input
        className="form-control sm mb-3"
        type="text"
        placeholder="Search"
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
      ></input>
    </div>
  )
}
