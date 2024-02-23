import React, { useEffect, useState } from 'react';

import Numlookupapi from '@everapi/numlookupapi-js';

const ViewUsage = () => {
  const [apiKey, setApiKey] = useState(''); // State to store the API key input value
  const [accountInfo, setAccountInfo] = useState(null); // State to store account information

  useEffect(() => {
    if (apiKey) { // Fetch account info only if API key is provided
      fetchAccountInfo();
    }
  }, [apiKey]);

  const fetchAccountInfo = async () => {
    try {
      const client = new Numlookupapi(apiKey);
      const status = await client.status();
      setAccountInfo(status);
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  return (
    <div className="card col-8 mx-auto bg-body-secondary">
      <div className="mt-3">
        <p>Note: to be able to view usage you have to enter your apiKey and press </p>
        <h3>Enter Your API Key</h3>
        <input 
          type="text" 
          className="form-control" 
          value={apiKey} 
          onChange={(e) => setApiKey(e.target.value)} // Update API key state
        />
      </div>

      {accountInfo && (
        <div className="mt-3">
          <h3>Account Information</h3>
          <p>Account ID: {accountInfo.account_id}</p>
          <p>Month Quotas:</p>
          <ul>
            <li>Total: {accountInfo.quotas.month.total}</li>
            <li>Used: {accountInfo.quotas.month.used}</li>
            <li>Remaining: {accountInfo.quotas.month.remaining}</li>
          </ul>
          <p>Grace Quotas:</p>
          <ul>
            <li>Total: {accountInfo.quotas.grace.total}</li>
            <li>Used: {accountInfo.quotas.grace.used}</li>
            <li>Remaining: {accountInfo.quotas.grace.remaining}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewUsage;
