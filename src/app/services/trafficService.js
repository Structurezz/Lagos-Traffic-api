
import axios from 'axios';
import { API_KEY, BASE_URL } from '../../lib/config/config.js';

export const fetchTrafficData = async (origin, destination) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        origin,
        destination,
        key: API_KEY,
      },
    });
    const { data } = response;
    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Failed to fetch traffic data');
    }
    const route = data.routes[0];
    const travelInfo = {
      distance: route.legs[0].distance.text,
      duration: route.legs[0].duration.text,
      start_address: route.legs[0].start_address,
      end_address: route.legs[0].end_address,
      steps: route.legs[0].steps.map(step => ({
        instruction: step.html_instructions,
        distance: step.distance.text,
        duration: step.duration.text,
      })),
    };
    return travelInfo;
  } catch (error) {
    throw new Error(`Error fetching traffic data: ${error.message}`);
  }
};

