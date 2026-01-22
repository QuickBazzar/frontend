function DataTable({columns, data, actions}) {
  return (
    <table className='table table-bordered table-hover'>
      <thead className='table-dark'>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
          {actions && <th>Action</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} 
            className='text-center'>
              No data available
            </td>
          </tr>
        ): (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
              {actions && (
                <td>
                  {actions.map((action, idx) => (
                    <button
                    key={idx}
                    className={`btn btn-sm me-2 ${action.className}`}
                    onClick={() => action.onClick(row)}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default DataTable