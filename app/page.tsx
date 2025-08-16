import { AddTicketDialog } from "@/components/AddTicketDialog";
import Section from "@/components/Section";

interface TicketProps {
  id: number;
  title: string;
  description: string;
  contact: string;
  status: "pending" | "accepted" | "resolved" | "rejected";
  created_at: string;
  updated_at: string;
}

export default async function Home() {
  let tickets: TicketProps[] = [];
  let pendingList: TicketProps[] = [];
  let acceptedList: TicketProps[] = [];
  let resolvedList: TicketProps[] = [];
  let rejectedList: TicketProps[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tickets`, { cache: 'no-store' });
    tickets = await res.json();
  } catch (err) {
    console.log("Tickets fetching failed.",err);
    tickets = [];
  }

  tickets.map((e) => {
    if (e.status == "pending") pendingList.push(e);
    else if (e.status == "accepted") acceptedList.push(e);
    else if (e.status == "resolved") resolvedList.push(e);
    else if (e.status == "rejected") rejectedList.push(e);
  });

  return (
    <main className="flex flex-col gap-8 items-center p-8 h-screen">
      <div className="flex justify-between w-full">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#3b0783] via-[#ed2077] to-[#4c09aa] inline-block text-transparent bg-clip-text">
          Simple Ticket Management Application
        </h1>
        <AddTicketDialog />
      </div>

      <div className="flex gap-4 w-full h-full overflow-y-auto">
        <Section title="Pending" color="#3b82f6" ticketsNumber={pendingList.length.toString()} ticketsList={pendingList} />
        <Section title="Accepted" color="#fe9a00" ticketsNumber={acceptedList.length.toString()} ticketsList={acceptedList} />
        <Section title="Resolved" color="#22c55e" ticketsNumber={resolvedList.length.toString()} ticketsList={resolvedList} />
        <Section title="Rejected" color="#ef4444" ticketsNumber={rejectedList.length.toString()} ticketsList={rejectedList} />
      </div>
    </main>
  );
}
