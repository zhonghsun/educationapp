import React from 'react';
import { API } from 'aws-amplify';

const Venue = props => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [venue, setVenue] = React.useState(null);

  React.useEffect(() => {
    const loadVenueById = () => {
      return API.get('venues', `/venues/${props.match.params.id}`);
    };

    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const venue = await loadVenueById();
        setVenue(venue);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  return <div>
    {isLoading && <h1>Loading venue...</h1>}
    {venue && JSON.stringify(venue)}
  </div>;
};

export default Venue;
