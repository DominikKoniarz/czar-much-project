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
import useLogin from "@/hooks/use-login";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function LoginForm() {
    const { form, onSubmit, isPending } = useLogin();

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    placeholder={"Email"}
                                    type="email"
                                    {...field}
                                />
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
                                <Input
                                    placeholder={"Password"}
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="relative h-fit w-fit cursor-pointer"
                    >
                        <LoaderCircle
                            className={cn(
                                "absolute top-1/2 left-1/2 size-6 -translate-x-1/2 -translate-y-1/2 animate-spin",
                                !isPending && "hidden",
                            )}
                        />
                        <span className={cn(isPending && "invisible")}>
                            Submit
                        </span>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
