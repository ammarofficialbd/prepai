"use server";

import { createInterviewService } from "@/backend/controllers/interview.controller";
import { InterviewBody } from "@/backend/types/interview.types";


export async function newInterview(body: InterviewBody) {
    return await createInterviewService(body)
}