import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">
          🌿 PlantPal AI
        </h1>

        <p className="mt-4 text-lg">
          Your Intelligent Home Botanist
        </p>

        <div className="mt-8 flex gap-4">
          <button className="rounded-lg bg-green-600 px-6 py-3 text-white">
            Start Chat
          </button>

          <button className="rounded-lg border px-6 py-3">
            Upload Knowledge
          </button>
        </div>
      </section>
    </main>
  );
}