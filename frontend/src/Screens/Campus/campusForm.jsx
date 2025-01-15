import { useState } from "react";
import FormInput from "../../Components/FormInput";
import { getDateFormated } from "../../Utils/helper";

const CampusForm = ({ addNewCampusHandler, model }) => {
    const [name, setName] = useState(model?.Name);
    const [description, setDescription] = useState(model?.Description);
    const [organizationId, setOrganizationId] = useState(1);
    const [country, setCountry] = useState(model?.Country);
    const [state, setState] = useState(model?.State);
    const [city, setCity] = useState(model?.City);
    const [address, setAddress] = useState(model?.Address);
    const [phone, setPhone] = useState(model?.Phone);
    const [fax, setFax] = useState(model?.Fax);
    const [email, setEmail] = useState(model?.Email);
    const [startDate, setStartDate] = useState(model?.StartDate);
    const [endDate, setEndDate] = useState(model?.EndDate);

    const saveHandler = () => {
        console.log(model)
        const payload = model ? 
        {
            campusId:model.Id,
            name,
            description,
            organizationId,
            country,
            state,
            city,
            address,
            phone,
            fax,
            email,
            startDate,
            endDate
        }
        : 
        {
            name,
            description,
            organizationId,
            country,
            state,
            city,
            address,
            phone,
            fax,
            email,
            startDate,
            endDate
        }
        ;
        addNewCampusHandler(payload);
    }
    return (
        <>
            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput label="Campus Name" required value={name} setValue={setName} />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={description} setValue={setDescription} label="Description" />
                </div>
            </div>

            <div className="row m-0">
                {/* <div className="mb-2 col-6">
                    <FormInput type="number" required value={organizationId} setValue={setOrganizationId} label="Organization ID" />
                </div> */}
                <div className="mb-2 col-6">
                    <FormInput type="text" value={state} setValue={setState} label="State" />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={country} setValue={setCountry} label="Country" />
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="text" value={address} setValue={setAddress} label="Address" />
                </div>


                <div className="mb-2 col-6">
                    <FormInput type="text" value={city} setValue={setCity} label="City" />
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="text" value={phone} setValue={setPhone} label="Phone" />
                </div>

                <div className="mb-2 col-6">
                    <FormInput type="text" value={fax} setValue={setFax} label="Fax" />
                </div>
            </div>

            <div className="row m-0">
                <div className="mb-2 col-6">
                    <FormInput type="email" value={email} setValue={setEmail} label="Email" />
                </div>
                
                <div className="mb-2 col-6">
                    <FormInput type="date" value={getDateFormated(startDate)} setValue={setStartDate} label="Start Date" />
                </div>
            </div>

            {/* <div className="row m-0">

                 <div className="mb-2 col-6">
                    <FormInput type="date" value={getDateFormated(endDate)} setValue={setEndDate} label="End Date" />
                </div> 
            </div> */}

            <div className="mt-3 px-2">
                <button className="butn col-12" onClick={saveHandler}>Save</button>
            </div>
        </>
    )
}

export default CampusForm;