import {create} from "zustand";
import apiRequest from "./apiRequest.js";

export const useNotificationStore = create((set)=>({
    number: 0,
    fetch: async()=>{
        try{
            const res = await apiRequest("/users/notification");
            if(!res){
                throw new Error("error fetching notification number")
            }
            set({number: res.data});
        } catch(err){
            console.log(err);
        }
    },

    decrease: ()=>{
        set((prev)=>({number: prev.number-1}));
    },

    reset:()=>{
        set({number: 0});
    }
}))