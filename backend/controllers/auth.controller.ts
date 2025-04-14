
import dbConnect from "../config/dbConnect"
import User from "../models/user.model"

export const register = async (name: string, email: string, password: string) => {
    await dbConnect()

    const newUser = await User.create({
        name,
        email,
        password,
        authProviders:[
            {
                provider: "credential",
                providerId: email,
            }
        ],
        
    })

    return newUser?._id 
    ? {create : true} : ( () => {throw new Error("User not created")} )()

}