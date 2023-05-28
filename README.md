# LeetCode Clone Youtube Tutorial

### Built With React, NextJS, TypeScript, TailwindCSS, Firebase

# [Demo](https://youtu.be/igqiduZR-Gg)

![Screenshot of App](https://i.ibb.co/b3XDkdN/Full-Stack-1.png)

### 1. Firebase

https://firebase.google.com/
- Go to Console
- Click Create Project
1. type project name - continue
2. Disable analytics - create project

#### 1.1. In project view
- Web </>

1. give app a nickname
2. Register app
3. Copy Firebase SDK to .env.local
4. .env.example logic

#### 1.2 Firebase Authentication
- Go to Authentication
- Click Sign-in method
- Enable Email/Password
- Disable Email link (optional)
- Save


#### 1.3 Firestore Database (Test Mode - Create User)
- Sidebar - Downarrow Build
- Click Firestore Database
- Create Database
- Start in test mode
- Multi-region eur3 (europe-west)

#### 1.4 Add Problem to Firestore (Seed)
// pages/index.ts
```ts
import { problems } from "../mockProblems/problems";
const onSeed = async () => {
    for (const problem of problems) {
      await setDoc(doc(firestore, "problems", problem.id), problem);
    }
  }
  ...
 <button className="bg-white" onClick {onSeed}>Seed</button>
```