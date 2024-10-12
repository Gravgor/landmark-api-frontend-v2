import Sidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({children} : {children: React.ReactNode}) {
    return (
        <>
        <Sidebar />
        {children}
        </>
    )
}