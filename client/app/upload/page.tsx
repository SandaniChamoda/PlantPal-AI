import Navbar from "@/components/Navbar";
import UploadBox from "@/components/UploadBox";


export default function UploadPage() {

  return (

    <main>

      <Navbar />


      <section className="flex min-h-screen flex-col items-center justify-center px-6">

        <h1 className="text-4xl font-bold">
          Upload Knowledge 🌱
        </h1>


        <p className="mt-3 text-gray-600">
          Add trusted plant documents for PlantPal AI.
        </p>


        <div className="mt-8">

          <UploadBox />

        </div>


      </section>


    </main>

  );
}