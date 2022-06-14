import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { APPLY_JOB } from '../utils/mutations';
import { useNavigate } from "react-router-dom";

const ApplicationForm = (props) => {
    const navigate = useNavigate();
    const [appFormData, setAppFormData] = useState({ contactInfo: '', notes: '', joiningDate: '' });

    const [addApplication, { error, data }] = useMutation(APPLY_JOB);

    // Capture values of fields when user adds or changes an input
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAppFormData({ ...appFormData, [name]: value });
    };

    // On form submission use mutation to apply for the selected job
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const { data } = await addApplication({
                variables: { 'jobId': props.jobId, ...appFormData },
            });
            // window.location.assign('/dashboard');
            navigate("/dashboard");
        } catch (err) {
            console.error(err);
        }

        setAppFormData({
            contactInfo: '', notes: '', joiningDate: ''
        });
    };
    return (
        <>
            <Form noValidate onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label htmlFor='contactInfo'>Email</Form.Label>
                    <Form.Control
                        type='text'
                        name='contactInfo'
                        onChange={handleInputChange}
                        value={appFormData.contactInfo}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='notes'>Additional notes</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name='notes'
                        onChange={handleInputChange}
                        value={appFormData.notes}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor='joiningDate'>Tentative Joining Date</Form.Label>
                    <Form.Control
                        type='date'
                        name='joiningDate'
                        onChange={handleInputChange}
                        value={appFormData.joiningDate}
                        required
                    />
                </Form.Group>
                <Button
                    type='submit'
                    variant='success'>
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default ApplicationForm;