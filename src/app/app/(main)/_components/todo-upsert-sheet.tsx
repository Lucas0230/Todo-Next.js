'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useRef } from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Todo } from "../types"
import { zodResolver } from '@hookform/resolvers/zod';
import { upsertTodoSchema } from "../schema"
import { upsertTodo } from "../actions"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

type TodoUpsertSheetProps = {
    children?: React.ReactNode
    defaultValue?: Todo
}

export function TodoUpsertSheet({ children }: TodoUpsertSheetProps) {

    const ref = useRef<HTMLDivElement>(null);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(upsertTodoSchema)
    });

    const onSubmit = form.handleSubmit(async (data) => {
        await upsertTodo(data);
        router.refresh();

        ref.current?.click();

        toast({
            title: 'Success',
            description: 'Your todo has been updated successfully.'
        })
    })

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div ref={ref}>{children}</div>
            </SheetTrigger>

            <SheetContent>
                <Form {...form}>
                    <form onSubmit={onSubmit} className="space-y-8 h-screen">

                        <SheetHeader>
                            <SheetTitle>Create todo</SheetTitle>
                            <SheetDescription>
                                Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                        </SheetHeader>


                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your todo title" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This will be the public displayed name for the task.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SheetFooter >
                            <Button type="submit">Save changes</Button>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>

        </Sheet >
    )
}
