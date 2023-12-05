import { atom } from "jotai";
import Vehicle from "../types/vehicle";
import Driver from "../types/Driver";

export const vehiclesAtom = atom<Vehicle[]>([]);

export const driversAtom = atom<Driver[]>([]);
