
function DataTable({ columns, data, actions }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="text-nowrap">
                {col.label}
              </th>
            ))}
            {actions && <th className="text-center text-nowrap">Action</th>}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                {actions && (
                  <td className="text-center">
                    <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                      {actions.map((action, idx) => (
                        <button
                          key={idx}
                          className={`btn btn-sm ${action.className}`}
                          onClick={() => action.onClick(row)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
export default DataTable



