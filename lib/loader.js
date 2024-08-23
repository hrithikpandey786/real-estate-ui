import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({request, params}) =>{
    const res = await apiRequest.get(`/posts/${params.id}`);
    return res.data;
}

export const listPageLoader = async ({request, params}) =>{
    try{
        const query = request.url.split("?")[1];
        const postPromise = apiRequest.get(`/posts/?${query}`);
        return defer({
            postResponse: postPromise
        })
    } catch(err){
        console.log(err);
        return null;
    }
}

export const profilePageLoader= async (request, params)=>{
    try{
        const posts = await apiRequest.get("/users/profilePosts");
        const chatPromise = await apiRequest.get("/chats");

        return defer({
            postResponse: posts,
            chatResponse: chatPromise
        })

    } catch(err){
        console.log(err);
        return "Failed to get Posts";
    }
}