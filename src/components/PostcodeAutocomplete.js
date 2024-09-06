import React, { useState } from 'react';

const PostcodeAutocomplete = () => {
  const [partialPostcode, setPartialPostcode] = useState(null);
  const [matches, setMatches] = useState([]);
  const [selectedPostcode, setSelectedPostcode] = useState(null);
  const [error, setError] = useState('');
  const API_URL = 'https://localhost:7076/';
  const handleAutocomplete = async () => {
    try {
      const response = await fetch(`${API_URL}AutoComplete/${partialPostcode}`);
      
      if (response.status === 200) {
        const contentLength = response.headers.get('Content-Length');
        if (contentLength === '0') {
          setMatches([]);
            setError('Invalid postcode');
        }
        else{
        const data = await response.json();
        setMatches(data);
        setError('');}
    
      } else {
        setMatches([]);
        setError('Invalid postcode');
      }
    } catch (err) {
      setMatches([]);
      setError('Error fetching postcode details');
    }
  };

  const handleSelect = (postcode) => {
    // Replace this with actual postcode details fetching logic
    setSelectedPostcode({ postcode, city: 'Sample City', state: 'Sample State' });
    setMatches([]);
  };

  return (
    <div>
      <h2>Postcode Autocomplete</h2>
      <input
        type="text"
        value={partialPostcode}
        onChange={(e) => setPartialPostcode(e.target.value)}
        placeholder="Enter partial postcode"
      />
      <button onClick={handleAutocomplete}>Autocomplete</button>
      <ul>
        {matches.map((postcode) => (
          <li key={postcode} onClick={() => handleSelect(postcode)}>
            {postcode}
          </li>
        ))}
      </ul>
      {selectedPostcode && (
        <div>
          <h3>Postcode Details</h3>
          <p>Postcode: {selectedPostcode.postcode}</p>
          <p>City: {selectedPostcode.city}</p>
          <p>State: {selectedPostcode.state}</p>
        </div>
      )}  {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PostcodeAutocomplete;