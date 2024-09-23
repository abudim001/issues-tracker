// page.tsx (Form Submission Frontend):
// * What it does: This file represents the frontend or the user interface where users can fill out a form to create a new issue (with a title and description).
// * Key Role:
//   - The useForm from react-hook-form manages the form inputs.
//   - When the form is submitted, it sends a POST request to your backend API using axios to create the new issue.
//   - After the submission, it navigates the user to the home page (router.push("/")).
"use client";

import { ErrorMessages, Spinner } from "@/app/Components";
import { IssueSchema } from "@/app/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type IssuesFormData = z.infer<typeof IssueSchema>;

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const IssueForm = async ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesFormData>({
    resolver: zodResolver(IssueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmiting, setSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmiting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues");
      router.refresh();
    } catch (error) {
      setSubmiting(false);
      setError("An unexpected error occurredu.");
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
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        />
        <ErrorMessages>{errors.title?.message}</ErrorMessages>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessages>{errors.description?.message}</ErrorMessages>
        <Button disabled={isSubmiting}>
          {issue ? "Update issue" : "Submit New Issue "}
          {""}
          {isSubmiting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
