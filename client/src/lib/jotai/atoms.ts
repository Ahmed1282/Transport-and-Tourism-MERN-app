import { atom } from "jotai";
import Vehicle from "../types/vehicle";
import Driver from "../types/Driver";
import Route from "../types/Route";
import Booking from "../types/booking";

export const vehiclesAtom = atom<Vehicle[]>([]);

export const driversAtom = atom<Driver[]>([]);

export const routesAtom = atom<Route[]>([]);

export const bookingsAtom = atom<Booking[]>([]);
