import { atom } from "jotai";
import Vehicle from "../types/vehicle";
import Driver from "../types/Driver";
import Route from "../types/Route";

export const vehiclesAtom = atom<Vehicle[]>([]);

export const driversAtom = atom<Driver[]>([]);

export const routesAtom = atom<Route[]>([]);
