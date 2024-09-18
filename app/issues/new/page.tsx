// page.tsx (Form Submission Frontend):
// * What it does: This file represents the frontend or the user interface where users can fill out a form to create a new issue (with a title and description).
// * Key Role:
//   - The useForm from react-hook-form manages the form inputs.
//   - When the form is submitted, it sends a POST request to your backend API using axios to create the new issue.
//   - After the submission, it navigates the user to the home page (router.push("/")).
"use client";

import React, { useActionState, useState } from "react";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { z } from "zod";
import ErrorMessages from "@/app/Components/ErrorMessages";
import Spinner from "@/app/Components/Spinner";

type IssuesForm = z.infer<typeof createIssueSchema>;

const NewIssuesPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setSubmiting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        {" "}
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessages>{errors.title?.message}</ErrorMessages>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessages>{errors.description?.message}</ErrorMessages>
        <Button disabled={isSubmiting}>
          Submit New Issue {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
