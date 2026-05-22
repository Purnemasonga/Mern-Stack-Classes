# Software Requirements Specification (SRS)
## Project 42: Flashcard Duel — Multiplayer Quiz (Education)

### 1. Project Description
Flashcard Duel gamifies the study experience by turning traditional flashcards into real-time, competitive multiplayer matches. Two players connect, and race to answer multiple-choice or short-answer questions. It's designed to make rote memorization (like vocabulary or anatomy) highly engaging through competition.

### 2. Core Scope
The application relies heavily on WebSockets for real-time multiplayer synchronization, matchmaking logic, and a dynamic deck creation system.

### 3. Functionalities (Minimum 25)

#### Deck Creation & Management
1. **Deck Builder:** Create a custom deck by adding terms and definitions (Question/Answer).
2. **Bulk Import:** Import terms from a CSV file or paste directly from Excel.
3. **Public vs. Private Decks:** Option to publish a deck to the global library or keep it private for a specific study group.
4. **Deck Search & Discovery:** Browse public decks by category (Languages, Science, History).
5. **Auto-Generate Distractors:** For multiple-choice modes, the system automatically pulls answers from other cards in the deck to act as wrong options.

#### Multiplayer Matchmaking
6. **Host a Private Match:** Generate a unique 6-digit room code to share with a friend.
7. **Join via Code:** Input a room code to instantly connect to a waiting lobby.
8. **Random Matchmaking (Quick Play):** Click "Play Now" on a public deck to be paired with a random online player studying the same topic.
9. **Lobby Chat:** A quick text chat box available while waiting for the game to start.
10. **Ready Up Toggle:** Both players must click 'Ready' to start the countdown.

#### Core Gameplay Loop
11. **Real-Time Synchronization:** Questions appear on both screens at the exact same millisecond via WebSockets.
12. **Speed Scoring:** Points are awarded based on both accuracy and how fast the user clicked the correct answer.
13. **Live Progress Bar:** See the opponent's score and progress in real-time at the top of the screen.
14. **Power-Ups (Optional):** Gamified elements like "Freeze Opponent for 2 seconds" or "50/50" to remove wrong answers.
15. **Typing Mode vs. Button Mode:** Toggle between clicking multiple-choice buttons or typing the exact answer.

#### Post-Match & Progression
16. **Match Results Screen:** Displays the winner, final scores, and a detailed breakdown of which questions were missed.
17. **Rematch Button:** A single click to instantly restart the duel with the same player.
18. **Personal Error Log:** Automatically save the questions the user got wrong into a specific "Needs Review" deck.
19. **Global Leaderboards:** Rank the top players for popular public decks based on win rate and total points.
20. **User Leveling (XP):** Earn XP for every match played to unlock new avatars or profile banners.

#### User Account & Settings
21. **User Registration:** Simple signup using Email/Username.
22. **Profile Customization:** Select an avatar and view all-time win/loss statistics.
23. **Game Settings:** Toggle sound effects, background music, and colorblind-friendly modes.
24. **Report Function:** Report inappropriate public decks or abusive chat behavior in lobbies.
25. **Admin Panel:** Monitor active WebSocket connections, server load, and manage reported content.