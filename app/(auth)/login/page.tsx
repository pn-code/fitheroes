import { SignIn } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Login | FitHeroes",
    description: "Login to your FitHeroes account.",
};

export default function LoginPage() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 rounded-md flex flex-col gap-4 px-2 sm:px-10 text-white/90 justify-center items-center">
            <section className="w-full sm:w-[395px] flex flex-col gap-1 bg-white rounded-md p-6 text-black">
                <h1 className="text-lg font-bold">Guest Account Credentials</h1>
                <p className="text-indigo-600 font-[600]">
                    Try out our services.
                </p>
                <span>Email: guest@fitheroes.com</span>
                <span>Password: 9b7bc049dbd!</span>
            </section>
            <SignIn signUpUrl="/register" redirectUrl={"/dashboard"}/>
        </main>
    );
}
