import { industries, industryTopics, interviewDifficulties, interviewTypes } from "@/constants/data";
import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document { 
    _id: string;
    question: string;
    answer: string;
    completed: boolean;
    result: {
        overallScore: number;
        clarity: number;
        completeness: number;
        relevence: number;
        suggestions: string;
    }
}
export interface IInterview extends Document {
    _id: string;
    user: mongoose.Schema.Types.ObjectId;
    industry: string;
    type: string;
    topic: string;
    role: string;
    numOfQuestions: number;
    answered: number;
    difficulty: string;
    duration: number;
    durationLeft: number;
    status: string;
    questions: IQuestion[];
}


const questionSchema = new mongoose.Schema<IQuestion>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    completed: { type: Boolean, default: false },
    result: {
        overallScore: { type: Number, default: 0 },
        clarity: { type: Number, default: 0 },
        completeness: { type: Number, default: 0 },
        relevence: { type: Number, default: 0 },
        suggestions: String,
    }
});

const interviewSchema = new mongoose.Schema<IInterview>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    industry: { type: String, required: true, enum: industries },
    type: { type: String, required: true, enum:interviewTypes },
    topic: { type: String, required: true, validate: {
        validator: function (this: IInterview, value: string) {
            return (industryTopics as Record<string, string[]>)[this.industry].includes(value);
        },
        message: (props: any) => `${props.value} is not a valid topic for ${props.instance.industry}`,
    } },
    role: { type: String, required: [true, "Role is Required"] },
    numOfQuestions: { type: Number, required: true },
    answered: { type: Number, default: 0 },
    difficulty: { type: String, required: true, enum: interviewDifficulties },
    duration: { type: Number, required: true , minlength : [2*60, 'Duration must be at least 2 minutes'] },
    durationLeft: { type: Number, required: true },
    status: { type: String, default: "pending", enum:["pending", "completed"] }, // pending, completed
    questions: {type : [questionSchema], default: []},
}, {
    timestamps:true
});

const Interview = mongoose.models.Interview || mongoose.model<IInterview>("Interview", interviewSchema);
export default Interview;