import { userRoles } from "@/constants/constants";
import mongoose, {Document} from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document{
_id: string;
name: string;
email: string;
roles: string[];
profilePicture: {
    id : string;
    url: string | null;
};
password?: string | null;
authProviders: {
    provider: string;
    providerId: string; 
}[];
subscription :{
    id: string;
    customer: string;
    created: string;
    status: string;
    startDate: Date;
    currentPeriodEndDate: Date;
    nextPaymentAttempt: Date
}
}

const authProviderSchema = new mongoose.Schema({
provider: {
    type: String,
    required: true,
    enum: ["google", "github", "credential"]
},
providerId: {   type: String, required: true }
})

const UserSchema = new mongoose.Schema<IUser> ({
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: [true, "Email already exists"],
    lowercase: true
},
roles: {
    type: [String],
    default: ["user"],
    enum: userRoles
},
profilePicture: {
    id: String,
    url: {
        type: String,
        required: true,
        default: "/images/default_user.png"
    }
},
password: { 
    type: String, 
    select: false, 
    minlength:[8, ""] , 
    default: null,
},
authProviders: {
    type: [authProviderSchema],
    default: []
},
subscription: {
    id: String,
    customer: String,
    created: String,
    status: String,
    startDate: Date,
    currentPeriodEndDate: Date,
    nextPaymentAttempt: Date
}
}, { timestamps: true });

// Check if the password was modified

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { return next(); }
    /* Purpose of isModified:
The isModified method is a Mongoose-specific function that checks whether a particular field in a document (in this case, "password") has been modified since it was last saved. This is useful when you want to perform certain actions, such as hashing a password, only if the password field has been changed.

Condition Explanation:
The if statement checks if the "password" field has not been modified. The ! operator negates the result of isModified("password"). If the password has not been changed, the condition evaluates to true.

Early Return with next:
The return next(); is a common pattern in middleware functions, particularly in Mongoose pre-save hooks. It tells Mongoose to proceed to the next middleware or save operation without performing any additional logic. This ensures that unnecessary operations, like re-hashing an unchanged password, are avoided.

Contextual Use Case:
This snippet is likely part of a Mongoose pre-save hook, where you want to hash the user's password before saving it to the database. By checking if the password has been modified, you avoid re-hashing the password every time the user document is saved, which could lead to issues like double-hashing. */

    if(this.password) this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);    
}
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;