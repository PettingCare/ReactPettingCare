import {create} from "zustand";
import { persist } from "zustand/middleware";

let appInstance = (set) => ({

    //para abrir y cerrar la Sidenav desde la navBar superior
    dopen: true,
    updateOpen:(dopen) => set((state) => ({dopen:dopen})),
});

appInstance =  persist(appInstance,{name: "app_instancia"});
export const usoAppInstance = create(appInstance);


