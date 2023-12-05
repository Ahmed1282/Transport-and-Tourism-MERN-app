import { atom } from "jotai";
import Vehicle from "../types/vehicle";

export const vehiclesAtom = atom<Vehicle[]>([]);
