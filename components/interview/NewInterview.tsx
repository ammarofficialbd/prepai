"use client";

import React from "react";
import {
  Form,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { industryTopics, interviewDifficulties, interviewTypes } from "@/constants/data";
import { InterviewBody } from "@/backend/types/interview.types";
import useGenericSubmitHandler from "@/hooks/useGenericHandler";
import { useSession } from "next-auth/react";
import { IUser } from "@/backend/models/user.model";
import { newInterview } from "@/actions/interview.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const interviewIndustries = Object.keys(industryTopics)

export default function NewInterview() {
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>("");
  const [topics, setTopics] = React.useState<string[]>([]);
 const {data} = useSession()
 const user = data?.user as IUser
 const router = useRouter()
  const handleIndusryChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
   const industry = e.target.value as keyof typeof industryTopics;
    setSelectedIndustry(industry);
    setTopics(industryTopics[industry] || []);
  };


  const {handleSubmit, loading} = useGenericSubmitHandler(async (data) => {
    const interviewData: InterviewBody = {
      industry: data.industry as string,
      topic: data.topic as string,
      type: data.type as string,
      role: data.role as string,
      difficulty: data.difficulty as string,
      numOfQuestions: Number(data.numOfQuestions),
      duration: Number(data.duration),
      user: user?._id!
    }

    const res = await newInterview(interviewData)

    if(res?.error) {
      toast.error(res.error)
    }
    if(res?.created) {   
      toast.success("Interview created successfully")
      router.push("/app/interviews")
    } 

  })


  return (
    <div className="p-4">
      <Form validationBehavior="native" onSubmit={handleSubmit} className={loading ? "opacity-50 pointer-events-none" : ""}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="col-span-1">
            <h3 className="text-xl">Select all options below:</h3>
          </div>

          <div className="col-span-1">
            <div className="flex gap-4 max-w-sm justify-end items-center">
              <Button color="primary" type="submit" isLoading={loading} isDisabled={loading}>  
                Create Interview
              </Button>
              <Button type="reset" variant="bordered">
                Reset
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 w-full">
          <div className="col-span-1">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <Select
                  isRequired
                  label="Industry"
                  labelPlacement="outside"
                  name="industry"
                  placeholder="Select Industry"
                  onChange={handleIndusryChange}
                >
                  {interviewIndustries.map((industry) => (
                    <SelectItem key={industry} textValue={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="Topic"
                  labelPlacement="outside"
                  name="topic"
                  placeholder="Select Topic"
                >
                  {topics.map((topic) => (
                    <SelectItem key={topic} textValue={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </Select>

                <Select
                  isRequired
                  label="Interview Type"
                  labelPlacement="outside"
                  name="type"
                  placeholder="Select interview type"
                >
                  {
                    interviewTypes.map((type) => (
                      <SelectItem key={type} textValue={type}>
                        {type}
                      </SelectItem>
                    ))
                  }
                 
                </Select>

                <Input
                  isRequired
                  type="text"
                  label="Job Role"
                  labelPlacement="outside"
                  name="role"
                  placeholder="software developer, data scientist, etc."
                />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="w-full flex flex-col space-y-4">
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <Select
                  isRequired
                  label="Difficulty"
                  labelPlacement="outside"
                  name="difficulty"
                  placeholder="Select difficulty"
                >
                  {interviewDifficulties.map((difficulty) => (
                    <SelectItem key={difficulty} textValue={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))
                  }
                </Select>

                <Input
                  isRequired
                  type="number"
                  label="No of Question"
                  labelPlacement="outside"
                  name="numOfQuestions"
                  placeholder="Enter no of questions"
                />

                <Input
                  isRequired
                  type="number"
                  label="Duration"
                  labelPlacement="outside"
                  name="duration"
                  placeholder="Enter duration"
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}