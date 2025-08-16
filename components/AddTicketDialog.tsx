"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { FormEvent } from "react"

export function AddTicketDialog() {
  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      contact: formData.get("contact"),
    };

    if (data.title == "" || data.description == "" || data.contact == "") {
      window.alert("Title, Description and Contact information must not be empty.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
      window.location.reload();
    } catch (err) {
      window.alert("Add ticket failed");
      return;
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline"><PlusIcon />Add Ticket</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <form onSubmit={onSubmitHandler} method="post">
          <DialogHeader>
            <DialogTitle>Add ticket</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
              <Input id="title" name="title" placeholder="Enter a short, clear title" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description<span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a detailed description..."
                className="resize-none h-20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Information<span className="text-red-500">*</span></Label>
              <Input id="contact" name="contact" placeholder="Enter your email address or phone number" />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog >
  )
}
