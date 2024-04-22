import React, { useEffect, useState, useTransition } from "react";
import { Dialog } from "@headlessui/react";

export default function ListView({ setContact, list, setList }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [pending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const getcontacts = () => {
        startTransition(async () => {
            const response = await fetch("http://127.0.0.1:5000/contacts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setList(await response.json());
        });
    };

    const newcontact = () => {
        startTransition(async () => {
            const response = await fetch(
                "http://127.0.0.1:5000/create-contact",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        dob,
                        phone,
                    }),
                }
            );
            console.log(response.status);
            if (response.status === 201) {
                const contact = await response.json();
                console.log(contact);
                console.log(list);
                setList((prev) => [...prev, contact]);
                setIsOpen(false);
            } else {
                alert("Error in saving!");
            }
        });
    };

    useEffect(() => {
        getcontacts();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="border border-gray-300 min-h-screen min-w-[30%] max-w-[30%] bg-[#faf9ff]">
            <div className="max-h-screen flex flex-col justify-center items-center">
                <div className="flex flex-row justify-between items-center h-[10%] min-w-full border-y border-gray-300">
                    <span className="font-semibold text-3xl m-4">Contacts</span>
                    <div className="m-4">
                        <button
                            className="bg-white border border-gray-200 p-2 rounded-xl"
                            onClick={() => setIsOpen(true)}
                        >
                            Add Contact
                        </button>
                    </div>
                </div>
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    as="div"
                    className="relative z-10"
                >
                    <div className="fixed inset-0 bg-black/25" />
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900 m-2"
                                >
                                    Create new contact
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        <form
                                            action=""
                                            className="flex flex-col"
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                            }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Enter name"
                                                name="name"
                                                className="border border-gray-300 p-2 m-2 rounded-md"
                                                required
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter email [optional]"
                                                name="email"
                                                className="border border-gray-300 p-2 m-2 rounded-md"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter phone number"
                                                name="phone"
                                                className="border border-gray-300 p-2 m-2 rounded-md"
                                                required
                                                value={phone}
                                                onChange={(e) => {
                                                    setPhone(e.target.value);
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Enter dob (dd/mm/yyyy) [optional]"
                                                name="dob"
                                                className="border border-gray-300 p-2 m-2 rounded-md"
                                                value={dob}
                                                onChange={(e) => {
                                                    setDob(e.target.value);
                                                }}
                                            />
                                        </form>
                                    </p>
                                </div>

                                <div className="mt-4 m-2">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={newcontact}
                                    >
                                        Save
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
                <div className="min-w-full h-full flex flex-col items-center overflow-auto">
                    {pending && <div>Loading...</div>}
                    {!pending && (
                        <ul className="">
                            {list.map((contact) => (
                                <li key={contact._id}>
                                    <button
                                        className="border-t min-w-[28vw] border-gray-200 p-3 text-left font-medium text-lg"
                                        onClick={() => {
                                            setContact(contact);
                                        }}
                                    >
                                        {contact.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
