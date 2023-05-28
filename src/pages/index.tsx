import ProblemsTable from "@/components/ProblemsTable/ProblemsTable";
import Topbar from "@/components/Topbar/Topbar";
import useHasMounted from "@/hooks/useHasMounted";
import { doc, setDoc } from "firebase/firestore";

import { ChangeEvent, useState } from "react";
import { firestore } from "@/firebase/firebase";
import { problems } from "../mockProblems/problems";

export default function Home() {
  const [inputs, setInputs] = useState({
    id: "",
    title: "",
    difficulty: "",
    category: "",
    videoId: "",
    link: "",
    order: 0,
    likes: 0,
    dislikes: 0,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	const { name, value } = e.target;
	setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
	// convert inputs.order to integer
	const newProblem = {
		...inputs,
		order: Number(inputs.order),
	};

	await setDoc(doc(firestore, "problems", inputs.id), newProblem);
	alert("save to db");
  }

  const onSeed = async () => {
    const allProblems = problems;
    for (const problem of allProblems) {
      await setDoc(doc(firestore, "problems", problem.id), problem);
    }
  }

  return (
    <>
      <main className="bg-dark-layer-2 min-h-screen">
        <Topbar />
        <h1
          className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5"
        >
          &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
        </h1>
        <div className="relative overflow-x-auto mx-auto px-6 pb-10">
          {loadingProblems && (
            <div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
              {[...Array(10)].map((_, idx) => (
                <LoadingSkeleton key={idx} />
              ))}
            </div>
          )}
          <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
            {!loadingProblems && (
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
                <tr>
                  <th scope="col" className="px-1 py-3 w-0 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Difficulty
                  </th>

                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-0 font-medium">
                    Solution
                  </th>
                </tr>
              </thead>
            )}
            <ProblemsTable setLoadingProblems={setLoadingProblems} />
          </table>
        </div>

        {/* Seed button */}
        <button className="bg-white" onClick={onSeed} >
          Seed
        </button>

        {/* temp form */}
        <form onSubmit={onSubmit} className="p-6 flex flex-col max-w-sm gap-3">
          <input type="text" onChange={handleChange} placeholder="problem id" name="id" />
          <input type="text" onChange={handleChange} placeholder="title" name="title" />
          <input type="text" onChange={handleChange} placeholder="difficulty" name="difficulty" />
          <input type="text" onChange={handleChange} placeholder="category" name="category" />
          <input type="text" onChange={handleChange} placeholder="order" name="order" />
          <input type="text" onChange={handleChange} placeholder="videoId?" name="videoId" />
          <input type="text" onChange={handleChange} placeholder="link?" name="link" />
          <button className="bg-white" type="submit">
            Submit
          </button>
        </form>
      </main>
    </>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex items-center space-x-12 mt-4 px-6">
      <div className="w-6 h-6 shrink-0 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32  rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52  w-32 rounded-full bg-dark-layer-1"></div>
      <div className="h-4 sm:w-52 w-32 rounded-full bg-dark-layer-1"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
