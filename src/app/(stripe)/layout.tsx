import { UserProvider } from "@/components/providers/UserProvider";


export default function LocalLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UserProvider>
                {children}
            </UserProvider>
        </>
    )
}