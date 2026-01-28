import { useNavigate } from "react-router-dom"

export default function DashboardCard({ title, value, icon, to, color }) {
  const navigate = useNavigate()

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <div
        className="card shadow-sm h-100 border-0 dashboard-card"
        onClick={() => navigate(to)}
      >
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <h6 className="text-muted mb-1">{title}</h6>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>

          <div className={`fs-1 text-${color}`}>
            <i className={`bi ${icon}`}></i>
          </div>
        </div>
      </div>
    </div>
  )
}
