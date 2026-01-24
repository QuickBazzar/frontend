function DashboardCard({ title, value, subtitle, icon, color }) {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm border-0 h-100 dashboard-card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h6 className="text-muted">{title}</h6>
            <h3 className={`fw-bold text-${color}`}>{value}</h3>
            <small className="text-muted">{subtitle}</small>
          </div>
          <div style={{ fontSize: "2.5rem" }}>{icon}</div>
        </div>
      </div>
    </div>
  );
}
export default DashboardCard;
