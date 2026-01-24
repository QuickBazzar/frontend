import WholesalerLayout from './WholesalerLayout'

function WholesalerDashboard() {
  const cardStyle = {
    borderRadius: '12px',
    color: '#fff',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  }

  return (
    <WholesalerLayout>
      <div className="container-fluid">
        <h2 className="mb-4 text-primary">Wholesaler Dashboard</h2>

       <div className="row g-4">
  <div className="col-md-4">
    <div className="card shadow-sm text-center p-4 border-primary">
      <h5>Total Products</h5>
      <h2>--</h2>
    </div>
  </div>
 

          <div className="col-md-4">
            <div style={{ ...cardStyle, backgroundColor: '#3498db' }} className="text-center">
              <h5>Total Orders</h5>
              <h2>--</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div style={{ ...cardStyle, backgroundColor: '#e67e22' }} className="text-center">
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
