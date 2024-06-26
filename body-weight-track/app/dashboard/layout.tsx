import TopBar from "../ui/dashboard/TopBar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
}
