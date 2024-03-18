import { create } from "zustand";

// the hook that will be used to accses the state in our raect app
const useStore = create((set) => ({
  AddUserData: {
    email: sessionStorage.getItem("form/email") || "",
    password: sessionStorage.getItem("form/password") || "",
    first_name: sessionStorage.getItem("form/first_name") || "",
    last_name: sessionStorage.getItem("form/last_name") || "",
    birth_date: sessionStorage.getItem("form/birth_date") || "",
    birth_adress: sessionStorage.getItem("form/birth_adress") || "",
    salary: sessionStorage.getItem("form/salary") || "",
    martial_situation: sessionStorage.getItem("form/martial_situation") || "",
    sexe: sessionStorage.getItem("form/sexe") || "",
    rip: sessionStorage.getItem("form/rip") || "",
    bank_rib: sessionStorage.getItem("form/bank_rib") || "",
    id_number: sessionStorage.getItem("form/id_number") || "",
    role: sessionStorage.getItem("form/role") || "",
    phone_number: sessionStorage.getItem("form/phone_number") || "",
    is_active: false,
  },
  adminUsers: [],
  setAdminUsers: (newAdminUsers) => set({ adminUsers: [ ...newAdminUsers] }),
  setAddUserData: (newFormData) => set({ AddUserData: newFormData }),
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));

export default useStore;
