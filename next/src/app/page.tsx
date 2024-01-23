import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import RegisterForm from "@/components/RegisterForm";


export default function Home() {
	return (
		<MaxWidthWrapper>
			<div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
				<RegisterForm />
			</div>
		</MaxWidthWrapper>
	);
}
