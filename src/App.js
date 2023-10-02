import { useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState('SEP');
  const baseURL = 'http://localhost:3001';
  const [fires, setFires] = useState([]);

  let years = [];
  for (let i = 2001; i < (new Date()).getFullYear(); i++) {
    years.push(i);
  }

  const yearsList = years.map(y => <option value={y} key={y}>{y}</option>)

  function setYearVaule(e) {
    setYear(e.target.value);
  }

  function setMonthValue(e) {
    setMonth(e.target.value);
  }

  async function fetchData() {
    let fires_data = await axios.get(`${baseURL}/api/v1/fires?month=${month}&year=${year}`)
    setFires(fires_data.data.map(f => <li key={f.eventName} >{f.eventName} -- {f.country}</li>))
  }

  function FiresList(props) {
    const firesList = props.firesList;
    if (firesList.length > 0) {
      return <ul>
        {fires}
      </ul>
    } else {
      return <p>Oh no!</p>
    }
  }

  return (
    <div className="App">
      <div className="date-picker">
        <div className="input-container">
          <label htmlFor="years">Choose a Year:</label>
          <select name="years" id="years" value={year} onChange={setYearVaule}>
            {yearsList}
            {years}
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="months">Choose a month:</label>
          <select name="months" id="months" value={month} onChange={setMonthValue}>
            <option value="JAN" key="JAN">January</option>
            <option value="FEB" key="FEB">February</option>
            <option value="MAR" key="MAR">March</option>
            <option value="APR" key="APR">April</option>
            <option value="MAY" key="MAY">May</option>
            <option value="JUN" key="JUN">June</option>
            <option value="JUL" key="JUL">July</option>
            <option value="AUG" key="AUG">August</option>
            <option value="SEP" key="SEP">September</option>
            <option value="OCT" key="OCT">October</option>
            <option value="NOV" key="NOV">November</option>
            <option value="DEC" key="DEC">December</option>
          </select>
        </div>
        <div className="input-container">
          <button type="button" onClick={fetchData}>Search</button>
        </div>
        <div className="event-list">
          <FiresList firesList={fires}/>
        </div>
      </div>
    </div>
  );
}

export default App;
