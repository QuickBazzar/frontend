import React from 'react'

export default function DashboardCard({title, value}) {
  return (
    <div className='col-md-4 col-sm-6'>
        <div className='card shadow-sm text-center'>
            <div className='card-body'>
                <h6 className='text-muted'>{title}</h6>
                <h3 className='fw-bold'>{value}</h3>
            </div>
        </div>
    </div>
  )
}
