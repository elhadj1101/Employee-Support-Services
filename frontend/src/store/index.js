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
  UserProfileData:{
    email: sessionStorage.getItem("profile/email") || "",
    first_name: sessionStorage.getItem("profile/first_name") || "",
    last_name: sessionStorage.getItem("profile/last_name") || "",
    birth_date: sessionStorage.getItem("profile/birth_date") || "",
    birth_adress: sessionStorage.getItem("profile/birth_adress") || "",
    salary: sessionStorage.getItem("profile/salary") || "",
    martial_situation: sessionStorage.getItem("profile/martial_situation") || "",
    sexe: sessionStorage.getItem("profile/sexe") || "",
    rip: sessionStorage.getItem("profile/rip") || "",
    bank_rib: sessionStorage.getItem("profile/bank_rib") || "",
    id_number: sessionStorage.getItem("profile/id_number") || "",
    role: sessionStorage.getItem("profile/role") || "",
    phone_number: sessionStorage.getItem("profile/phone_number") || "",
    is_active: false,
  },
  adminUsers: [],
  fetchedAdminUsers: false,
  setFetchedAdminUsers: (newState)=> set({fetchedAdminUsers: newState}),
  setAdminUsers: (newAdminUsers) => set({ adminUsers: [ ...newAdminUsers] }),
  profileRequsted: localStorage.getItem("profileRequsted") || null,
  setProfileRequsted: (newProfileRequsted) => set({ profileRequsted: newProfileRequsted }),

  setAddUserData: (newFormData) => set({ AddUserData: newFormData }),
  setProfileUserData : (newFormData) => set({ UserProfileData: newFormData }),
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("access_token");
    set({ user: null });
  },
  offres: [],
  setOffres: (newOffres) => set({ offres: newOffres }),
  fetchedOffres: false,
  setFetchedOffres: (newState) => set({ fetchedOffres: newState }),
  loans: [],
  setLoans: (newLoans) => set({ loans: newLoans }),
  fetchedLoans: false,
  setFetchedLoans: (newState) => set({ fetchedLoans: newState }),
}));

export default useStore;
