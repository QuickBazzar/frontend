import { useEffect, useState } from "react"
import { getGSTMatrix } from "../../../services/admin/gstReports"
import { formatCurrency } from "../../../utils/formatters"
import DataTable from './../../../components/DataTable';

const GSTMatrix = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMatrix()
  }, [year])

  const loadMatrix = async () => {
    setLoading(true)
    const result = await getGSTMatrix(year)
    if (result?.status === "success") {
      setData(result.data)
    } else {
      setData([])
    }
    setLoading(false)
  }

  const columns = [
    { label: "Month", key: "MonthName" },
    { label: "Total Orders", key: "TotalOrders" },
    {
      label: "Sub Total",
      key: "TotalSubTotal",
      render: (row) => formatCurrency(row.TotalSubTotal),
    },
    {
      label: "GST Amount",
      key: "TotalGST",
      render: (row) => formatCurrency(row.TotalGST),
    },
    {
      label: "Grand Total",
      key: "TotalGrandAmount",
      render: (row) => formatCurrency(row.TotalGrandAmount),
    },
  ]

  if (loading) return <p>Loading GST matrix...</p>

  return (
    <div className="container mt-3">
      <h3>GST Monthly Matrix</h3>

      <div className="mb-3 w-25">
        <input
          type="number"
          className="form-control"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default GSTMatrix
