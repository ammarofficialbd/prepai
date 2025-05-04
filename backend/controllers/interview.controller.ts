import dbConnect from "../config/dbConnect"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.middleware";
// ✅ Make sure this is used in both controller & middleware
import { Request, Response, NextFunction } from "express";

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

export const createInterviewService = async (body: InterviewBody) => {
    await dbConnect();
  
    const {
      industry,
      type,
      topic,
      role,
      numOfQuestions,
      difficulty,
      duration,
      user,
    } = body;
  
    const questions = mockQuestion(numOfQuestions);
  
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
      questions,
    });
  

    return newInterview._id ? {created : true} : {create: false, error: "Interview not created"}

}

/* export const createInterview = catchAsyncErrors(
    async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as InterviewBody;
        const interview = await createInterviewService(body);
        return interview
    }
); */