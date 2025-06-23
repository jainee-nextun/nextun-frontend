import Sidebar from "../components/layout/Sidebar";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#FAFAFE] p-8">Trades Page</main>
    </div>
  );
}
