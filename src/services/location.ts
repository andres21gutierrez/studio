/**
 * Represents an address.
 */
export interface Address {
  /**
   * The street address.
   */
  street: string;
  /**
   * The city.
   */
  city: string;
  /**
   * The state.
   */
  state: string;
  /**
   * The zip code.
   */
  zip: string;
}

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
 * Asynchronously retrieves location information for a given address.
 *
 * @param address The address for which to retrieve location data.
 * @returns A promise that resolves to a Location object containing latitude and longitude.
 */
export async function getLocation(address: Address): Promise<Location> {
  // TODO: Implement this by calling an API.

  return {
    lat: 34.0522,
    lng: -118.2437,
  };
}
