import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
require("dotenv").config();

function NewTable() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [capacityError, setCapacityError] = useState(false);
  const [tableNameError, setTableNameError] = useState(false);
  const [newTable, setNewTable] = useState({
    table_name: "",
    capacity: "",
  });

  function handleChange({ target }) {
    const updatedNewTable = {
      ...newTable,
      [target.name]: target.value,
    };
    if (target.name === "capacity") {
      setCapacityError(updatedNewTable.capacity < 1);
    }
    if (target.name === "table_name") {
      setTableNameError(updatedNewTable.table_name.length < 2);
    }
    setNewTable(updatedNewTable);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    newTable.capacity = Number(newTable.capacity);
    createTable(newTable)
      .then((updatedTable) => {
        setTables([...tables, updatedTable]);
      })
      .then(() => history.push("/"))
      .catch(setError);
  };

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h2>Create New Table</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name:</label>
          <input
            className="form-control"
            type="string"
            name="table_name"
            onChange={handleChange}
            value={newTable.table_name}
            placeholder="#1"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity:</label>
          <input
            className="form-control"
            id="capacity"
            type="number"
            name="capacity"
            onChange={handleChange}
            value={newTable.capacity}
            placeholder="Party Size"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button className="btn btn-secondary m-1" onClick={handleCancel}>
          Cancel
        </button>
        <ErrorAlert error={error} />
      </form>
    </div>
  );
}

export default NewTable;
