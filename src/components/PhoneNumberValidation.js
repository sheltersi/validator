import React, { useEffect, useState } from 'react';

import Numlookupapi from '@everapi/numlookupapi-js';
import Papa from 'papaparse'; // Library for parsing CSV
import { saveAs } from 'file-saver'; // Library for saving files

const PhoneNumberValidation = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([]); // State to store phone numbers
  const [validationResults, setValidationResults] = useState([]); // State to store validation results
  const [accountInfo, setAccountInfo] = useState(null); // State to store account information
  const [apiKey, setApiKey] = useState(''); // State to store the API key input value

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const client = new Numlookupapi(apiKey);
      const status = await client.status();
      setAccountInfo(status);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const { data } = Papa.parse(text, { header: false });
      setPhoneNumbers(data); // Parse CSV and set phone numbers state
    };
    reader.readAsText(file);
  };

  const handleValidation = async () => {
    const client = new Numlookupapi(apiKey);
    const results = [];
    for (const phoneNumber of phoneNumbers) {
      try {
        const response = await client.validate(phoneNumber[0], {
          country_code: 'ZA'
        });
        results.push({ phoneNumber: phoneNumber[0], valid: response.valid });
      } catch (error) {
        console.error('Error validating phone number:', error);
        results.push({ phoneNumber: phoneNumber[0], valid: false });
      }
    }
    setValidationResults(results); // Set validation results state
  };

  const downloadValidNumbers = (format) => {
    const validNumbers = validationResults.filter(result => result.valid).map(result => result.phoneNumber);
    let content;
    let filename;
    if (format === 'csv') {
      content = Papa.unparse(validNumbers.map(number => [number]));
      filename = 'valid_numbers.csv';
    } else if (format === 'txt') {
      content = validNumbers.join('\n');
      filename = 'valid_numbers.txt';
    }
    if (content && filename) {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, filename);
    }
  };

  return (
    <div className="card col-8 mx-auto bg-body-secondary pt-4 mt-4 val-card">
      <div className=" ps-4 pe-4">

      <div className="row">
        <div className="mb-3 md:col-4">
          <label><h5><b>Input your Api Key</b></h5></label>
          <input 
            type="text" 
            className="form-control border border-2 border-success" 
            placeholder="Enter API Key" 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} // Update API key state
          />
        </div>
        <div class="row">
          <div class="col">
            <label htmlFor="formFile" className="form-label"><b>IMPORT A CSV File </b></label>
            <input className="form-control border border-2 border-success" type="file" id="formFile" onChange={handleFileUpload} accept=".csv" required />
          </div>
        </div>
        <div className="ms-2 mt-2 mb-4 col-4">
          <button className="btn btn-success" onClick={handleValidation}>Validate</button>
        </div>
      </div>

      <div className="mb-5">
        <button className="btn btn-primary me-4" onClick={() => downloadValidNumbers('csv')}>Download Valid Numbers as .csv</button>
        <button className="btn btn-success" onClick={() => downloadValidNumbers('txt')}>Download Valid Numbers as .txt</button>
      </div>

      <div class="mt-5">
        <table>
          <thead>
            <tr>
              <th>Phone Number</th>
              <th>Validation Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Valid Phone Numbers</th>
            </tr>
            <tr>
              <td>
                <ul>
                  {validationResults
                    .filter((result) => result.valid)
                    .map((result, index) => (
                      <li key={index}>{result.phoneNumber}</li>
                    ))}
                </ul>
              </td>
            </tr>
            <tr>
              <th>Invalid Phone Numbers</th>
            </tr>
            <tr>
              <td>
                <ul>
                  {validationResults
                    .filter((result) => !result.valid)
                    .map((result, index) => (
                      <li key={index}>{result.phoneNumber}</li>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default PhoneNumberValidation;
