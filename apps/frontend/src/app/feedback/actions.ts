"use server";

import { z } from "zod";

const feedbackSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),

  project: z.string().min(1, { message: "Please select a project." }),

  feedbackType: z.enum(["bug", "suggestion", "feature", "other"], {
    required_error: "Please select a feedback type.",
  }).default("suggestion"),

  message: z
    .string()
    .min(10, { message: "Feedback must be at least 10 characters." }),

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

  severity: z.string().optional(),

  featureDescription: z.string().optional(),

  useCase: z.string().optional(),

  benefits: z.string().optional(),

  priority: z.string().optional(),

  similarFeature: z.string().optional(),

  suggestionDescription: z.string().optional(),

  rationale: z.string().optional(),

  potentialImpact: z.string().optional(),

  relatedIdea: z.string().optional(),

  suggestionType: z.string().optional(),
})

type FeedbackData = z.infer<typeof feedbackSchema>;

export async function submitFeedback(data: FeedbackData) {
  console.log("Hi data:", data);
  // Validate the data
  const validatedData = feedbackSchema.parse(data);


  // Simulate a delay to mimic API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real application, you would send this data to your backend
  // For example:
  const response = await fetch('http://localhost:3002/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(validatedData),
  })

  if (!response.ok) {
    throw new Error('Failed to submit feedback')
  }

  console.log("Feedback submitted:", validatedData);

  // Return success
  return { success: true };
}
