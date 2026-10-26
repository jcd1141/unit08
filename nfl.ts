//IT505
//Joshua Dalton
//NFL sim

 interface TeamInfo {
     name: string;
     rating: number;
 }

 class Team {
     public name: string;
     private wins: number;
     private losses: number;
     protected rating: number;

     constructor(name: string, rating: number) {
         this.name = name;
         this.rating = rating;
         this.wins = 0;
         this.losses = 0;
     }

     get record(): string {
         return this.wins + "-" + this.losses;
     }

     addWin(): void {
         this.wins++;
     }

     addLoss(): void {
         this.losses++;
     }

     showTeam(): void {
         console.log(this.name + " | Rating: " + this.rating + " | Record: " + this.record);
     }
 }

 //create teams
 const patriots = new Team("New England Patriots", 85);
 const bills = new Team("Buffalo Bills", 90);
 const dolphins = new Team("Miami Dolphins", 78);
 const jets = new Team("New York Jets", 75);

 //store teams in an array
 const teams: Team[] = [patriots, bills, dolphins, jets];

 for (const team of teams) {
     team.showTeam();
 }