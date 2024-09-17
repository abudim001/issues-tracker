// page.tsx (Form Submission Frontend):
// * What it does: This file represents the frontend or the user interface where users can fill out a form to create a new issue (with a title and description).
// * Key Role:
//   - The useForm from react-hook-form manages the form inputs.
//   - When the form is submitted, it sends a POST request to your backend API using axios to create the new issue.
//   - After the submission, it navigates the user to the home page (router.push("/")).
"use client";

import React, { useActionState, useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssuesForm {
  title: string;
  description: string;
}

const NewIssuesPage = () => {
  const { register, control, handleSubmit } = useForm<IssuesForm>();
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-3">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/");
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        {" "}
        <TextField.Root placeholder="Title" {...register("title")} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuesPage;
