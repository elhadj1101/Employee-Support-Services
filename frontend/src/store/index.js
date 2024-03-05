import { create} from "zustand";

// the hook that will be used to accses the state in our raect app 
export default useStore = create((set)=>({
    authUser:null,
    requestLoading:false,
    setAuthUser:(user) => set((state)=>({...state , authUser:user})),
    setRequestLoading: (isLoading) =>
    set((state) => ({ ...state, requestLoading: isLoading })),

}))