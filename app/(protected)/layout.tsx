'use server'
import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";

async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <>
            {children}
        </>
    );
}

export default Layout;
