import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { registerAction } from "@/actions/auth";
import { actionError } from "@/lib/action-error";
import { registerSchema } from "@/schema/register-schema";
import { useRouter } from "next/navigation";

const useRegister = () => {
	const router = useRouter();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(registerSchema),
		mode: "onSubmit",
		reValidateMode: "onChange",
	});

	const resetForm = () => {
		const { email } = form.getValues();
		form.reset({
			email: email,
			password: "",
			confirmPassword: "",
		});
	};

	const { execute, isPending } = useAction(registerAction, {
		onError: (error) => {
			actionError(error).default();
			resetForm();
		},
		onSuccess: () => {
			router.push("/dashboard");
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

export default useRegister;
