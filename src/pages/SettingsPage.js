import React, { useState } from 'react';
import './SettingsPage.css';



function Settings() {

    const options = [
        {
            header: {
                name: "Account",
            },

            values: [
                {
                    name: "Profile",
                    description:
                        "Your email address is ypur identity on this app and is used to log in.",
                    tags: [
                        "email",
                        "username",
                        "first name",
                        "last name",
                        "date of birth",
                    ],
                },

                {
                    name: "Security",
                    description: "Change your security data.",
                    tags: [
                        "verify your account",
                        "change email",
                        "change password",
                    ],
                },
            ],
        },
        {
            header: {
                name: "Time Machine",
            },

            values: [
                {
                    name: "date",
                    description:
                        "use this machine to set the current day. ",
                    tags: [
                        "date and weather",
                        "synchronize",
                    ],
                },
            ],
        },
        {
            header: {
                name: "Support",
            },

            values: [
                {
                    name: "Help",
                    description: "having trouble",
                    tags: [],
                },

                {
                    name: "FAQ",
                    description: "View our frequently asked questions.",
                    tags: [],
                },
            ],
        },

    ];

    const [visibleOptions, setVisibleOptions] = useState(options);

    const onChange = (e) => {
        e.preventDefault();
        const value = e.target.value;

        console.log("value", value);


        if (value.trim().lenght === 0) {
            setVisibleOptions(options);
            return;

        }

        const returnedItems = [];

        visibleOptions.forEach((option, index) => {
            const foundOptions = option.values.filter(item => {

                return (

                    item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1 || item.description.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1
                );

            });

            returnedItems[index] = {
                header: {
                    name: option.header.name,
                },
                values: foundOptions,
            };

            if (
                option.header.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !== -1) {
                returnedItems[index] = {
                    header: {
                        name: option.header.name,
                    },
                    values: options[index].values,
                };

            }



        });

        setVisibleOptions(returnedItems);
    };

    return (
        <div className='Settings'>
            <div className='container my-5'>
                <h1>
                    <span>
                        <button className='btn btn-secondary'>
                            {" "}
                            <span>&lt;</span>Back{" "}
                        </button>{" "}
                        Settings
                    </span>
                </h1>
                <input type='text'
                    className='form-control mt-5'
                    onChange={onChange}
                    placeholder='search...' />

                <div className='option-category' >
                    {visibleOptions.map((option) => (
                        <div key={option.header.name} className='options-header mt-5 mt-2'>
                            <h3 style={{ fontWeight: 'bolder' }}> {option.header.name}</h3>

                            <div className='option-value'>
                                {option.values.map((value) => (
                                    <div key={value.name}>
                                        <ul className="list-group list-unstyled" >
                                            <li className="list-group-item d-flex mb-2 p-2" >
                                                <div className='col-10'>
                                                    <h6 style={{ fontWeight: 'bold' }}> {value.name}</h6>
                                                    <p> {value.description}</p>
                                                </div>
                                                <div className='col-2 d-flex justify-content-center align-items-center'>
                                                    <div className='toModal me-2 d-flex justify-content-end align-items-center'>
                                                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="chivron-icon bi bi-chevron-right" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                                                        </svg>
                                                    </button>
                                                    </div>


                                                </div>

                                            </li>

                                        </ul>


                                    </div>
                                ))}


                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>

    );
}


export default Settings;
