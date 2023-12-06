export default interface Driver {
  name: string;
  licenseNumber: string;
  phone?: number;
  dateJoined?: string;
  isBooked?: boolean;
}
