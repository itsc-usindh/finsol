
import React, { useState } from "react";
import FormInput from "../FormInput";

function ListControl({ listKeyLable, listValueLabel }) {
    const [listKey, setListKey] = useState("");
    const [listValue, setListValue] = useState("");
    const [listData, setListData] = useState([]);

    // Add item to the list
    const listControlHandler = () => {
        if (!listData.some(d => d.listKey === listKey)) {
            setListData([...listData, { listKey, listValue }]);
            setListKey("");
            setListValue("");
        }
    };

    // Delete item from the list
    const deleteItemHandler = (keyToDelete) => {
        const updatedList = listData.filter((item) => item.listKey !== keyToDelete);
        setListData(updatedList);
    };

    return (
        <>
            <div className="list-view-from">
                <FormInput value={listKey} setValue={setListKey} label={listKeyLable} />
                <p className="m-0">-</p>
                <FormInput value={listValue} setValue={setListValue} label={listValueLabel} />
                <button className="butn px-3" onClick={listControlHandler}><i className="fas text-white fa-plus"></i></button>
            </div>

            {/* Render the list only if it has data */}
            {listData.length > 0 && (
                <div className="card list-view">
                    {listData.map((item, index) => (
                        <p
                            key={index}
                            className="d-flex px-3 m-0 align-items-center justify-content-between"
                        >
                            {item.listKey} - {item.listValue}
                            <span
                                className="icon-btn m-0"
                                onClick={() => deleteItemHandler(item.listKey)}
                                style={{ cursor: "pointer", color: "red", marginLeft: "10px" }}
                            >
                                <i className="fas fa-minus"></i>
                            </span>
                        </p>
                    ))}
                </div>
            )}
        </>
    );
}

export default ListControl;
