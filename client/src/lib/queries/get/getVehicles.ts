import axios from "axios";
import { BACKEND_URL } from "../../constants";

export default async function getVehicles() {
  try {
    const response = await axios.post(`${BACKEND_URL}/get-vehicles`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
