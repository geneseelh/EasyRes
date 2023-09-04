import React from "react";
import { updateResId} from "../utils/api";
require("dotenv").config();

export default function ListTables({ tables, loadTables, loadDashboard }) {

  function clickHandler(event){
    let tableId = event.target.value;
    tableId = Number(tableId);
    if(window.confirm("Is this table ready to seat new guests?")===true){
      updateResId(tableId)
      .then(()=>loadTables())
      .then(()=>loadDashboard())
      .catch(error=>console.log('error',error))
    }
  }

  const list = tables.map((table) => {
    return (
        <div className="card" key={table.table_id}>
        <div className="card-body">
        <h5 className="card-title">Table: {table.table_name}</h5>
        <p className="card-text">Capacity: {table.capacity}</p>
        <p><span data-table-id-status={table.table_id}>
            Status: {table.reservation_id ? 'Occupied' : 'Free'}
        </span></p>
        {table.reservation_id ? <button value={table.table_id} 
        data-table-id-finish={table.table_id}
        type="button"
        className="btn btn-danger" 
        onClick={clickHandler}>Finish</button> : null}
        </div>
        </div>
    )
})
return (<>{list}</>)
}
