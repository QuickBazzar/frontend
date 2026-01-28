import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getWholesalerById, updateWholesaler } from '../../../services/admin/wholesaler'
import EditProfile from '../../../components/EditProfile'

export const EditWholesaler = () => {
    const {id} = useParams()
    const {state} = useLocation()

    const [wholesaler, setWholesaler] = useState(state?.wholesaler || null)

    useEffect(()=> {
        fetchWholesaler()
    }, [])

    const fields = [
        { label: "BusinessName", name: "businessName", mapKey: "BusinessName" },
        { label: "Contact Number", name: "contactNumber", mapKey: "ContactNumber" },
        { label: "Address", name: "address", mapKey: "Address" },
        { label: "GST Number", name: "gstNumber", mapKey: "GSTNumber" },
    ]

    const handelSubmit = (form) => {
        return updateWholesaler(id, form)
    }

    const fetchWholesaler = async() => {
        const result = await getWholesalerById(id)

        if(result.status == "success"){
            setWholesaler(result.data)
        }
    }

  return (
    <EditProfile 
        title="Update Wholesaler Profile"
        fields={fields}
        initialData={wholesaler}
        onSubmit={handelSubmit}
        backTo="/admin/getAllWholesalers"
    />
  )
}
