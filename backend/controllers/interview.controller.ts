import dbConnect from "../config/dbConnect"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.middleware";

import Interview from "../models/interview.model";
import { InterviewBody } from "../types/interview.types";

const mockQuestion = (numOfQuestions: number) => {
    const questions = [];
    for (let i = 0; i < numOfQuestions; i++) {
        questions.push({
            question: `Mock Question ${i + 1}`,
            answer: `Mock Answer ${i + 1}`,
            
           
        })
    }
    return questions; 

}

export const createInterview = catchAsyncErrors ( async (body: InterviewBody) => {
    await dbConnect();

    const { industry, type, topic, role, numOfQuestions, difficulty, duration, user } = body;

    const questions = mockQuestion(numOfQuestions)

    const newInterview = await Interview.create({
        user,
        industry,
        type,
        topic,
        role,
        numOfQuestions,
        answered: 0,
        difficulty,
        duration: duration * 60,
        durationLeft: duration * 60,
        questions
    })

    return newInterview._id ? {created : true} : (() => {throw new Error("Interview not created")})()

})