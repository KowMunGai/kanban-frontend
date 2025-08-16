"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMemo, useState } from "react";
import Ticket from "./Ticket";

interface TicketProps {
  id: number;
  title: string;
  description: string;
  contact: string;
  status: "pending" | "accepted" | "resolved" | "rejected";
  created_at: string;
  updated_at: string;
}

interface Props {
  title: string;
  color: string;
  ticketsNumber: string;
  ticketsList: TicketProps[];
}

const formatThaiDateTime = (isoString: string) => {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok"
  });

  const timePart = date.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok"
  });

  return `${datePart} ${timePart} น.`;
};


export default function Section({ title, color, ticketsNumber, ticketsList }: Props) {
  const [sort, setSort] = useState("createdNewest");

  const sortedTickets = useMemo(() => {
  const by = (
    key: "created_at" | "updated_at",
    dir: "asc" | "desc"
  ) => (a: TicketProps, b: TicketProps) => {
    const ta = Date.parse(a[key]);
    const tb = Date.parse(b[key]);
    return dir === "asc" ? ta - tb : tb - ta;
  };

  const arr = ticketsList.slice();
  switch (sort) {
    case "createdNewest":
      return arr.sort(by("created_at", "desc"));
    case "createdOldest":
      return arr.sort(by("created_at", "asc"));
    case "updatedNewest":
      return arr.sort(by("updated_at", "desc"));
    case "updatedOldest":
      return arr.sort(by("updated_at", "asc"));
    default:
      return arr;
  }
}, [sort]);


  return (
    <div className="flex flex-col w-1/4 rounded-xl border-2 bg-white" style={{ borderColor: color }}>
      <div className="flex justify-between items-center w-full h-max p-3 rounded-t-lg text-white" style={{ backgroundColor: color }}>
        <div className="flex flex-col">
          <p className="text-2xl font-bold">{title}</p>
          <p className="text-lg">{ticketsNumber} {Number(ticketsNumber) <= 1 ? "ticket" : "tickets"}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-lg">Sort by :</p>

          <Select name="sortOption" defaultValue="createdNewest" onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[175px] bg-white text-[#0a0a0a]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="createdNewest">Created (Newest)</SelectItem>
                <SelectItem value="createdOldest">Created (Oldest)</SelectItem>
                <SelectItem value="updatedNewest">Updated (Newest)</SelectItem>
                <SelectItem value="updatedOldest">Updated (Oldest)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4 h-full p-4 overflow-y-auto">
        {sortedTickets.map((data, index) => (
          <Ticket
            id={data.id}
            key={index}
            title={data.title}
            description={data.description}
            contact={data.contact}
            status={data.status}
            createdAt={formatThaiDateTime(data.created_at)}
            updatedAt={formatThaiDateTime(data.updated_at)}
          />
        ))}
      </div>
    </div>
  );
}