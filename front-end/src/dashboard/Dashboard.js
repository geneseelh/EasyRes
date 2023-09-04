import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsComponent from "./ReservationsComponent";
import ListTables from "./ListTables";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import moment from "moment";

// require("dotenv").config();

// const API_BASE_URL =
//   process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const query = useQuery();
  const date = query.get("date") || today();

  const history = useHistory();
  // const location = useLocation();

  // useEffect to load the reservations for the current date
  useEffect(loadDashboard, [date]);
  function loadDashboard() {
    // creates an abort controller to abort the fetch request if needed
    const abortController = new AbortController();
    // sets the reservations and errors to null
    setReservationsError(null);
    // calls the listReservations function from the api.js file
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(loadTables, []);
  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }

  return (
    <main>
      <h2>Dashboard</h2>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">
          Reservations for {moment(date).format("ddd MMMM Do, YYYY")}
        </h4>
      </div>
      <div>
        {reservations.length !== 0 ? (
          <ReservationsComponent
            reservations={reservations}
            loadDashboard={loadDashboard}
          />
        ) : (
          `There are no reservations today`
        )}
      </div>
      <button
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary ml-1"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        className="btn btn-warning ml-1"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>
      <ListTables
        tables={tables}
        loadTables={loadTables}
        loadDashboard={loadDashboard}
      />
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;

// useEffect(() => {
//   if (location.state && location.state.shouldReload) {
//     async function loadTables() {
//       const abortController = new AbortController();
//       const signal = abortController.signal;
//       try {
//         const response = await axios.get(`${API_BASE_URL}/tables`, {
//           signal,
//         });
//         setTables(response.data.data);
//       } catch (error) {
//         setReservationsError(error.response.data.error);
//         console.log(error, "error loading tables");
//       }
//     }
//     loadTables();
//     loadDashboard();
//     location.state.shouldReload = false;
//   }
// }, [location.state]);

// // NEXT HANDLER -- to change to the next day
// function handleNext() {
//   const nextDate = next(thisDate);
//   history.push(`/dashboard?date=${nextDate}`);
// }

// // PREVIOUS HANDLER -- to move to the previous day
// function handlePrevious() {
//   const previousDate = previous(thisDate);
//   history.push(`/dashboard?date=${previousDate}`);
// }

// function handleToday() {
//   history.push(`/dashboard?date=${today()}`);
// }

//   return (
//     <main>
//       <h2>Dashboard</h2>
//       <div className="d-md-flex mb-3">
//         <h4 className="mb-0">
//           Reservations for {moment(date).format("ddd MMMM Do, YYYY")}
//         </h4>
//       </div>
//       <div className="d-md-flex mb-3">
//         <button
//           className="btn btn-secondary"
//           onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
//         >
//           Previous
//         </button>
//         <button
//           className="btn btn-warning ml-1"
//           onClick={() => history.push(`/dashboard?date=${next(date)}`)}
//         >
//           Next
//         </button>
//         <button
//           className="btn btn-primary ml-1"
//           onClick={() => history.push(`/dashboard?date=${today()}`)}
//         >
//           Today
//         </button>
//       </div>
//       <div className="d-md-flex mb-3">
//         {reservations.map((reservation) => (
//           <ReservationsComponent
//             key={reservation.reservation_id}
//             reservation={reservation}
//           />
//         ))}
//       </div>
//       <br />
//       <div className="d-md-flex mb-3">
//         {tables.map((table) => (
//           <ListTables key={table.table_id} table={table} />
//         ))}
//       </div>
//       <ErrorAlert error={reservationsError} />
//       {/* {JSON.stringify(reservations)} */}
//     </main>
//   );
// }
