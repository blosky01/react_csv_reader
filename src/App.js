import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  // State to store parsed data
  const [setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse

    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        className="block p-2 w-full text-blue-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      <table className="mt-10">
        <thead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
          <tr className="border border-black">
            {tableRows.map((rows, index) => {
              return <th className="text-blue-500" key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {values.map((value, index) => {
            return (
              <tr className="border border-black hover:bg-grey-100 hover:[&:nth-child(odd)]:bg-blue-200 hover:[&:nth-child(even)]:bg-blue-200 [&:nth-child(odd)]:bg-gray-300 " key={index}>
                {value.map((val, i) => {
                  return <td className="px-6 py-4 whitespace-pre-line border border-black" key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>


    </div>
  );
}

export default App;