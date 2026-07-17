import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UploadBox() {
  return (
    <Card className="w-full max-w-md p-8">

      <h2 className="text-xl font-semibold">
        Upload Plant Knowledge
      </h2>

      <p className="mt-2 text-sm text-gray-600">
        Upload gardening documents to teach PlantPal AI.
      </p>


      <div className="mt-6">

        <label className="mb-2 block text-sm font-medium">
          Select PDF
        </label>

        <input
          type="file"
          accept=".pdf"
          className="w-full rounded-lg border p-3"
        />

      </div>


      <div className="mt-5">

        <label className="mb-2 block text-sm font-medium">
          Knowledge Type
        </label>


        <select className="w-full rounded-lg border p-3">

          <option>
            Plant Care Guide
          </option>

          <option>
            Plant Disease Guide
          </option>

          <option>
            Fertilizer Guide
          </option>

          <option>
            Watering Guide
          </option>

        </select>

      </div>


      <Button className="mt-6 w-full">
        Upload Knowledge
      </Button>


    </Card>
  );
}
