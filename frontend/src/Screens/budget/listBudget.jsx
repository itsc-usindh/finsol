import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import Topbar from "../../Components/Topbar";
import CallAPI from "../../Utils/callApi";
import SlideIn from "../../Components/SlideIn";
import FormInput from "../../Components/FormInput";
import Toast from "../../Components/Toast";

const ListBudget = () => {
  const [list, setList] = useState();
  const [data, setData] = useState();
  const [showSlideIn, setShowSlideIn] = useState();
  const [selectedRow, setSelectedRow] = useState();
  const [editProvision, setEditProvision] = useState();
  const [isError, setIsError] = useState(true);
  const [msg, setMsg] = useState();

  useEffect(() => {
    runApi();
    console.log(1)
  }, []);

  const runApi = async () => {
    const data = await CallAPI("Budget/list");
    setList(data);


    setData(data.length > 0 && data.map(it => {
      return { position: it.position, provisions: it.provisions }
    }))
  }

  const onRowEditHandler = (row, e) => {
    const item = list.find(item => item.position === row.position);
    setSelectedRow(item);
    setShowSlideIn(true);
    setEditProvision(item.provisions);
  }

  const updateProvisionHandler = async () => {
    const res = await CallAPI(`Budget/UpdateProvision?Id=${selectedRow.id}&provisions=${editProvision}`, 'POST');
    setIsError(!res.status);
    setMsg(res.msg);
    runApi();
    setShowSlideIn(false);
  }
  return (
    <>
      <Topbar title={"Budget / List"} />

      <Toast message={msg} setMessage={setMsg} error={isError} success={!isError} />

      {selectedRow &&
        <SlideIn show={showSlideIn} setShowSlideIn={setShowSlideIn} title="Items">
          <FormInput label={"Provision"} value={editProvision} setValue={setEditProvision} />
          <button className="butn mt-3 col-12" onClick={updateProvisionHandler}>Update</button>
        </SlideIn>}

      <Table title={list ? ("List for - " + list[0].title) : "Budget"} data={data} onEdit={onRowEditHandler} />
    </>
  );
}

export default ListBudget;