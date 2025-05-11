import Link from "next/link";

function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center w-full h-full p-4 text-center text-black dark:text-white" aria-label="404 Not Found">
            <img
                src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXdkdm91c2dxOXF5ejhmODhoN3ZuZmUxcm80d294eGhjeXBnb2sxZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jUwpNzg9IcyrK/giphy.gif"
                alt="404 - Whoops!"
                className="max-w-xs mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">Whoops! You caught me slipping.</h1>
            <p>
                This page doesn't exist (yet). Let's get you back{" "}
                <Link href="/" className="underline">
                    home
                </Link>.
            </p>
        </main>
    );
}

export default NotFound;