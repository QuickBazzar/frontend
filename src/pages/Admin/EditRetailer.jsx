import { useLocation, useParams } from "react-router-dom"
import EditProfile from "../../components/EditProfile"
import { updateRetailer } from "../../services/admin/retailer"

const EditRetailer = () => {
    const {id} = useParams()
    const {state} = useLocation()

    return(
        <EditProfile
            initialData={state}
            backTo="/admin/getAllRetailers"
            onSubmit={(formData) => updateRetailer(id, formData)}
        />
    )
}

export default EditRetailer