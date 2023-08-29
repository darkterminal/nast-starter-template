"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { GitHubLogin } from "@/components/buttons.component";

const formSchema = z.object({
	email: z.string({
        required_error: "Email is required!"
    }).min(2).max(100),
	password: z.string({
        required_error: "Password is required!"
    }).min(6, {
		message: "Password must be minimal 6 characters",
	}),
});

export default function Login() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = async (values: z.infer<typeof formSchema>) => {
		await signIn("credentials", {
			email: values.email,
			password: values.password,
			redirect: true,
			callbackUrl: "/",
		});
	};

	return (
		<Card className="mx-auto my-[4rem] w-[350px]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
					<CardHeader>
						<CardTitle className="text-center">NAST</CardTitle>
						<CardDescription className="text-center">Next Auth Starter Template</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Email Address" {...field} />
									</FormControl>
									<FormDescription>
										This is your registered email.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="******" {...field} />
									</FormControl>
									<FormDescription>Enter your secret password</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className="flex flex-col gap-2">
						<Button type="submit" className="w-full">Sign In</Button>
                        <Link href={'/register'} className={buttonVariants({ variant: 'link' })}>Register</Link>
						<Separator />
						<GitHubLogin className="w-full" />
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
