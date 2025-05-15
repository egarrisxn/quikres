import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useS3Upload } from "next-s3-upload";
import { Resume, ResumeData } from "@/lib/actions";
import { ResumeDataSchema } from "@/lib/resume-schema";
import { PublishStatuses } from "@/components/preview/preview-bar";

const fetchResume = async (): Promise<{
  resume: Resume | undefined;
}> => {
  const response = await fetch("/api/resume");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch resume");
  }
  return await response.json();
};

const fetchUsername = async (): Promise<{
  username: string;
}> => {
  const response = await fetch("/api/username");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch username");
  }
  return await response.json();
};

const checkUsernameAvailability = async (
  username: string
): Promise<{
  available: boolean;
}> => {
  const response = await fetch(
    `/api/check-username?username=${encodeURIComponent(username)}`,
    {
      method: "POST",
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to check username availability");
  }
  return await response.json();
};

export function useUserActions() {
  const queryClient = useQueryClient();
  const { uploadToS3 } = useS3Upload();

  const resumeQuery = useQuery({
    queryKey: ["resume"],
    queryFn: fetchResume,
  });

  const usernameQuery = useQuery({
    queryKey: ["username"],
    queryFn: fetchUsername,
  });

  const internalResumeUpdate = async (newResume: Resume) => {
    const response = await fetch("/api/resume", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newResume),
    });
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(new Error(error));
    }
  };

  const internalUsernameUpdate = async (newUsername: string) => {
    const response = await fetch("/api/username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: newUsername }),
    });
    if (!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return {
      success: true,
    };
  };

  const uploadFileResume = async (file: File) => {
    const fileOnS3 = await uploadToS3(file);
    const newResume: Resume = {
      file: {
        name: file.name,
        url: fileOnS3.url,
        size: file.size,
        bucket: fileOnS3.bucket,
        key: fileOnS3.key,
      },
      resumeData: undefined,
      status: "draft",
    };
    queryClient.setQueryData<{ resume: Resume | undefined }>(
      ["resume"],
      (oldData) => ({
        ...oldData,
        resume: newResume,
      })
    );
    await internalResumeUpdate(newResume);
  };

  const uploadResumeMutation = useMutation({
    mutationFn: uploadFileResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async (newPublishStatus: PublishStatuses) => {
      if (!resumeQuery.data?.resume) return;
      await internalResumeUpdate({
        ...resumeQuery.data?.resume,
        status: newPublishStatus,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  const updateUsernameMutation = useMutation({
    mutationFn: internalUsernameUpdate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["username"] });
    },
    throwOnError: false,
  });

  const checkUsernameMutation = useMutation({
    mutationFn: checkUsernameAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["username-availability"] });
    },
  });

  const saveResumeDataChanges = async (newResumeData: ResumeData) => {
    try {
      ResumeDataSchema.parse(newResumeData);
      if (!resumeQuery.data?.resume) {
        throw new Error("No resume found to update");
      }
      const updatedResume: Resume = {
        ...resumeQuery.data.resume,
        resumeData: newResumeData,
      };
      await internalResumeUpdate(updatedResume);
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Validation failed: ${error.message}`);
      }
      throw error;
    }
  };

  const saveResumeDataMutation = useMutation({
    mutationFn: saveResumeDataChanges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  return {
    resumeQuery,
    uploadResumeMutation,
    toggleStatusMutation,
    usernameQuery,
    updateUsernameMutation,
    checkUsernameMutation,
    saveResumeDataMutation,
  };
}
