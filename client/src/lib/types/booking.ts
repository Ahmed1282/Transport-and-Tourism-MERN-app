import Driver from "./Driver";

export default interface Booking {
  _id?: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  routeCode?: string;
  fare?: number;
  driver?: Driver;
}
