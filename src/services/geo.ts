/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a city with a name, latitude, and longitude.
 */
export interface City {
  /**
   * The name of the city.
   */
  name: string;
  /**
   * The latitude of the city.
   */
  lat: number;
  /**
   * The longitude of the city.
   */
  lng: number;
}

/**
 * Asynchronously retrieves a list of cities based on a search query.
 *
 * @param query The search query to use when retrieving cities.
 * @returns A promise that resolves to a list of cities matching the search query.
 */
export async function getCities(query: string): Promise<City[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'San Francisco',
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      name: 'Los Angeles',
      lat: 34.0522,
      lng: -118.2437,
    },
  ];
}
