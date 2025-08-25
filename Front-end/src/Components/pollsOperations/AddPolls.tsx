import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import type { createPollInput, createPollType } from "../../Query/ADD_POLLS";
import { ADD_POLL } from "../../Query/ADD_POLLS";

const AddPoll = () => {
    const [question, setQuestion] = useState("");
    const [answers, setAnswers] = useState<string[]>(["", "", ""]); // Always 3

    const [createPoll, { loading, error }] = useMutation<
        { createPoll: createPollType },
        { input: createPollInput }
    >(ADD_POLL);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question || answers.some((a) => !a.trim())) {
            alert("Please fill in the question and all 3 answers");
            return;
        }

        try {
            await createPoll({
                variables: {
                    input: {
                        question,
                        answere: answers,
                    },
                },
            });

            setQuestion("");
            setAnswers(["", "", ""]); // Reset back to 3
            alert("Poll created successfully!");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded-2xl space-y-4"
        >
            <h2 className="text-xl font-bold">Create a Poll</h2>

            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Enter your question"
                className="w-full p-2 border rounded"
            />

            <div className="space-y-2">
                {answers.map((ans, idx) => (
                    <input
                        key={idx}
                        type="text"
                        value={ans}
                        onChange={(e) => handleAnswerChange(idx, e.target.value)}
                        placeholder={`Answer ${idx + 1}`}
                        className="w-full p-2 border rounded"
                    />
                ))}
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                {loading ? "Creating..." : "Create Poll"}
            </button>

            {error && <p className="text-red-500">Error: {error.message}</p>}
        </form>
    );
};

export default AddPoll;
