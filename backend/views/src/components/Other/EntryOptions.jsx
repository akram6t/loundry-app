import React from 'react'

const EntryOptions = ({ onChange, itemsPerPage }) => {
    return (
        <div className="flex items-center space-x-1">
          <span>Show</span>
            <select value={itemsPerPage ? itemsPerPage : undefined} className="border rounded-lg p-1" onChange={(e) => onChange(e.target.value)}>
                <option value={10} defaultChecked>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
            <span>Entries</span>
        </div>
    )
}

export default EntryOptions