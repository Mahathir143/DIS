import React, { useState, useEffect } from 'react';
//import logo from '../Content/Images/mainlogo.png'; // Adjust the path to your logo file
//import { toast, ToastContainer } from 'react-toastify';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { getDate } from 'date-fns';
import { useRouter } from 'next/router';

import SignaturePad from 'react-signature-canvas';
import 'bootstrap/dist/css/bootstrap.min.css';


const JobExitComponent = () => {

    /* const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); */

    const router = useRouter();
    const { id } = router.query;

    //console.log('exit id',id); // Check if id is correctly extracted


    const jobFields = ['Promotional Opportunities', 'Position Rotations', 'Increased Responsibilities', 'Special Projects', 'Overseas', 'Not Looking for any Progression', 'Others'];
    const radioOptions = ['1', '2', '3', '4', '5'];
    const [check, setCheck] = useState('');
    const [checkColumn, setCheckColumn] = useState('career_ops_imp_to_you');
    const [signature, setSignature] = useState('signature');
    const [isError, setIsError] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [sign, setSign] = useState();
    const [signatureBlob, setSignatureBlob] = useState('');
    const [startDate, setStartDate] = useState();
    const [sepDate, setSepDate] = useState();
    const [lenServiceDate, setLenServiceDate] = useState();
    const [lastDate, setLastDate] = useState();
    const [jobFields2, setSelectedJobfields] = useState([]);





    const [editExitFormData, setEditExitFormData] = useState([]);

    const [url, setUrl] = useState();



    const handleClear = () => {
        sign.clear();
    };

    const [formData, setFormData] = useState({
        Master: {
            employee_first_name: '',
            employee_last_name: '',
            job_title: '',
            start_date: '',
            seperation_date: '',
            len_of_service: '',
            reason_leaving: '',
            accept_another_pos: '',
            seek_another_job: '',
            searching_another_job: '',
            new_job_more_than_pos: '',
            career_goals_be_better: '',
            spoken_abt_career_goals: '',
            adequate_career_opportunities: '',
            career_ops_imp_to_you: '',
            job_responsibilites: '',
            ops_achieveing_goals: '',
            work_environment: '',
            director_manager: '',
            pay: '',
            benefits: '',
            most_enjoy_abt_job: '',
            least_enjoy_abt_job: '',
            good_place_work: '',
            poor_place_work: '',
            better_place_work: '',
            satisfactory_arrangement: '',
            Date: ''

        }
    });



    const generatePDF = () => {
        //window.print();
    };

    const handleInputChange = (value, name) => {

        if (id !== null) {
            setEditExitFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                Master: {
                    ...prevState.Master,
                    [name]: value
                }
            }));
        }

    };
    const handleCheckChange = (e, value) => {

        const { checked } = e.target;

        console.log(checked, value);

        if (id !== null) {
            if (!checked) {
                setEditExitFormData(prevState => ({
                    ...prevState,
                    career_ops_imp_to_you: prevState.career_ops_imp_to_you.filter(item => item !== value)
                }))
            } else {
                setEditExitFormData(prevState => ({
                    ...prevState,
                    career_ops_imp_to_you: [...prevState.career_ops_imp_to_you, value]
                }))
            }
        } else {
            let updatedValues = '';

            if (checked) {
                // If the checkbox is checked, add the value to the list
                updatedValues = check ? `${check},${value}` : value;
            } else {
                // If the checkbox is unchecked, remove the value from the list
                updatedValues = check
                    .split(',')
                    .filter((job) => job !== value)
                    .join(',');
            }

            setCheck(updatedValues);
            console.log('check', check);
        }


    };

    const getExitFormData = async () => {

        try {
            const responseUpdateData = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/GetExitFormData/${id}`);


            const originalStartDateString = responseUpdateData.data[0].start_date;
            const Startdate = new Date(originalStartDateString);

            // Format the date as YYYY-MM-DD
            const formattedStartDate = Startdate.toISOString().split('T')[0];
            setStartDate(formattedStartDate);

            const originalSepDateString = responseUpdateData.data[0].seperation_date;
            const Sepdate = new Date(originalSepDateString);

            // Format the date as YYYY-MM-DD
            const formattedSepDate = Sepdate.toISOString().split('T')[0];
            setSepDate(formattedSepDate);


            const originalLenServiceDateString = responseUpdateData.data[0].len_of_service;
            const LenServicedate = new Date(originalLenServiceDateString);

            // Format the date as YYYY-MM-DD
            const formattedLenServiceDate = LenServicedate.toISOString().split('T')[0];
            setLenServiceDate(formattedLenServiceDate);

            const originalLastDateString = responseUpdateData.data[0].Date;
            const Lastdate = new Date(originalLastDateString);

            // Format the date as YYYY-MM-DD
            const formattedLastDate = Lastdate.toISOString().split('T')[0];
            setLastDate(formattedLastDate);

            responseUpdateData.data[0].start_date = formattedStartDate;

            responseUpdateData.data[0].seperation_date = formattedSepDate;

            responseUpdateData.data[0].len_of_service = formattedLenServiceDate;

            responseUpdateData.data[0].Date = formattedLastDate;


            //console.log('selected jobs', responseUpdateData.data[0].career_ops_imp_to_you)
            const careerOpsString = responseUpdateData.data[0].career_ops_imp_to_you;
            // Split the string into an array using commas as the delimiter
            const opportunitiesArray = careerOpsString.split(',');

            responseUpdateData.data[0].career_ops_imp_to_you = opportunitiesArray;
            console.log('exit form data', responseUpdateData.data[0]);
            setEditExitFormData(responseUpdateData.data[0]);






            //setSelectedJobfields(opportunitiesArray);
            console.log('new job fields', opportunitiesArray);

            opportunitiesArray.map((item) => {
                jobFields2.push(item)
            });


            const imageBuffer = responseUpdateData.data[0].signature;
            const base64Data = Buffer.from(imageBuffer).toString('base64');
            const decodedData = atob(base64Data);

            setSignatureBlob(decodedData);

            console.log('base64', decodedData);


        } catch (error) {
            console.log('error', error);
        }
    }


    const handleSubmit = () => {




        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
        setFormData((prevState) => ({
            ...prevState,
            Master: {
                ...prevState.Master,
                [checkColumn]: check,
            },
        }));
        setFormData((prevState) => ({
            ...prevState,
            Master: {
                ...prevState.Master,
                [signature]: sign.getTrimmedCanvas().toDataURL('image/png'),
            },
        }));
        setFormSubmitted(true);
    };

    const InsertFormData = async (newFormData) => {
        try {
            const responseInsertData = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/InsertExitFormData', {
                FormData: newFormData
            });
            setIsSaved(true);

        } catch (error) {
            console.log('error');
            setIsSaved(false);
        }
    };

    const UpdateFormData = async () => {


        console.log('check', check);
        const joinStringArray = editExitFormData.career_ops_imp_to_you.join(',');
        editExitFormData.career_ops_imp_to_you = joinStringArray;
        console.log('edit form data', editExitFormData)
        try {
            const responseUpdateData = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/UpdateExitFormData', {
                FormData: editExitFormData
            });
            setIsSaved(true);

        } catch (error) {
            console.log('error');
            setIsSaved(false);
        }
    }


    useEffect(() => {
        if (router.query && router.query.id !== null) {
            getExitFormData(router.query.id);
        }
        if (formSubmitted) {

            console.log('formdata', formData);
            console.log('blob', url);
            const mandatoryFields = [
                'employee_first_name', 'employee_last_name', 'job_title',
                'start_date', 'seperation_date', 'len_of_service', 'reason_leaving',
                'accept_another_pos', 'seek_another_job', 'searching_another_job',
                'new_job_more_than_pos', 'career_goals_be_better', 'spoken_abt_career_goals',
                'adequate_career_opportunities', 'career_ops_imp_to_you', 'job_responsibilites',
                'ops_achieveing_goals', 'work_environment', 'director_manager', 'pay', 'benefits',
                'most_enjoy_abt_job', 'least_enjoy_abt_job', 'good_place_work', 'poor_place_work',
                'better_place_work', 'satisfactory_arrangement', 'Date'

            ];

            for (const field of mandatoryFields) {
                if (!formData.Master[field]) {
                    setIsError(true);

                    /* toast.error(`Please fill in the required fields`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }); */

                    if (field === 'job_responsibilites' || field === 'ops_achieveing_goals' || field === 'work_environment' || field === 'director_manager' || field === 'pay' || field === 'benefits') {
                        /*  toast.error(`Please check ${field.replace(/_/g, ' ')}`, {
                             position: "top-center",
                             autoClose: 5000,
                             hideProgressBar: false,
                             closeOnClick: true,
                             pauseOnHover: true,
                             draggable: true,
                             progress: undefined,
                             theme: "dark",
                         }); */
                    }

                    setFormSubmitted(false);
                    return;
                }
            }


            InsertFormData(formData);
        }
    }, [formData, formSubmitted, router.query]);

    return (
        <Container style={{ backgroundColor: '#F8F9FA' }}>
            {/* <ToastContainer /> */}
            <Row>
                {/* <Col md={12} className='text-center mb-4'>
                    <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '200px' }} />
                </Col> */}
            </Row>
            {!isSaved ? (
                <Row>
                    <Col md={12}>
                        <h5 style={{ textAlign: 'center' }}>EMPLOYEE EXIT INTERVIEW</h5>
                    </Col>
                    {/* <Col md={12} style={{ textAlign: 'left' }}>
                        <h5>Purpose</h5>
                        <p>The intent of this Exit Interview is to ensure that any employee is informed of his/her rights,
                            benefits, and the records are collected and maintained regarding the termination of employment.
                        </p>
                        <h5>Policy</h5>
                        <p>
                            It is the policy of Easy Outdesk Company to ensure that any employee whose employment is being terminated, whether voluntary or involuntarily, receives an exit interview.
                            The exit interview shall be conducted by Sharon Williams and/ or Natalia Winfree. The objectives of the exit interview are as follows:
                        </p>
                        <h5>Policy</h5>
                        <p>
                            It is the policy of Easy Outdesk Company to ensure that any employee whose employment is being terminated, whether voluntary or involuntarily, receives an exit interview.
                            The exit interview shall be conducted by Sharon Williams and/ or Natalia Winfree. The objectives of the exit interview are as follows:
                        </p>
                        <ul>
                            <li>To determine and discuss the employee’s reason for resignation, if applicable.</li>
                            <li>To discover and discuss any misunderstandings the employee may have had about his/her job or with his/her manager.</li>
                            <li>To maintain good will and teamwork amongst current and future employees.</li>
                            <li>To review administrative details with the employee such as benefit continuation rights and conversion privileges,
                                if any, final pay, re-employment policy, and employment compensation.</li>
                            <li>To review administrative details with the employee such as benefit continuation rights and conversion privileges,
                                if any, final pay, re-employment policy, and employment compensation.</li>
                        </ul>
                        <h5>Procedure</h5>
                        <p>Upon an employee’s announcement of his/her intent to resign, the project director or manager shall schedule an exit interview for the employee with Sharon Williams or Natalia Winfree as soon as possible.</p>

                        <p> In the event that a decision has been made to terminate an employee, the employee shall meet with Sharon Williams or Natalia Winfree for an exit interview as soon as possible, or as deemed appropriate.</p>

                        <p> Throughout the duration of the exit interview, Sharon Williams or Natalia Winfree shall seek to meet all objectives listed within the exit interview policy.</p>

                        <p>The departing employee shall complete the following exit interview form as thoroughly as possible.</p>

                        <p> Any information obtained during the exit interview may be disclosed to and/or discussed with the employee manager, the project Director and Partners, as deemed necessary, in order to investigate any allegations made or to inform them of any emerging problems.</p>
                        <h4>REMINDERS</h4>
                        <p>Please remember that your work with Easy Outdesk Company was completed under a non-disclousure agreement. We highly value client confidentiality and all terms of the agreement. Feel free to request a copy for your reference if you do not already have one.</p>
                        <p>All Easy Outdesk Company equipment must be returned to the main office in order to received final payment.</p>
                    </Col> */}
                    <Row>
                        <Form>
                            <Form.Group>
                                <Row>
                                    {/* First Name and Last Name */}
                                    <Col xs={12} md={6}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Label style={{ textAlign: 'left', fontWeight: 'bolder' }}>Employee First Name</Form.Label>
                                                <Form.Control type='text'
                                                    placeholder='First Name'
                                                    value={id === null ? null : editExitFormData.employee_first_name}
                                                    onChange={(e) => handleInputChange(e.target.value, 'employee_first_name')}
                                                    isInvalid={isError && formData.Master.employee_first_name === ''}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    This field is required
                                                </Form.Control.Feedback>

                                            </Col>
                                            <Col md={6}>
                                                <Form.Label style={{ textAlign: 'left', fontWeight: 'bolder' }}>Employee Last Name</Form.Label>
                                                <Form.Control type='text'
                                                    placeholder='Last Name'
                                                    value={id === null ? null : editExitFormData.employee_last_name}
                                                    onChange={(e) => handleInputChange(e.target.value, 'employee_last_name')}
                                                    isInvalid={isError && formData.Master.employee_last_name === ''}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    This field is required
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* Job Title */}
                                    <Col xs={12} md={6}>
                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bolder' }}>Job Title</Form.Label>
                                        <Form.Control type='text'
                                            value={id === null ? null : editExitFormData.job_title}
                                            onChange={(e) => handleInputChange(e.target.value, 'job_title')}
                                            isInvalid={isError && formData.Master.job_title === ''}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group style={{ paddingTop: '15px' }}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Start Date</Form.Label>
                                        <Form.Control type='date'
                                            value={id === null ? null : editExitFormData.start_date}
                                            onChange={(e) => handleInputChange(e.target.value, 'start_date')}
                                            isInvalid={isError && formData.Master.start_date === ''}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>
                                <Row style={{ paddingTop: '15px' }}>
                                    <Col md={6}>
                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Seperation Date</Form.Label>
                                        <Form.Control

                                            type='date'
                                            value={id === null ? null : editExitFormData.seperation_date}
                                            onChange={(e) => handleInputChange(e.target.value, 'seperation_date')}
                                            isInvalid={isError && formData.Master.seperation_date === ''}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                        </Form.Control.Feedback>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Total Length of Service</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={id === null ? null : editExitFormData.len_of_service}
                                            onChange={(e) => handleInputChange(e.target.value, 'len_of_service')}
                                            isInvalid={isError && formData.Master.len_of_service === ''}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                        </Form.Control.Feedback>
                                    </Col>
                                </Row>

                                <Row style={{ paddingTop: '15px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Reason for Leaving</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={id === null ? null : editExitFormData.reason_leaving}
                                        rows={3} onChange={(e) => handleInputChange(e.target.value, 'reason_leaving')}
                                        isInvalid={isError && formData.Master.reason_leaving === ''}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>
                            </Form.Group>

                            <Form.Group style={{ paddingTop: '20px' }}>
                                <h5 style={{ textAlign: 'left' }}>REASONS FOR LEAVING</h5>
                                <Row style={{ paddingTop: '15px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Have you accepted another position?</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={id === null ? null : editExitFormData.accept_another_pos}
                                        isInvalid={isError && formData.Master.accept_another_pos === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'accept_another_pos')}>
                                        <option>Please Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>
                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What prompted you to seek another job?</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={id === null ? null : editExitFormData.seek_another_job}
                                        isInvalid={isError && formData.Master.seek_another_job === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'seek_another_job')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>When did you begin searching for another job?</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.searching_another_job}
                                        isInvalid={isError && formData.Master.searching_another_job === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'searching_another_job')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What makes the new job more attractive than your current position?</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.new_job_more_than_pos}
                                        isInvalid={isError && formData.Master.new_job_more_than_pos === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'new_job_more_than_pos')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What made you decide that your career goals could be better achieved elsewhere?</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.career_goals_be_better}
                                        isInvalid={isError && formData.Master.career_goals_be_better === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'career_goals_be_better')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Have you spoken with anyone, either your director or any of the partners about your career goals?</Form.Label>
                                    <Form.Control as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.spoken_abt_career_goals}
                                        isInvalid={isError && formData.Master.spoken_abt_career_goals === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'spoken_abt_career_goals')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>In your opinion, have there been adequate career opportunities available within company?</Form.Label>
                                    <Form.Select aria-label="Default select example"
                                        value={id === null ? null : editExitFormData.adequate_career_opportunities}
                                        isInvalid={isError && formData.Master.adequate_career_opportunities === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'adequate_career_opportunities')}>
                                        <option>Please Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </Form.Select>

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>

                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                        What types of career opportunities are important to you? (Select all that apply)
                                    </Form.Label>
                                    {jobFields.map((job, index) => (
                                        <Col xs={12} md={6} style={{ paddingTop: '10px' }}>
                                            <Form.Check
                                                style={{ paddingRight: '10px' }}
                                                key={index}
                                                type="checkbox"
                                                label={`${job}`}
                                                id={`disabled-default-${job}`}
                                                checked={editExitFormData.career_ops_imp_to_you !== undefined ? editExitFormData.career_ops_imp_to_you.includes(job) : null}
                                                className="d-flex align-items-start"
                                                isInvalid={isError && formData.Master.career_ops_imp_to_you === ''}
                                                onChange={(e) => handleCheckChange(e, job)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                This field is required
                                            </Form.Control.Feedback>
                                        </Col>
                                    ))}

                                </Row>

                            </Form.Group>

                            {/* job satisfaction radios */}
                            <Form.Group style={{ paddingTop: '20px' }}>
                                <h5 style={{ textAlign: 'left', paddingTop: '20px' }}>JOB SATISFACTION</h5>
                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Job Responsibilities</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>

                                            {radioOptions.map((option, index) => (

                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="jrRadio"
                                                        id={`jrRadio${option}`}

                                                        checked={editExitFormData.job_responsibilites === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "job_responsibilites")}  ></input>

                                                    <label htmlFor={`jrRadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Opportunity for Achieving Goals</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {radioOptions.map((option, index) => (
                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="AGRadio"
                                                        id={`AGRadio${option}`}
                                                        checked={editExitFormData.ops_achieveing_goals === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "ops_achieveing_goals")}  ></input>
                                                    <label htmlFor={`AGRadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Work Environment</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {radioOptions.map((option, index) => (
                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="WERadio"
                                                        id={`WERadio${option}`}
                                                        checked={editExitFormData.work_environment === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "work_environment")} ></input>
                                                    <label htmlFor={`WERadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Director/ Manager</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {radioOptions.map((option, index) => (
                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="DMRadio"
                                                        id={`DMRadio${option}`}
                                                        checked={editExitFormData.director_manager === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "director_manager")} ></input>
                                                    <label htmlFor={`DMRadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>

                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Pay</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {radioOptions.map((option, index) => (
                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="PRadio"
                                                        id={`PRadio${option}`}
                                                        checked={editExitFormData.pay === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "pay")} ></input>
                                                    <label htmlFor={`PRadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>


                                <Row >
                                    <Col style={{ margin: '1rem', backgroundColor: '#FFF' }}>

                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Benefits</Form.Label>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {radioOptions.map((option, index) => (
                                                <Col xs={2} md={2}>
                                                    <input type="radio"
                                                        name="BRadio"
                                                        id={`BRadio${option}`}
                                                        checked={editExitFormData.benefits === option ? true : null}
                                                        onChange={(e) => handleInputChange(option, "benefits")} ></input>
                                                    <label htmlFor={`BRadio${option}`} class="radioLable">{option}</label>
                                                    {index === 0 && (
                                                        <p>Unsatisfied</p>
                                                    )}

                                                    {index === radioOptions.length - 1 && (
                                                        <p>Outstanding</p>
                                                    )}

                                                </Col>


                                            ))}


                                        </Row>


                                    </Col>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What did you enjoy most about your job?</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.most_enjoy_abt_job}
                                        isInvalid={isError && formData.Master.most_enjoy_abt_job === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'most_enjoy_abt_job')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>

                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What did you enjoy least about your job?</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.least_enjoy_abt_job}
                                        isInvalid={isError && formData.Master.least_enjoy_abt_job === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'least_enjoy_abt_job')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What makes EASY OUTDESK a good place to work?</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.good_place_work}
                                        isInvalid={isError && formData.Master.good_place_work === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'good_place_work')}

                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What makes the company poor place to work?</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.poor_place_work}
                                        isInvalid={isError && formData.Master.poor_place_work === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'poor_place_work')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What recommendation would you have for making the company as a whole a better place to work?</Form.Label>
                                    <Form.Control
                                        as="textarea" rows={3}
                                        value={id === null ? null : editExitFormData.better_place_work}
                                        isInvalid={isError && formData.Master.better_place_work === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'better_place_work')}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>Would you have stayed if a more satisfactory arrangement could have been worked out?</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        value={id === null ? null : editExitFormData.satisfactory_arrangement}
                                        isInvalid={isError && formData.Master.satisfactory_arrangement === ''}
                                        onChange={(e) => handleInputChange(e.target.value, 'satisfactory_arrangement')}>
                                        <option>Please Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>

                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        This field is required
                                    </Form.Control.Feedback>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <p>Please sign and date this form below authorizing the placement of this Exit Interview form within your personal file.</p>
                                </Row>

                                <Row style={{ paddingTop: '20px' }}>
                                    <Col md={6} >
                                        <Form.Label style={{ textAlign: 'left', fontWeight: 'bold' }}>What recommendation would you have for making the company as a whole a better place to work?</Form.Label>
                                        <Form.Control
                                            type='date'
                                            value={id === null ? null : editExitFormData.Date}
                                            isInvalid={isError && formData.Master.Date === ''}
                                            onChange={(e) => handleInputChange(e.target.value, 'Date')}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            This field is required
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col md={6} >
                                        <Col md={12} style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                            <h4>Signature</h4>
                                        </Col>
                                        <Col xs={12} md={8} lg={6} className="d-flex justify-content-center">
                                            <Col xs={12} md={10} style={{ border: '2px solid #000', maxWidth: '400px', margin: 'auto' }}>
                                                {id !== null ? (
                                                    <div>
                                                        {/* Displaying the Base64-encoded image */}
                                                        <img src={signatureBlob} alt="Base64 Image" />
                                                    </div>
                                                ) : <SignaturePad
                                                    canvasProps={{ className: 'sigCanvas', style: { maxWidth: '100%' } }}
                                                    ref={data => setSign(data)}
                                                />}

                                            </Col>
                                        </Col>


                                        <Col md={12} style={{ textAlign: 'end' }}>
                                            <Button variant="secondary" onClick={handleClear}>Clear</Button>
                                        </Col>


                                    </Col>
                                </Row>
                            </Form.Group>


                        </Form>
                        {id !== null && (
                            <Button onClick={generatePDF}>Export PDF</Button>
                        )}
                        <Button onClick={id !== null ? UpdateFormData : handleSubmit}>
                            SUBMIT
                        </Button>
                    </Row>
                </Row>


            ) :
                (
                    <>
                        <div style={{ textAlign: 'center', color: 'green', fontSize: '1.5rem' }}>
                            <p>Thank you for submitting your application.</p>
                            <p>We have received it successfully.</p>
                            <p style={{ marginTop: '10px' }}>Our team will review your submission and get back to you shortly. Have a great day!</p>
                        </div>
                    </>

                )}
        </Container>


    );
};

export default JobExitComponent;