import React from "react";
// import { useHistory } from "react-router-dom";
// import ErrorAlert from "../layout/ErrorAlert";
// import axios from "axios";
import { updateResId} from "../utils/api";
require("dotenv").config();

export default function ListTables({ tables, loadTables, loadDashboard }) {
  // const history = useHistory();
  // const [error, setError] = React.useState(null);

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

  // // callback function for each finish button on each table
  // // takes in the table_id and reservation_id pulledd from the table object
  // function finishHandler(table_id, reservationId) {
  //   async function updateTable(table_id, reservationId) {
  //     const abortController = new AbortController();
  //     const signal = abortController.signal;
  //     try {
  //       // originally assigned to response variable
  //       await axios.delete(
  //         `${API_BASE_URL}/tables/${table_id}/seat`,
  //         { data: { reservation_id: reservationId } },
  //         { signal }
  //       );
  //       history.push({
  //         pathname: `/dashboard`,
  //         state: { shouldReload: true },
  //       });
  //     } catch (error) {
  //       setError(error.response.data.error);
  //       console.log(error, "error updating table");
  //     }
  //   }
  //   if (
  //     window.confirm(
  //       "Is this table ready to seat new guests? This cannot be undone."
  //     )
  //   ) {
  //     updateTable(table_id, reservationId);
  //   }
  // }

//   return (
//     <div>
//       <div className="card mr-1">
//         <div className="card-body">
//           <h5 className="card-title"> {table.table_name}</h5>
//           <h6 className="card-subtitle mb-2 text-muted">
//             Capacity: {table.capacity}
//           </h6>
//           <div className="card-text" data-table-id-status={table.table_id}>
//             Status: {table.reservation_id ? "Occupied" : "Free"}
//             {table.reservation_id ? (
//               <p>Reservation ID: {table.reservation_id}</p>
//             ) : null}
//           </div>
//           {table.reservation_id ? (
//             <button
//               className="btn btn-primary"
//               data-table-id-finish={table.table_id}
//               onClick={() =>
//                 finishHandler(table.table_id, table.reservation_id)
//               }
//             >
//               Finish
//             </button>
//           ) : null}
//         </div>
//       </div>
//       <ErrorAlert error={error} />
//     </div>
//   );
// }

// export default ListTables;
