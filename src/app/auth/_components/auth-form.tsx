'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

export function AuthForm() {

    const form = useForm();

    const handleSubmit = form.handleSubmit(async (data) => {
        try {

            await signIn('nodemailer', { email: data.email, redirect: false })
            toast({
                title: 'Magic Link Sent',
                description: 'Check your email for the magic link to login.',
            })

        } catch (e) {
            toast({
                title: 'Error',
                description: 'An error occurred. Please try again.'
            })
        }
    })

    return (
        <div className="mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
                <h1 className="text-3xl font-bold">Sign in with Magic Link</h1>
                <p className="text-muted-foreground">Enter your email address to receive a magic link to sign in.</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="email" className="sr-only">
                        Email address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="Email address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        {...form.register('email')}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting ? 'Sending...' : 'Send Magic Link'}
                </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
                <Link href="#" className="font-medium hover:underline" prefetch={false}>
                    Learn more about magic link authentication
                </Link>
            </div>
        </div>
    )
}