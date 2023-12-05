export default interface Booking {
  date: string;
  time: string;
  origin: string;
  destination: string;
  status: "pending" | "confirmed" | "cancelled";
  routeCode: string;
  fare: number;
}
