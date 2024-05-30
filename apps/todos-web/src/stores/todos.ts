import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {}

export const useTodosStore = create(immer<Store>(() => ({})));
