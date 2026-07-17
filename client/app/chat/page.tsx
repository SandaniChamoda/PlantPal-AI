import Navbar from "@/components/Navbar";

export default function ChatPage() {
  return (
    <main>
      <Navbar />

      <section className="flex min-h-screen flex-col items-center px-6 pt-20">

        <h1 className="text-4xl font-bold">
          PlantPal AI Chat 🌿
        </h1>

        <div className="mt-8 w-full max-w-2xl rounded-xl border p-6">

          <div className="space-y-4">

            <div className="rounded-lg bg-gray-100 p-4">
              Hello 👋  
              How can I help your plants today?
            </div>


            <div className="rounded-lg bg-green-100 p-4">
              User:
              <br />
              Why are my leaves turning yellow?
            </div>


            <div className="rounded-lg bg-gray-100 p-4">
              AI:
              <br />
              Yellow leaves may happen due to watering problems,
              sunlight issues, or nutrient deficiency.
            </div>

          </div>


          <div className="mt-6 flex gap-3">

            <input
              placeholder="Ask about your plant..."
              className="flex-1 rounded-lg border p-3"
            />

            <button className="rounded-lg bg-green-600 px-6 text-white">
              Send
            </button>

          </div>

        </div>

      </section>
    </main>
  );
}