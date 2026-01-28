import { useLocation, useNavigate, useParams } from "react-router-dom"
import EditProfile from "../../../components/EditProfile"
import { getRetailerById, updateRetailer } from "../../../services/admin/retailer"
import { useEffect, useState } from "react"

const EditRetailer = () => {
    const {id} = useParams()
    const {state} = useLocation()

    const [retailer, setRetailer] = useState(state?.retailer || null)

    useEffect(() => {
        if(!retailer){
            fetchRetailer()
        }
    }, [retailer])

    const fields = [
        { label: "Shop Name", name: "shopName", mapKey: "ShopName" },
        { label: "Contact Number", name: "contactNumber", mapKey: "ContactNumber" },
        { label: "Address", name: "address", mapKey: "Address" },
        { label: "GST Number", name: "gstNumber", mapKey: "GSTNumber" },
    ]

    const handleSubmit = (form) => {
        return updateRetailer(id, form)
    }

    const fetchRetailer = async() => {
        const result = await getRetailerById(id)

        if(result.status == "success"){
            setRetailer(result.data)
        }
    }

    return(
        <EditProfile
            title="Update Retailer Profile"
            fields={fields}
            initialData={retailer}
            onSubmit={handleSubmit}
            backTo="/admin/getAllRetailers"
        />
    )
}

export default EditRetailer