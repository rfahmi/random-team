import React, { useState } from "react";

const Body = () => {
    const [perTeam, setPerTeam] = useState(3);
    const [input, setInput] = useState("");
    const [items, setItems] = useState([]);
    const [randomized, setRandomized] = useState([]);
    const start = () => {
        setItems([]);
        setRandomized([]);
    };
    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const handlePerTeamChange = (e) => {
        setPerTeam(e.target.value);
    };
    const handleInputSubmit = (e) => {
        e.preventDefault();
        // setItems([...items, input]);
        items.unshift(input);
        setInput("");
    };
    const removeItem = (index) => {
        setItems(
            items.slice(0, index).concat(items.slice(index + 1, items.length))
        );
    };
    const random = () => {
        setItems(shuffle(items));
        var result = items.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / perTeam);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = []; // start a new chunk
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
        }, []);
        console.log(result);
        setRandomized(result);
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    return (
        <div className="md:absolute md:top-0 md:right-0 md:w-2/5 flex flex-col h-screen bg-indigo-100">
            {randomized.length === 0 && (
                <div className="flex-none p-4">
                    <form onSubmit={handleInputSubmit} method="POST">
                        <input
                            type="text"
                            placeholder="Masukan nama"
                            required
                            class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </form>
                </div>
            )}
            <div className="flex-grow p-4 overflow-auto">
                {randomized.length === 0 ? (
                    items.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <span className="font-bold text-gray-400">
                                Belum ada siapa-siapa...
                            </span>
                        </div>
                    ) : (
                        <>
                            <div class="mb-6">
                                {items.map((i, index) => (
                                    <div
                                        key={index}
                                        className="bg-white flex flex-row justify-between rounded-md shadow-sm px-6 py-4 my-2 border border-gray-300"
                                    >
                                        <span className="text-xl font-bold">
                                            {i}
                                        </span>
                                        <button
                                            onClick={() => removeItem(index)}
                                        >
                                            <svg
                                                className="h-8 text-red-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <div class="p-4 lg:p-16 text-center">
                            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-2">
                                Good Luck!
                            </h1>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-6 text-center">
                            {randomized.map((i, index) => (
                                <div key={`i${index}`}>
                                    <>
                                        <span className="font-bold">
                                            Kelompok {index + 1}
                                        </span>
                                        {i.map((ii, index) => (
                                            <div
                                                key={`i${index}`}
                                                className="bg-white flex flex-row justify-between rounded-md shadow-sm px-4 py-2 my-2 border border-gray-300"
                                            >
                                                <span className="text-md">
                                                    {ii}
                                                </span>
                                            </div>
                                        ))}
                                    </>
                                </div>
                            ))}
                        </div>
                        <div class="mb-6"></div>
                    </>
                )}
            </div>

            <div className="flex-none p-4 bg-white">
                {randomized.length > 0 ? (
                    <button
                        onClick={start}
                        class="flex items-center justify-center w-full px-3 py-4 text-white bg-primary rounded-md focus:bg-indigo-600 focus:outline-none uppercase font-bold"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Ulangi
                    </button>
                ) : (
                    <>
                        <label className="mb-2 text-xs font-bold text-gray-600">
                            {perTeam} orang per-kelompok
                        </label>
                        <div class="mt-2 flex gap-4">
                            <input
                                type="number"
                                placeholder="Jumlah orang per-team"
                                required
                                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                value={perTeam}
                                onChange={handlePerTeamChange}
                            />
                            <button
                                onClick={random}
                                type="button"
                                disabled={items.length === 0}
                                class="flex items-center justify-center w-full px-3 py-4 text-white bg-primary rounded-md focus:bg-indigo-600 focus:outline-none uppercase font-bold"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Acak
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Body;
