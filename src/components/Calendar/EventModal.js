import React, { useContext, useState } from "react";
import GlobalContext from "../../context/GlobalContext";

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title] = useState(
        selectedEvent ? selectedEvent.title : ""
    );

    const [timings] = useState(
        selectedEvent ? selectedEvent.timings : ""
    );
    const [description] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );



    return (
        <div className="fixed inset-0 z-40 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
            <div
                className="w-full px-6 pt-6 pb-8 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl "
                role="dialog"
            >
                <form>
                    <header className="flex justify-between mb-3">
                        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-100">
                            Add Event  <br className="lg:hidden md:hidden xs:block" /><span className="text-base"> on {daySelected.format("dddd, MMMM DD")}</span>
                        </p>

                        <button
                            onClick={() => setShowEventModal(false)}
                            className="inline-flex items-center justify-center w-6 h-6 text-gray-500 transition-colors duration-150 rounded dark:text-gray-100 dark:hover:text-gray-200 hover: hover:text-gray-700 "
                            aria-label="close"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                role="img"
                                aria-hidden="true"
                            >
                                <path
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </header>

                    <div className="flex flex-col ">
                        <div className="flex flex-row mb-4">
                            <span className="text-gray-400 material-icons-outlined">T</span>
                            <p className="ml-5 text-lg font-bold text-gray-700 dark:text-gray-100 ">
                                Title  : {title}
                            </p>
                        </div>

                        <div className="flex flex-row mb-4">
                            <span className="text-gray-400 material-icons-outlined">
                                segment
                            </span><p className="ml-3 font-semibold text-gray-700 dark:text-gray-100 ">
                                Description : {description}
                            </p>
                        </div>

                        <div className="flex flex-row mb-4">
                            <span className="text-gray-400 material-icons-outlined">schedule</span>
                            <p className="ml-3 font-semibold text-gray-700 dark:text-gray-100 ">Timings  : {timings}</p>
                        </div>


                        <div className="flex flex-row">
                            <div className="flex flex-row ">
                                <span className="text-gray-400 material-icons-outlined">bookmark_border</span>
                                <p className="ml-3 font-semibold text-gray-700 dark:text-gray-100 ">Filter</p>
                            </div>
                            <div className="flex ml-5 gap-x-2">
                                {labelsClasses.map((lblClass, i) => (
                                    <span
                                        key={i}
                                        className="w-6 h-6 mr-2 rounded-full flex items-center justify-center cursor-pointer"
                                        style={{"backgroundColor":`${lblClass}`}}
                                    >
                                        {selectedLabel === lblClass && (
                                            <span className="text-sm text-white material-icons-outlined">
                                                check
                                            </span>
                                        )}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>



                    {selectedEvent && (
                        <footer className="flex items-center justify-end mt-5 ">
                            <div className="flex flex-row">
                                <button
                                    onClick={() => setShowEventModal(false)}
                                    className="inline-flex items-center justify-center px-4 py-2 mr-4 text-sm font-medium leading-5 text-black align-bottom transition-colors duration-150 bg-white border rounded-lg cursor-pointer border-1"
                                >Close</button>
                            </div>
                        </footer>)}
                </form>
            </div>
        </div >
    );
}
