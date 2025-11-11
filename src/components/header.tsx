import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Icons } from "./icons";

export default function Header() {
    return (
        <Card className="z-0 fixed top-2 left-1/2 transform -translate-x-1/2 w-fit rounded-full flex flex-row items-center gap-64 px-2 py-2">
            <section className="pl-4 flex items-center gap-2 h-fit">
                <Button variant="link" size="lg" asChild>
                    <a className="px-0! w-fit h-fit text-xl" href="/">
                        <img src="/favicon.svg" alt="Invoicerr Logo" className="w-6 h-6" />
                        <h1 className="font-bold text-2xl">Invoicerr</h1>
                    </a>
                </Button>
            </section>
            <section className="flex items-center gap-10 h-fit">
                <section className="flex items-center gap-4 h-fit">
                    <Button variant="link" size="lg" asChild>
                        <a className="px-0! w-fit h-fit text-xl" href="/about">About</a>
                    </Button>
                    <Button variant="link" size="lg" asChild>
                        <a className="px-0! w-fit h-fit text-xl" href="https://docs.invoicerr.app/">Documentation</a>
                    </Button>
                </section>
                <Button variant="default" className="rounded-full" size="lg" asChild>
                    <a href="https://github.com/Impre-visible/invoicerr/">
                        <Icons.gitHub />
                        Download
                    </a>
                </Button>
            </section>
        </Card>
    )
}