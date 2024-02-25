import React, { useEffect, useState } from 'react';

import Numlookupapi from '@everapi/numlookupapi-js';

const ViewUsage = () => {
  const [apiKey, setApiKey] = useState('');
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    if (apiKey) {
      fetchAccountInfo();
    }
  }, [apiKey]);

  const fetchAccountInfo = async () => {
    try {
      const client = new Numlookupapi(apiKey);
      const response = await client.status();

      // Check if response contains a "message" field
      if (response.message) {
        setAccountInfo({ message: response.message }); // Set accountInfo to the message
      } else {
        setAccountInfo(response); // Set accountInfo to the actual account information
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
    }
  };

  return (
    <div className="card pt-2 mt-4 col-8 mx-auto val-card">
      <div className="bg-body-secondary mx-3 my-3">
      <div className="mt-3">
         <p className=''><span className='text-danger font-monospace font-weight-bold bg-light'>Note:</span> To be able to view usage you have to enter your apiKey!!</p>
         <h3>Enter Your API Key</h3>
         <input 
           type="text" 
           className="form-control" 
           value={apiKey} 
           onChange={(e) => setApiKey(e.target.value)} // Update API key state
        />
      </div>

      {accountInfo && !accountInfo.message && (
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

      {accountInfo && accountInfo.message && (
        <div className="mt-3">
          <p className='text-danger'>{accountInfo.message + ' !!'}</p>
        </div>
      )}

      <a href="/" class="btn btn-dark mt-3">Back</a>
    </div>
    </div>
  );
};

export default ViewUsage;
