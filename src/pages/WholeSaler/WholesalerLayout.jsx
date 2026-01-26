import React from 'react'
import WholesalerSidebar from './WholesalerSidebar'

function WholesalerLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <WholesalerSidebar />

      {/* Main content */}
      <div className="flex-grow-1">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
          <span className="navbar-brand mb-0 h1">Wholesaler Portal</span>
        </nav>

        {/* Page content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default WholesalerLayout
