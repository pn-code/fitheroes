import { SignUp } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Register | FitHeroes",
    description: "Sign up for FitHeroes",
};

export default function RegisterPage() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 rounded-md flex flex-col gap-4 px-2 sm:px-10 text-white/90 justify-center items-center">
            <SignUp signInUrl="/login" />
        </main>
    );
}
