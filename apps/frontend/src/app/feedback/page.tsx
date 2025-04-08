import FeedbackForm from "./feedback-form";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">User Feedback</h1>
        <p className="text-muted-foreground mb-8">
          We value your input! Please share your thoughts, report bugs, or
          suggest new features.
        </p>
        <FeedbackForm />
      </div>
    </main>
  );
}
