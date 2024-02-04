import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<MaxWidthWrapper>
			<div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl gap-10">
				<h1>Hello to the young scientists union</h1>
				<Button>
					<Link href="/sign-up">Register now</Link>
				</Button>
			</div>
		</MaxWidthWrapper>
	);
}
