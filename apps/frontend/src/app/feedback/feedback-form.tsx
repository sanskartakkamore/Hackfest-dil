"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { z } from "zod";
import { Check, Loader2, Plus, Trash } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { submitFeedback } from "./actions";
import data from "./data.json";


export const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters." }),

    email: z.string().email({ message: "Please enter a valid email address." }),

    project: z.string().min(1, { message: "Please select a project." }),

    type: z.enum(["bug", "suggestion", "feature", "other"], {
      required_error: "Please select a feedback type.",
    }).default("suggestion"),

    message: z
      .string()
      .min(10, { message: "Feedback must be at least 10 characters." }),

    stepsToReproduce: z.array(z.string()).optional(),

    severity: z.string().optional(),

    deviceInfo: z
      .object({
        os: z.string().optional(),
        browser: z.string().optional(),
        deviceType: z.string().optional(),
        screenResolution: z
          .string().optional(),
        userAgent: z.string().optional(),
      })
      .optional(),

    featureDescription: z
      .string()
      .optional(),

    useCase: z
      .string()
      .optional(),

    benefits: z
      .string()
      .optional(),

    priority: z.string().optional(),

    similarFeature: z
      .string()
      .optional(),

    suggestionDescription: z
      .string()
      .optional(),

    rationale: z
      .string()
      .optional(),

    potentialImpact: z
      .string()
      .optional(),

    relatedIdea: z
      .string()
      .optional(),

    suggestionType: z
      .string()
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === "bug") {
        // Bug-related fields validation
        return (
          !!data.severity &&
          !!data.stepsToReproduce?.length &&
          !!data.deviceInfo?.os &&
          !!data.deviceInfo?.browser &&
          !!data.deviceInfo?.deviceType &&
          !!data.deviceInfo?.screenResolution &&
          !!data.deviceInfo?.userAgent
        );
      } else if (data.type === "feature") {
        // Feature-related fields validation
        return !!data.featureDescription && !!data.useCase && !!data.benefits;
      } else if (data.type === "suggestion") {
        // Suggestion-related fields validation
        return (
          !!data.suggestionDescription &&
          !!data.rationale &&
          !!data.potentialImpact
        );
      }
      return true;
    },
    { message: "All bug-related fields are required." }
  );

type FormValues = z.infer<typeof formSchema>;

const projects = [
  { id: "website", name: "Company Website" },
  { id: "dashboard", name: "Analytics Dashboard" },
  { id: "mobile-app", name: "Mobile Application" },
  { id: "api", name: "API Services" },
];

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      project: "",
      type: "suggestion",
      message: "",
      stepsToReproduce: [],
      severity: "",
      deviceInfo: {
        os: "",
        browser: "",
        deviceType: "",
        screenResolution: "",
        userAgent: "",
      },
      featureDescription: "",
      useCase: "",
      benefits: "",
      priority: "low",
      similarFeature: "",
      suggestionDescription: "",
      rationale: "",
      potentialImpact: "",
      relatedIdea: "",
      suggestionType: "",
    },
  });

  const type = form.watch("type");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "stepsToReproduce",
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      await submitFeedback(data);
      setIsSuccess(true);
      toast.success("Feedback submitted", {
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      toast.error("Error", {
        description: "There was a problem submitting your feedback.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Thank You!</CardTitle>
          <CardDescription className="text-center">
            Your feedback has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setIsSuccess(false);
              form.reset();
            }}
          >
            Submit another feedback
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Feedback</CardTitle>
        <CardDescription>
          Share your thoughts, report issues, or suggest improvements.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Feedback Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bug" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Bug Report
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="suggestion" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Suggestion
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="feature" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Feature Request
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="font-normal">Other</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {type === "bug" && (
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select severity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === "feature" && (
                <>
                  <FormField
                    control={form.control}
                    name="featureDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feature Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the feature in detail..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="useCase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Use Case</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain how this feature will be used..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefits</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the benefits of this feature..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="similarFeature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Similar Feature in Market</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any similar existing feature..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {type === "suggestion" && (
                <>
                  <FormField
                    control={form.control}
                    name="suggestionDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestion Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your suggestion..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rationale"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rationale</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Why is this suggestion important?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="potentialImpact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potential Impact</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How will this suggestion improve the system?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="relatedIdea"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Related Idea (if any)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Any similar or related idea?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="suggestionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Suggestion Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="user_experience_improvement">
                              User Experience Improvement
                            </SelectItem>
                            <SelectItem value="performance_optimization">
                              Performance Optimization
                            </SelectItem>
                            <SelectItem value="new_feature_idea">
                              New Feature Idea
                            </SelectItem>
                            <SelectItem value="content_suggestion">
                              Content Suggestion
                            </SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Feedback</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your feedback in detail..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Be as specific as possible to help us understand your
                    feedback better.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "bug" && (
              <>
                <FormLabel>Device Information</FormLabel>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deviceInfo.os"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operating System</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select OS" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.operatingSystems.map((os) => (
                              <SelectItem key={os} value={os}>
                                {os}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deviceInfo.browser"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Browser</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Browser" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.browsers.map((browser) => (
                              <SelectItem key={browser} value={browser}>
                                {browser}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deviceInfo.deviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Device Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Device Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.deviceTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deviceInfo.screenResolution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Screen Resolution</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Resolution" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.screenResolutions.map((resolution) => (
                              <SelectItem key={resolution} value={resolution}>
                                {resolution}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="deviceInfo.userAgent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Agent</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select User Agent or Enter Manually" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {data.userAgents.map((ua) => (
                              <SelectItem key={ua} value={ua}>
                                {ua}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {type === "bug" && (
              <div className="mb-4">
                <FormLabel className="mb-3">Steps to Reproduce</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex space-y-2">
                    <Input
                      {...form.register(`stepsToReproduce.${index}`)}
                      placeholder={`Step ${index + 1}`}
                    />
                    <Button
                      className="ms-2"
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append("")}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Step
                </Button>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
