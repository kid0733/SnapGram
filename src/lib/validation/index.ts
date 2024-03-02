import * as z from "zod"


export const SignupValidation=z.object({
    name: z.string().min(2,{message:'Too short'}).max(50),
    username: z.string().min(2, {message:'Too short'}).max(50),
    email: z.string().email().max(50),
    password: z.string().min(8, {message:'Password must be atleast 8 character.'}).max(50),
})


export const SigninValidation=z.object({
    email: z.string().email().max(50),
    password: z.string().min(8, {message:'Password must be atleast 8 character.'}).max(50),
})



export const PostValidation=z.object({
    caption: z.string().min(8, {message:'Must be at least 8 characters'}).max(2200),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
    
})