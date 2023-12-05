import axios from "axios";
import { BACKEND_URL } from "../../constants";
import Vehicle from "../../types/vehicle";

export default async function addVehicle(vehicle: Vehicle) {
  try {
    const response = await axios.post(`${BACKEND_URL}/add-vehicle`, vehicle);
    // TODO add logic to test if response is successful or not
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}
