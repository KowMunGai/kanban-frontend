import { CalendarIcon, ClockIcon, UserRoundIcon } from "lucide-react";
import { EditTicketDialog } from "./EditTicketDialog";

interface Props {
  id: number;
  title: string;
  description: string;
  contact: string;
  status: "pending" | "accepted" | "resolved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

var color: string;
var bgColor: string;

export default function Ticket({ id, title, description, contact, status, createdAt, updatedAt }: Props) {
  if (status == "pending") {color="#3b82f6"; bgColor="#eff6ff";}
  else if (status == "accepted") {color="#fe9a00"; bgColor="#fffaf0";}
  else if (status == "resolved") {color="#22c55e"; bgColor="#f0fdf4";}
  else if (status == "rejected") {color="#ef4444"; bgColor="#fef2f2";}

  return (
    <div className="flex flex-col gap-2 p-4 w-full h-max rounded-lg border-2 shadow-xl bg-white" style={{ borderColor: color, backgroundColor: bgColor }}>
      <p className="flex justify-between items-center text-xl font-bold">{title}<EditTicketDialog id={id} title={title} description={description} contact={contact} status={status}/></p>
      <p className="text-md">{description}</p>
      <p className="flex gap-2 text-md"><UserRoundIcon />{contact}</p>
      <p className="flex gap-2 text-md"><CalendarIcon />{createdAt}</p>
      <p className="flex gap-2 text-md"><ClockIcon />{updatedAt}</p>
    </div>
  );
}