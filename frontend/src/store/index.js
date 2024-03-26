import { create } from "zustand";

// the hook that will be used to accses the state in our raect app
const useStore = create((set) => ({
  AddUserData: {
    email: localStorage.getItem("form/email") || "",
    password: localStorage.getItem("form/password") || "",
    first_name: localStorage.getItem("form/first_name") || "",
    last_name: localStorage.getItem("form/last_name") || "",
    birth_date: localStorage.getItem("form/birth_date") || "",
    birth_adress: localStorage.getItem("form/birth_adress") || "",
    salary: localStorage.getItem("form/salary") || "",
    martial_situation: localStorage.getItem("form/martial_situation") || "",
    sexe: localStorage.getItem("form/sexe") || "",
    rip: localStorage.getItem("form/rip") || "",
    bank_rib: localStorage.getItem("form/bank_rib") || "",
    id_number: localStorage.getItem("form/id_number") || "",
    role: localStorage.getItem("form/role") || "",
    phone_number: localStorage.getItem("form/phone_number") || "",
    is_active: false,
  },
  UserProfileData:{
    email: localStorage.getItem("profile/email") || "",
    first_name: localStorage.getItem("profile/first_name") || "",
    last_name: localStorage.getItem("profile/last_name") || "",
    birth_date: localStorage.getItem("profile/birth_date") || "",
    birth_adress: localStorage.getItem("profile/birth_adress") || "",
    salary: localStorage.getItem("profile/salary") || "",
    martial_situation: localStorage.getItem("profile/martial_situation") || "",
    sexe: localStorage.getItem("profile/sexe") || "",
    rip: localStorage.getItem("profile/rip") || "",
    bank_rib: localStorage.getItem("profile/bank_rib") || "",
    id_number: localStorage.getItem("profile/id_number") || "",
    role: localStorage.getItem("profile/role") || "",
    phone_number: localStorage.getItem("profile/phone_number") || "",
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
  aids: [],
  setAids: (newAids) => set({ aids: newAids }),
  fetchedAids: false,
  setFetchedAids: (newState) => set({ fetchedAids: newState }),
  allAids : [],
  setAllAids : (newAids) => set({allAids : newAids}),
  fetchedAllAids: false,
  setFetchedAllAids: (newStat) => set({fetchedAllAids : newStat}),
  allLoans : [],
  setAllLoans : (newLoans) => set({allLoans : newLoans}),
  fetchedAllLoans: false,
  setFetchedAllLoans: (newStat) => set({fetchedAllLoans : newStat})
}));

export default useStore;
