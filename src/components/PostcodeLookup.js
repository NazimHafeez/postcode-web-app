import React, { useState } from 'react';

const PostcodeLookup = () => {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const API_URL = process.env.REACT_APP_GATEWAY_API_URL;

  const handleLookup = async () => {
    try {
      const response = await fetch(`${API_URL}Lookup/${postcode}`);
      
      if (response.status === 200) {
        const contentLength = response.headers.get('Content-Length');
        if (contentLength === '0') {
            setResult(null);
            setError('Invalid postcode');
        }
        else{
        const data = await response.json();
        setResult(data);
        setError('');}
    
      } else {
        setResult(null);
        setError('Invalid postcode');
      }
    } catch (err) {
      setResult(null);
      setError('Error fetching postcode details');
    }
  };

  return (
    <div>
      <h2>Postcode Lookup</h2>
      <input
        type="text"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
        placeholder="Enter postcode"
      />
      <button onClick={handleLookup}>Lookup</button>
      {result && (
        <div>
          <h3>Postcode Details</h3>
          <p>Postcode: {result.postcode}</p>
          <p>Country: {result.country}</p>
          <p>Region: {result.region}</p>
          <p>Admin District: {result.admindistrict}</p>
          <p>Parliamentary Constituency: {result.parliamentaryconstituency}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PostcodeLookup;
