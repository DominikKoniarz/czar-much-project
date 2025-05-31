"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useRegister from "@/hooks/use-register";
import { LoaderCircle } from "lucide-react";

export default function RegisterForm() {
	const { form, onSubmit, isPending } = useRegister();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder={"Email"} type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input placeholder={"Password"} type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={"Confirm Password"}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div>
					<Button type="submit" disabled={isPending}>
						<LoaderCircle className={isPending ? "animate-spin" : "hidden"} />
						<span className={isPending ? "hidden" : ""}>Submit</span>
					</Button>
				</div>
			</form>
		</Form>
	);
}
