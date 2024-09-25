import Image from "next/image";
import AuthAnimation from "@/components/shared/AuthAnimation";

interface AuthlayoutProps {
    children: React.ReactNode;
}

const Authlayout: React.FC<AuthlayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen p-5 bg-muted">
            <div className="flex items-center justify-center gap-4">
                <Image src="/icon.png" alt="Bloggy Icon" width={80} height={80} />
                <h1 className="text-5xl font-bold text-primary">PulseTracker</h1>
            </div>
            <span className="text-muted-foreground text-md self-center">
                Crush your fitness goals—track workouts, discover exercises, and watch your progress soar with every rep!
            </span>
            <div className="flex flex-col md:flex-row items-center justify-center flex-grow gap-8">
                <div className="flex flex-col bg-background rounded-3xl shadow-lg relative p-4 m-5 w-full md:w-1/2 lg:w-3/5 lg:m-10">
                    {children}
                </div>
                <div className="hidden md:block md:w-1/2 lg:w-2/5">
                    <AuthAnimation />
                </div>
            </div>
        </div>
    );
};

export default Authlayout;
