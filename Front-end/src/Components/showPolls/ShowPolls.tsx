import { useMutation, useQuery } from "@apollo/client/react";
import React, { useEffect, useState } from "react";
import { DELETE_POLL } from "../../Query/DELETE_POLLS";
import type { Poll, PollsData } from "../../Query/GET_POLLS";
import { GET_POLLS } from "../../Query/GET_POLLS";

type Votes = { [pollId: string]: number[] };

const ShowPolls: React.FC = () => {
    const { loading, error, data } = useQuery<PollsData>(GET_POLLS);
    const polls = data?.getAllPolls || [];

    const [votes, setVotes] = useState<Votes>({});

    // Load votes from localStorage
    useEffect(() => {
        const storedVotes = localStorage.getItem("pollVotes");
        if (storedVotes) {
            setVotes(JSON.parse(storedVotes));
        }
    }, []);

    // Save votes to localStorage whenever votes change
    useEffect(() => {
        localStorage.setItem("pollVotes", JSON.stringify(votes));
    }, [votes]);

    const [deletePoll] = useMutation<{ deletePoll: Poll }, { id: string }>(DELETE_POLL, {
        update(cache, { data }) {
            if (!data) return;
            const existingPolls = cache.readQuery<PollsData>({ query: GET_POLLS });
            if (existingPolls) {
                cache.writeQuery({
                    query: GET_POLLS,
                    data: {
                        getAllPolls: existingPolls.getAllPolls.filter(
                            (p) => p.id !== data.deletePoll.id
                        ),
                    },
                });
            }
        },
    });

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this poll?")) {
            deletePoll({ variables: { id } });
            const newVotes = { ...votes };
            delete newVotes[id]; // remove votes for deleted poll
            setVotes(newVotes);
        }
    };

    const handleVote = (pollId: string, optionIndex: number) => {
        setVotes((prev) => {
            const pollVotes = prev[pollId] || Array(polls.find(p => p.id === pollId)?.answere.length || 0).fill(0);
            pollVotes[optionIndex] += 1;
            return { ...prev, [pollId]: pollVotes };
        });
    };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Polls</h2>

            {polls.map((poll) => {
                const pollVotes = votes[poll.id] || Array(poll.answere.length).fill(0);

                return (
                    <div
                        key={poll.id}
                        className="bg-white rounded-2xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition relative"
                    >
                        <p className="text-lg font-medium text-gray-900 mb-4">{poll.question}</p>

                        <ul className="space-y-2">
                            {poll.answere.map((ans, idx) => (
                                <li
                                    key={idx}
                                    className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-lg cursor-pointer transition flex justify-between items-center"
                                    onClick={() => handleVote(poll.id, idx)}
                                >
                                    <span>{ans}</span>
                                    <span className="font-bold">{pollVotes[idx]} votes</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleDelete(poll.id)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                        >
                            Delete
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowPolls;
