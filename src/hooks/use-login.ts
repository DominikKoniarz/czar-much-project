import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "@/actions/auth";
import { actionError } from "@/lib/action-error";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/schema/login-schema";

const useLogin = () => {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const resetForm = () => {
		const { email } = form.getValues();
		form.reset({
			email: email,
			password: "",
		});
	};

	const { execute, isPending } = useAction(loginAction, {
		onError: (error) => {
			actionError(error).default();
			resetForm();
		},
		onSuccess: () => {
			router.push("/dashboard/home");
			resetForm();
		},
	});

	const onSubmit = form.handleSubmit(execute);

	return {
		form,
		onSubmit,
		isPending,
	};
};

export default useLogin;
