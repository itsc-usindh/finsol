import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Topbar from "../../Components/Topbar";
import ComboBox from "../../Components/ComboBox";
import { useEffect, useState } from "react";
import FormInput from "../../Components/FormInput";
import CallAPI from "../../Utils/callApi";
import Toast from "../../Components/Toast";
import Table from "../../Components/Table";

function EmployeeLeaves() {
    const { search } = useLocation();
    const [query, setQuery] = useSearchParams(search);
    const navigation = useNavigate();

    const [employeeId, setEmployeeId] = useState(query.get("employeeId"));
    const [leaveType, setLeaveType] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [reason, setReason] = useState("");

    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);

    const [leavesHstory, setLeavesHstory] = useState();

    const runApi = () => {
        if (employeeId)
            CallAPI('Employee/GetEmployeeLeaves?emplyeeId=' + employeeId).then(d => {
                const tableData = d.map(data => {
                    return { from: data.fromDate?.split('T')[0], to: data.toDate?.split('T')[0], reason: data.reason, 'leave Type': data.leaveType, 'pay stauts': data.payStatus, status: data.leaveStatus }
                });
                setLeavesHstory(tableData);
            })
    }
    useEffect(() => {
        runApi();
    }, [employeeId]);

    const leaveTypeOptions = [{ name: "Sick Leave", value: "Sick Leave" }, { name: "Casual Leave", value: "Casual Leave" }, { name: "Annual Leave", value: "Annual Leave" }];

    const applyHandler = async () => {
        const payload = {
            employeeId,
            leaveType,
            toDate,
            fromDate,
            reason
        }
        const res = await CallAPI('Employee/ApplyForLeave', 'POST', payload);
        setIsError(!res.status);
        setMsg(res.msg);
        runApi();
    }
    return (
        <>
            <Topbar title="Leaves" />


            {msg && (
                <Toast
                    message={msg}
                    setMessage={setMsg}
                    error={isError}
                    success={!isError}
                />
            )}
            <div className="px-3">
                <div className="box floating-heading">
                    <h2 className="ps-2 mb-4 heading">Apply for Leave</h2>
                    <div className="form row">
                        <div className="row m-0">
                            <div className="mb-3 col-6">
                                {leaveType}
                                {leaveTypeOptions && leaveTypeOptions.length > 0 && (
                                    <ComboBox options={leaveTypeOptions} placeholder={"-- Select Leave type --"} itemSelectHandler={(opt) => setLeaveType(opt.value)} />
                                )}
                            </div>

                            <div className="mb-3 col-6">
                                <FormInput label="From Date" required value={fromDate} setValue={setFromDate} type="date" />
                            </div>

                            <div className="mb-3 col-6">
                                <FormInput label="To Date" required value={toDate} setValue={setToDate} type="date" />
                            </div>

                            <div className="mb-3 col-6">
                                <FormInput label="Reason" required value={reason} setValue={setReason} />
                            </div>

                            <div className="ms-auto d-flex justify-content-end">
                                <button className="butn" onClick={applyHandler}>
                                    Send Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="mt-5" />

            <Table isSmall noPagination title="Leaves History" data={leavesHstory} />
        </>
    );
}

export default EmployeeLeaves;