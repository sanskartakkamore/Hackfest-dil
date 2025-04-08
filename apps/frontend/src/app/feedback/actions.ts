"use server";

import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project: z.string().min(1),
  feedbackType: z.enum(["bug", "suggestion", "feature", "other"]),
  message: z.string().min(10),
  deviceInfo: z
    .object({
      os: z.string().optional(),
      browser: z.string().optional(),
      deviceType: z.string().optional(),
      screenResolution: z.string().optional(),
      userAgent: z.string().optional(),
    })
    .optional(),
  stepsToReproduce: z.array(z.string()).optional(),
  severity: z.enum(["low", "medium", "high", "critical"]).optional(),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

export async function submitFeedback(data: FeedbackData) {
  // Validate the data
  const validatedData = feedbackSchema.parse(data);

  // Simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send this data to your backend
  // For example:
  // const response = await fetch('/api/feedback', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(validatedData),
  // })

  // if (!response.ok) {
  //   throw new Error('Failed to submit feedback')
  // }

  console.log("Feedback submitted:", validatedData);

  // Return success
  return { success: true };
}
