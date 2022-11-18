# Grant Hallpass
The official electronic hallpass of Grant High School.

### Running this locally
- Make sure you have the Firebase CLI, Java 11+, pnpm and, NodeJS 16+ installed.
- Git clone this repository and open it.
- Run `pnpm i` to install dependencies.
- Build the functions with this command `cd functions && npm run build:watch`.
- Run the Firebase emulator with the following command (Make sure you are in the project root) `firebase emulators:start`.
- In a new shell go in to the `app` directory and run `pnpm run dev`.
- Done! You can view the emulator at `localhost:9000` and the frontend at `localhost:5173`.
