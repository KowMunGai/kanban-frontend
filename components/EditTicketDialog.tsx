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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SquarePenIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { FormEvent } from "react"

interface Props {
  id: number;
  title: string;
  description: string;
  contact: string;
  status: "pending" | "accepted" | "resolved" | "rejected";
}

export function EditTicketDialog({ id, title, description, contact, status }: Props) {

  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      id: id,
      title: formData.get("title"),
      description: formData.get("description"),
      contact: formData.get("contact"),
      status: formData.get("status")
    };

    console.log(data);

    if (data.title == "" || data.description == "" || data.contact == "") {
      window.alert("Title, Description and Contact information must not be empty.");
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    window.location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="outline"><SquarePenIcon /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <form onSubmit={onSubmitHandler} method="post">
          <DialogHeader>
            <DialogTitle>Edit ticket</DialogTitle>
            <DialogDescription>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 mt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title<span className="text-red-500">*</span></Label>
              <Input id="title" name="title" placeholder="Enter a short, clear title" defaultValue={title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description<span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Write a detailed description..."
                defaultValue={description}
                className="resize-none h-20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Information<span className="text-red-500">*</span></Label>
              <Input id="contact" name="contact" placeholder="Enter your email address or phone number" defaultValue={contact} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Status</Label>
              <Select name="status" defaultValue={status}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="pending" className="text-[#3b82f6]!">Pending</SelectItem>
                    <SelectItem value="accepted" className="text-[#fe9a00]!">Accepted</SelectItem>
                    <SelectItem value="resolved" className="text-[#22c55e]!">Resolved</SelectItem>
                    <SelectItem value="rejected" className="text-[#ef4444]!">Rejected</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}