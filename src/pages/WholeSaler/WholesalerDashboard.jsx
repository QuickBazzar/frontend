import WholesalerLayout from './WholesalerLayout'

function WholesalerDashboard() {
  const cardStyle = {
    borderRadius: '12px',
    color: '#fff',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    minHeight: '130px',
  }

  return (
    <WholesalerLayout>
      <div className="container-fluid px-3 px-md-4">
        <h2 className="mb-4 text-primary text-center text-md-start">
          Wholesaler Dashboard
        </h2>

        <div className="row g-4">
          {/* Total Products */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="card shadow-sm text-center p-4 border-primary h-100">
              <h5>Total Products</h5>
              <h2>--</h2>
            </div>
          </div>

          {/* Total Orders */}
          <div className="col-12 col-sm-6 col-md-4">
            <div
              style={{ ...cardStyle, backgroundColor: '#3498db' }}
              className="text-center h-100"
            >
              <h5>Total Orders</h5>
              <h2>--</h2>
            </div>
          </div>

          {/* Revenue */}
          <div className="col-12 col-sm-6 col-md-4">
            <div
              style={{ ...cardStyle, backgroundColor: '#e67e22' }}
              className="text-center h-100"
            >
              <h5>Revenue</h5>
              <h2>₹ --</h2>
            </div>
          </div>
        </div>
      </div>
    </WholesalerLayout>
  )
}

export default WholesalerDashboard
