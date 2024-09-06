import React, { useState } from 'react';
import PostcodeLookup from './components/PostcodeLookup';
import PostcodeAutocomplete from './components/PostcodeAutocomplete';

const App = () => {
  const [view, setView] = useState('');

  return (
    <div>
      <h1>Postcode App</h1>
      <button onClick={() => setView('lookup')}>Lookup Postcode</button>
      <button onClick={() => setView('autocomplete')}>Autocomplete Postcode</button>
      {view === 'lookup' && <PostcodeLookup />}
      {view === 'autocomplete' && <PostcodeAutocomplete />}
    </div>
  );
};

export default App;