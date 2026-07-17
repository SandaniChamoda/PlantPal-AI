export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4">
      <h1 className="text-xl font-bold">
        🌿 PlantPal AI
      </h1>

      <div className="flex gap-6">
        <a href="/">Home</a>
        <a href="/upload">Upload</a>
        <a href="/chat">Chat</a>
      </div>
    </nav>
  );
}