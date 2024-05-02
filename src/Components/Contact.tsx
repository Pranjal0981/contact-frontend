import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncDeleteContact, asyncViewContact, createContact } from "../store/actions/Actions";
interface Contact {
    firsName: string;
    lastName: string;
    status: string;
}

const SideBar: React.FC = () => {
    return (
        <div className="h-full bg-gray-800 text-white p-4">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul>
                <li className="mb-2"><Link to="/viewcontacts" className="hover:text-gray-300">Contacts</Link></li>
                <li className="mb-2"><Link to="/Charts and Maps" className="hover:text-gray-300">Charts</Link></li>
            </ul>
        </div>
    );
};

export const CreateContact: React.FC = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState<Contact>({
        firsName: '', // Corrected property name
        lastName: '',
        status: 'Active', // Default status
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(createContact(formData));
        setFormData({
            firsName: '', // Reset property name
            lastName: '',
            status: 'Active', // Reset status to default after submission
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <SideBar />
            <h2 className="text-2xl font-semibold mb-4">Create Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name:</label>
                    <input type="text" name="firsName" id="firstName" value={formData.firsName} onChange={handleChange} className="border border-gray-300 px-4 py-2 rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name:</label>
                    <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 px-4 py-2 rounded-lg w-full" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Status:</label>
                    <div className="flex items-center">
                        <label htmlFor="active" className="mr-2">
                            <input type="radio" id="active" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleChange} />
                            <span className="ml-1">Active</span>
                        </label>
                        <label htmlFor="inactive" className="mr-2">
                            <input type="radio" id="inactive" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleChange} />
                            <span className="ml-1">Inactive</span>
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Create</button>
            </form>
        </div>
    );
};

export const ViewContacts: React.FC = () => {
    const dispatch = useDispatch();
    const contacts: Contact[] = useSelector((state: any) => state.user.contacts); // Assuming user slice has contacts state

    useEffect(() => {
        dispatch(asyncViewContact());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            dispatch(asyncDeleteContact(id));
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold my-4">All Contacts</h2>
            {contacts.map((contact) => (
                <div key={contact.id} className="bg-white shadow-md rounded-md p-4 my-4">
                    <h3 className="text-lg font-semibold">{contact.name}</h3>
                    <p className="text-gray-600">Phone: {contact.phone}</p>
                    <p className="text-gray-600">Email: {contact.email}</p>
                    <div className="mt-4 flex">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">Update</button>
                        <button
                            className="bg-red-500 text-white py-2 px-4 rounded-md"
                            onClick={() => handleDelete(contact.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ViewContacts;