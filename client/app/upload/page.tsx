import Navbar from "@/components/Navbar";

export default function UploadPage() {
  return (
    <main>
      <Navbar />

      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-bold">
          Upload Knowledge 🌱
        </h1>

        <p className="mt-3 text-gray-600">
          Upload plant care documents and teach PlantPal AI.
        </p>

        <div className="mt-8 w-full max-w-md rounded-xl border p-8 shadow-sm">
          <label className="mb-3 block font-medium">
            Select PDF Document
          </label>

          <input
            type="file"
            accept=".pdf"
            className="w-full rounded-lg border p-3"
          />

          <label className="mt-6 mb-3 block font-medium">
            Knowledge Type
          </label>

          <select className="w-full rounded-lg border p-3">
            <option>Plant Care Guide</option>
            <option>Plant Disease Guide</option>
            <option>Fertilizer Guide</option>
            <option>Watering Guide</option>
          </select>

          <button className="mt-6 w-full rounded-lg bg-green-600 py-3 text-white">
            Upload Knowledge
          </button>
        </div>
      </section>
    </main>
  );
}