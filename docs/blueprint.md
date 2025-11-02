# **App Name**: Stockfish Champion

## Core Features:

- Local Player vs. Player: Allows two players to play against each other on the same device.
- Player vs. AI: Enables playing against an AI with adjustable difficulty levels. Stockfish.wasm provides the move suggestions. In order to make its suggestion, Stockfish can optionally run as a cloud function. If stockfish.wasm cannot run threads due to device constraints, it falls back to a CDN-hosted instance.
- Full Legal Chess Rules: Implements all standard chess rules, including castling, en passant, pawn promotion, check detection, checkmate, and stalemate.
- Draw Rules: Detects draw conditions such as threefold repetition, 50-move rule, insufficient material, and allows draw offers via UI button.
- Chess960: Generates Fischer Random Chess starting positions with adapted castling logic.
- Move History: Displays move history in algebraic notation (PGN), with PGN export to clipboard or download and PGN import to resume games.
- Timers/Clocks: Implements chess clocks with multiple cadences, pause, resume, and increment support.
- UI Customization: Allows users to customize the board with coordinate labels, highlight last move, show legal moves, highlight check, animate captures, and use sound effects.
- Theming: Includes theme picker with 16 color themes and 3 piece styles (Classic, Modern, Colorful). User preferences are persisted to Firestore and locally via localStore
- I18n Support: Includes language switching, offering full copy in English and French.

## Style Guidelines:

- Primary color: Dark blue (#2c3e50) to provide a sophisticated and calm atmosphere, reminiscent of classic chess sets.
- Background color: Very dark gray (#222222) to ensure focus on the board. The light-on-dark color scheme will enable high contrast, improving readability for users.
- Accent color: Gold (#FFD700) for highlighting important elements like the current turn, move history, and interactive buttons, providing a touch of elegance and signifying strategic importance.
- Body font: 'Inter' (sans-serif) for a modern, clean, and readable text.
- Headline font: 'Space Grotesk' (sans-serif) to give the chess title text a modern touch, as well as a feeling of precision.
- Use 'lucide-react' icons throughout the application for a consistent and modern look.
- Ensure a responsive layout that adapts to different screen sizes, making the game accessible on mobile, tablet, and desktop devices.
- Use Framer Motion for smooth and subtle piece movements and transitions to enhance the user experience.