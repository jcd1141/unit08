//Josh Dalton
//IT 505 - Unit 8
//NFL sim

 interface TeamInfo {
     name: string;
     rating: number;
 }

 class Team implements TeamInfo {
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

     get totalWins(): number {
         return this.wins;
     }

     get teamRating(): number {
         return this.rating;
     }

     set teamRating(value: number) {
         if (value >= 0 && value <= 100) {
             this.rating = value;
         }
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

 //teams inherit from the Team class
 class NFLTeam extends Team {
     private division: string;

     constructor(name: string, rating: number, division: string) {
         super(name, rating);
         this.division = division;
     }

     showTeam(): void {
         console.log(this.name + " | " + this.division + " | Rating: " + this.rating + " | Record: " + this.record);
     }
 }

 class Season {
     private teams: NFLTeam[];

     constructor(teams: NFLTeam[]) {
         this.teams = teams;
     }

     //simulates a game between two teams
     static playGame(team1: NFLTeam, team2: NFLTeam): void {
         const score1 = Math.floor(Math.random() * 35) + Math.floor(team1.teamRating / 10);
         const score2 = Math.floor(Math.random() * 35) + Math.floor(team2.teamRating / 10);

         console.log(team1.name + " " + score1 + " - " + team2.name + " " + score2);

         if (score1 > score2) {
             team1.addWin();
             team2.addLoss();
             console.log("Winner: " + team1.name);
         } else if (score2 > score1) {
             team2.addWin();
             team1.addLoss();
             console.log("Winner: " + team2.name);
         } else {
             // Break ties with overtime
             if (Math.random() < 0.5) {
                 team1.addWin();
                 team2.addLoss();
                 console.log("Overtime winner: " + team1.name);
             } else {
                 team2.addWin();
                 team1.addLoss();
                 console.log("Overtime winner: " + team2.name);
             }
         }

         console.log("");
     }

     showStandings(): void {
         this.teams.sort((a, b) => b.totalWins - a.totalWins);

         console.log("NFL STANDINGS");

         for (const team of this.teams) {
             team.showTeam();
         }
     }

     //play each team against every other team
     simulateSeason(): void {
         for (let i = 0; i < this.teams.length; i++) {
             for (let j = i + 1; j < this.teams.length; j++) {
                 Season.playGame(this.teams[i], this.teams[j]);
             }
         }
     }
 }

 //create AFC East teams
 const patriots = new NFLTeam("New England Patriots", 85, "AFC East");
 const bills = new NFLTeam("Buffalo Bills", 90, "AFC East");
 const dolphins = new NFLTeam("Miami Dolphins", 78, "AFC East");
 const jets = new NFLTeam("New York Jets", 75, "AFC East");

 const teams: NFLTeam[] = [patriots, bills, dolphins, jets];

 const season = new Season(teams);

 console.log("NFL SEASON SIMULATOR");
 console.log("");

 console.log("TEAMS");
 for (const team of teams) {
     team.showTeam();
 }

 console.log("");

 //simulate games
 console.log("GAME RESULTS");
 season.simulateSeason();

 //display final standings
 season.showStandings();

 //check inheritance
 console.log("");
 console.log("Inheritance Test: " + (patriots instanceof Team));