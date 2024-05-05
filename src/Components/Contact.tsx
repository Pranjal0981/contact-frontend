import React, { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, PointElement, LineController, LineElement } from "chart.js";
import { useAppSelector, useAppDispatch } from './hooks'
import { Link, useParams } from "react-router-dom";
import { asyncDeleteContact, asyncUpdateContact, asyncViewContact, createContact } from "../store/actions/Actions";
import { useNavigate } from 'react-router-dom';

// Register Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineController, LineElement);

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    status: string;
}

interface UpdateContact {
    firstName: string;
    lastName: string;
    status: string;
}


export const CreateContact: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Contact>({
        _id: '',
        firstName: '',
        lastName: '',
        status: 'Active',
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
            _id: '',
            firstName: '',
            lastName: '',
            status: 'Active',
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg flex gap-6 h-3/4">
            <SideBar />
            <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-4">Create Contact</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name:</label>
                        <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Last Name:</label>
                        <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="border border-gray-300 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-500" />
                    </div>
                    <div className="flex items-center space-x-4">
                        <label htmlFor="active" className="flex items-center">
                            <input type="radio" id="active" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleChange} className="mr-2 focus:ring-blue-500" />
                            <span className="text-gray-700">Active</span>
                        </label>
                        <label htmlFor="inactive" className="flex items-center">
                            <input type="radio" id="inactive" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleChange} className="mr-2 focus:ring-blue-500" />
                            <span className="text-gray-700">Inactive</span>
                        </label>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring focus:border-blue-500">Create</button>
                </form>
            </div>
        </div>

    );
};

export const ViewContacts: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.user);

    useEffect(() => {
        dispatch(asyncViewContact());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            dispatch(asyncDeleteContact(id));
        }
    };

    const handleUpdate = (id: string) => {
        navigate(`/update/${id}`);
    };

    return (
        <div className="flex justify-center mx-auto gap-10">
            <SideBar />
            <div className="flex flex-col w-full max-w-md">
                <h2 className="text-2xl font-bold my-4">All Contacts</h2>
                {user?.map((contact: Contact) => (
                    <div key={contact._id} className="bg-white shadow-md rounded-md p-4 my-4">
                        <h3 className="text-gray-600 mb-2">First Name: {contact.firstName}</h3>
                        <p className="text-gray-600 mb-2">Last Name: {contact.lastName}</p>
                        <p className="text-gray-600 mb-2">Status: {contact.status}</p>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition-colors duration-300" onClick={() => handleUpdate(contact._id)}>Update</button>
                            <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300" onClick={() => handleDelete(contact._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export const UpdateContact: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<UpdateContact>({
        firstName: '',
        lastName: '',
        status: '',
    });
    const { id } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(asyncUpdateContact(formData, id));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Contact</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">First Name:</label>
                    <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="border border-gray-300 px-4 py-2 rounded-lg w-full" />
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">Update</button>
            </form>
        </div>
    );
};

const fetchWorldwideData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    if (!response.ok) {
        throw new Error('Failed to fetch worldwide data');
    }
    return response.json();
};


const fetchHistoricalData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    if (!response.ok) {
        throw new Error('Failed to fetch historical data');
    }
    return response.json();
};

export const Dashboard: React.FC = () => {
    const { data: worldwideData, isLoading: isWorldwideLoading, isError: isWorldwideError } = useQuery('worldwideData', fetchWorldwideData);
    const { data: historicalData, isLoading: isHistoricalLoading, isError: isHistoricalError } = useQuery('historicalData', fetchHistoricalData);

    if (isWorldwideLoading || isHistoricalLoading) return <div className="text-center mt-8">Loading...</div>;
    if (isWorldwideError || isHistoricalError) return <div className="text-center mt-8">Error fetching data</div>;

    const labels = Object.keys(historicalData.cases);
    const casesData = Object.values(historicalData.cases);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Cases Fluctuation',
                data: casesData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="flex mx-auto items-stretch justify-center w-full h-full">
            <SideBar />
            <div className="flex flex-col w-full lg:w-2/3 xl:w-1/2">
                <h1 className="text-3xl font-bold mb-4">COVID-19 Dashboard</h1>
                {worldwideData && (
                    <div className="bg-gray-200 rounded-lg p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">Worldwide Cases</h2>
                        <p className="mb-2">Total Cases: {worldwideData.cases}</p>
                        <p className="mb-2">Total Deaths: {worldwideData.deaths}</p>
                        <p>Total Recovered: {worldwideData.recovered}</p>
                    </div>
                )}
                <div className="bg-gray-200 rounded-lg p-4">
                    <h2 className="text-xl font-semibold mb-2">Cases Fluctuation Over Time</h2>
                    <div className="mt-4" style={{ width: '100%', maxWidth: '500px', height: '300px' }}>
                        <Line data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// 

const SideBar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white ">
            <div className="p-4">
                
                <ul>
                    <li className="mb-3">
                        <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-300">Contacts</Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/viewcontacts" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-300">Contacts</Link>
                    </li>
                    <li className="mb-3">
                        <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded transition-colors duration-300">Charts</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
