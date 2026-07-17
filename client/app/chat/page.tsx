import Navbar from "@/components/Navbar";
import ChatMessage from "@/components/ChatMessage";
import { Button } from "@/components/ui/button";


export default function ChatPage() {

  return (

    <main>

      <Navbar />


      <section className="flex min-h-screen flex-col items-center px-6 pt-16">


        <h1 className="text-4xl font-bold">
          PlantPal AI Chat 🌿
        </h1>


        <div className="mt-8 flex w-full max-w-2xl flex-col rounded-xl border p-6">


          <div className="space-y-4">


            <ChatMessage
              sender="ai"
              message="Hello 👋 How can I help your plants today?"
            />


            <ChatMessage
              sender="user"
              message="Why are my plant leaves turning yellow?"
            />


            <ChatMessage
              sender="ai"
              message="Yellow leaves can happen because of watering issues, sunlight problems, or nutrient deficiency."
            />


          </div>


          <div className="mt-6 flex gap-3">


            <input
              placeholder="Ask about your plant..."
              className="flex-1 rounded-lg border p-3"
            />


            <Button>
              Send
            </Button>


          </div>


        </div>


      </section>


    </main>

  );
}