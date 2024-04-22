import React, {useEffect, useState, useTransition} from "react";
import {Dialog} from "@headlessui/react";

export default function SingleView({contact, setContact, setList}) {
    const [, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");

    const deletecontact = () => {
        startTransition(async () => {
            const response = await fetch(
                `http://127.0.0.1:5000/contacts/${contact._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setList((prev) => {
                    return prev.filter((item) => item._id !== contact._id);
                });
                setContact(null);
            } else {
                alert("Error in deleting!");
            }
        });
    };

    const updatedcontact = () => {
        startTransition(async () => {
            const response = await fetch(
                `http://127.0.0.1:5000/contacts/${contact._id}`,
                {
                    method: "PATCH",
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
            if (response.status === 200) {
                setContact({
                    name,
                    email,
                    dob,
                    phone,
                    _id: contact._id,
                });
                setList((prev) => {
                    return prev.map((item) => {
                        if (item._id === contact._id) {
                            return {
                                _id: contact._id,
                                dob,
                                email,
                                name,
                                phone,
                            };
                        }
                        return item;
                    });
                });
                setIsOpen(false);
            } else {
                alert("Error in saving!");
            }
        });
    };

    useEffect(() => {
        if (contact !== null) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setDob(contact.dob);
        }
    }, [contact]);

    return (
        <div
            className="border border-gray-300 min-h-[100vh] min-w-[70vw] max-w-[70vw] flex flex-col justify-center items-center">
            <div>
                {contact === null ? (
                    <div className="text-2xl font-semibold">
                        Select a contact to view
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-row items-center">
                            <span className="font-bold text-3xl m-2">
                                {contact.name}
                            </span>
                            <button
                                className="bg-white border border-gray-200 p-2 rounded-xl w-[70px]  hover:bg-gray-50 m-2"
                                onClick={() => setIsOpen(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-white border border-gray-200 p-2 rounded-xl w-[70px] hover:bg-gray-50 m-2"
                                onClick={() => {
                                    deletecontact();
                                }}
                            >
                                Delete
                            </button>
                        </div>

                        <Dialog
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                            as="div"
                            className="relative z-10"
                        >
                            <div className="fixed inset-0 bg-black/25"/>
                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900 m-2"
                                        >
                                            Update existing contact
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <div className="text-sm text-gray-500">
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
                                                            setName(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter email [optional]"
                                                        name="email"
                                                        className="border border-gray-300 p-2 m-2 rounded-md"
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(
                                                                e.target.value
                                                            );
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
                                                            setPhone(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Enter dob (dd/mm/yyyy) [optional]"
                                                        name="dob"
                                                        className="border border-gray-300 p-2 m-2 rounded-md"
                                                        value={dob}
                                                        onChange={(e) => {
                                                            setDob(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="mt-4 m-2">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => {
                                                    updatedcontact();
                                                    setIsOpen(false);
                                                }}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Dialog>
                        <div className="m-2">
                            <span className="text-gray-500 text-lg">
                                Email :
                            </span>
                            <span className="m-2 text-xl font-medium">
                                {contact.email}
                            </span>
                        </div>
                        <div className="m-2">
                            <span className="text-gray-500 text-lg">
                                Phone :
                            </span>
                            <span className="m-2 text-xl font-medium">
                                {contact.phone}
                            </span>
                        </div>
                        <div className="m-2">
                            <span className="text-gray-500 text-lg">
                                Date Of Birth :
                            </span>
                            <span className="m-2 text-xl font-medium">
                                {contact.dob}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
