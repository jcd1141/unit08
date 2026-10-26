//IT505
//Joshua Dalton
//IT help desk

interface TicketInfo { //interface
    id: number;
    issue: string;
}

class Ticket implements TicketInfo { //creates ticket class
    public id: number;
    public issue: string;
    private status: string;

    constructor(id: number, issue: string) {
        this.id = id;
        this.issue = issue;
        this.status = "Open";
    }

    get ticketStatus(): string {
        return this.status;
    }

    set ticketStatus(value: string) {
        if (value == "Open" || value == "In Progress" || value == "Closed") {
            this.status = value;
        }
    }

    closeTicket(): void {
        this.status = "Closed";
    }

    showTicket(): void {
        console.log("Ticket #" + this.id);
        console.log("Issue: " + this.issue);
        console.log("Status: " + this.status);
        console.log("");
    }
}

class HelpDeskTicket extends Ticket { //inherits Ticket
    private priority: string;
    private technician: string;

    constructor(id: number, issue: string, priority: string, technician: string) {
        super(id, issue);
        this.priority = priority;
        this.technician = technician;
    }

    showTicket(): void {
        console.log("Ticket #" + this.id);
        console.log("Issue: " + this.issue);
        console.log("Priority: " + this.priority);
        console.log("Technician: " + this.technician);
        console.log("Status: " + this.ticketStatus);
        console.log("");
    }
}

class HelpDesk { //manages help desk tickets
    private tickets: HelpDeskTicket[];

    constructor(tickets: HelpDeskTicket[]) {
        this.tickets = tickets;
    }

    static resolveTicket(ticket: HelpDeskTicket): void {
        ticket.closeTicket();
        console.log("Ticket #" + ticket.id + " has been resolved.");
    }

    showTickets(): void {
        for (const ticket of this.tickets) {
            ticket.showTicket();
        }
    }

    showOpenTickets(): void {
        console.log("OPEN TICKETS");

        for (const ticket of this.tickets) {
            if (ticket.ticketStatus != "Closed") {
                ticket.showTicket();
            }
        }
    }

    countOpenTickets(): number {
        let count = 0;

        for (const ticket of this.tickets) {
            if (ticket.ticketStatus != "Closed") {
                count++;
            }
        }

        return count;
    }
}

const ticket1 = new HelpDeskTicket(1, "Computer will not turn on", "High", "Josh");
const ticket2 = new HelpDeskTicket(2, "Password reset", "Low", "Mike");
const ticket3 = new HelpDeskTicket(3, "WiFi not connecting", "Medium", "Greg");
const ticket4 = new HelpDeskTicket(4, "Printer not working", "Low", "Leo");

const tickets: HelpDeskTicket[] = [ticket1, ticket2, ticket3, ticket4];

const helpdesk = new HelpDesk(tickets);

console.log("IT HELP DESK SYSTEM");
console.log("");

console.log("ALL TICKETS");
helpdesk.showTickets();

console.log("UPDATING TICKETS"); //update and resolve tickets
ticket2.ticketStatus = "In Progress";
HelpDesk.resolveTicket(ticket1);
HelpDesk.resolveTicket(ticket4);

console.log("");

helpdesk.showOpenTickets();

console.log("Total Open Tickets: " + helpdesk.countOpenTickets());

console.log("");
console.log("Inheritance Test: " + (ticket1 instanceof Ticket));