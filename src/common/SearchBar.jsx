import React, { useEffect } from 'react';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';

const SearchBar = ({ theme }) => {
  function onPlaceSelect(value) {}

  function onSuggectionChange(value) {}
  useEffect(() => {
    if (theme === 'dark') {
      import('@geoapify/geocoder-autocomplete/styles/minimal-dark.css');
    } else {
      import('@geoapify/geocoder-autocomplete/styles/minimal.css');
    }
  }, [theme]);

  return (
    <GeoapifyContext apiKey='YOUR_API_KEY'>
      <GeoapifyGeocoderAutocomplete
        type='city'
        placeholder='Search City...'
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />
    </GeoapifyContext>
  );
};
