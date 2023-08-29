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
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
	name: z.string().min(2),
	email: z.string().min(2).max(100),
	password: z.string().min(0, {
		message: "Password must be minimal 6 characters",
	}),
});

export const RegisterForm = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify(values),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!res.ok) {
				alert((await res.json()).message);
				return;
			}

			await signIn(undefined, {
				callbackUrl: "/login",
			});
    } catch (error) {
      console.error(error);
    }
	};

	return (
		<Card className="mx-auto my-[4rem] w-[450px]">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-2">
					<CardHeader>
						<CardTitle className="text-center">NAST</CardTitle>
						<CardDescription className="text-center">
							Next Auth Starter Template
						</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name Address" {...field} />
									</FormControl>
									<FormDescription>
										This is your registered name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<Button type="submit" className="w-full">
							Sign Up
						</Button>
						<Link
							href={"/login"}
							className={buttonVariants({ variant: "link" })}
						>
							Login
						</Link>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
};
