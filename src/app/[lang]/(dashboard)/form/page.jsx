"use client"

// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import axios from 'axios';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Input } from '@mui/material';
import { useAsync } from 'react-use'




const FormLayoutsBasic = ({ FormFields, selectedTable, selectedSchema, isEdit: IsEdit, editData: retrievedEditData, onRetrivedEdit }) => {
    debugger;
    console.log('new edit data:', retrievedEditData);
    const [editData, setEditData] = useState(retrievedEditData || []);
    const fileNameKey = Object.keys(editData).find(key => key.includes("_filename"));
    const fileName = fileNameKey ? editData[fileNameKey] : null;
    const [isEdit, setIsEdit] = useState(IsEdit);
    const [values, setValues] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isSubmited, setIsSubmited] = useState();
    const [submitmessage, setSubmitmessage] = useState();
    const [isSubmitedError, setIsSubmitedError] = useState();
    const [relationshipOptionsList, setRelationshipOptionsList] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [selectedFileName, setSelectedFileName] = useState('');
    const [isFileSelected, setIsFileSelected] = useState();
    const [detailDependencyTable, setDetailDependencyTable] = useState('');
    const [detailDependencyData, setDetailDependencyData] = useState([]);
    const [detailTableData, setDetailTableData] = useState([]);
    const [detailTableName, setDetailTableName] = useState('');
    const [isTableisdependent, setisTableisdependent] = useState(false);
    const [detailFields, setDetailFields] = useState([]);
    const [dependencyAddButton, setDependencyAddButton] = useState('');
    const [fields, setFields] = useState(FormFields);
    const [rowCount, setRowCount] = useState(0);
    const [relationshipOptionsListDepTable, setRelationshipOptionsListDepTable] = useState([]);
    const [showAddRowbutton, setShowAddRowbutton] = useState(false);

    const handleInputChange = (e, index, columnName, columnDataType) => {

        debugger;
        if (isEdit) {
            const { value, checked, type } = e.target;

            // Update editData based on the previous state
            setEditData(prevEditData => {
                const updatedEditData = { ...prevEditData };
                // Update the specific field in the copy
                updatedEditData[columnName] = value;
                return updatedEditData;
            });


        } else {
            // used to empty the populated data in the edit modal

            const { value, checked, type } = e.target;
            const newValues = [...values];
            const newColumns = [...columns];

            // If it's a checkbox, set value to 1 if checked, 0 if unchecked
            const inputValue = columnDataType === 'checkbox' ? (checked ? 1 : 0) : value;

            newValues[index] = inputValue;

            /* if (columnDataType === 'file') {
                setIsFileIn(true);
                const file = e.target.files[0];
                const formData = new FormData();
                formData.append('file', file);
                setSelectedFile(file);
                // Append the file content or file name to newValues
                newValues[index] = file.name;
            } */

            console.log(newValues);

            // If columnName is provided, update the corresponding column
            if (columnName) {
                newColumns[index] = columnName;
            }

            // Update the state with the new values
            setValues(newValues);
            console.log('values:', newValues);
            console.log('new columns:', newColumns);
            setColumns(newColumns);
        }


    };

    // const handleAddinputFields = () => {
    //     debugger;
    //     setDependencyAddButton('+Add Row')
    //     const newFields = [...fields, ...detailTableData];
    //     console.log("Add rows", newFields);
    //     setFields(newFields);
    //     setRowCount(rowCount + 1)
    //     console.log(rowCount);
    //     const newOptions = [...relationshipOptionsList, ...relationshipOptionsListDepTable];
    //     setRelationshipOptionsList(newOptions);
    //     console.log("new options", newOptions, relationshipOptionsList);
    //     //console.log("addedRelationdata",newOptions);
    // }

    const handleDependencyTableInputChange = (e, rowIndex, columnName, dataType) => {
        // Make a copy of the retrievedData array
        const updatedData = [...retrievedData];

        // Update the value of the specific column for the current row
        updatedData[rowIndex] = {
            ...updatedData[rowIndex],
            [columnName]: e.target.value,
        };
        // Update the state with the modified retrievedData
        setRetrievedData(updatedData);


        const headerTableColumns = fields.map((item) => item.column_name);

        const resultArray = updatedData.map(obj => {
            const newObj = {}; // Create a new object with 'id' field

            // Iterate over the elements to find and add them to the new object
            headerTableColumns.forEach(element => {
                newObj[element] = obj[element];
            });

            return newObj;
        });

        setUpdateHeaderTableData(resultArray[0]);

        const newUpdatedData = updatedData.map(obj => {
            const newObj = { ...obj };
            headerTableColumns.forEach(item => {
                delete newObj[item];
            });
            return newObj;
        });

        setUpdateDetailData(newUpdatedData);

        console.log("updated data", newUpdatedData);
        console.log("Edit value", e.target.value);
        console.log("Edit field", updatedData);
        console.log("updated header table", resultArray[0]);
        console.log("filteredUpdatedData", headerTableColumns);

    };


    const openInNewTab = (url) => {

        console.log(url);
        const newWindow = window.open(`${url}`, '_blank');

        if (newWindow) {
            newWindow.opener = null; // Avoid security issues with cross-origin navigation
        }
    };

    const handleFileChange = (e, index, columnName) => {
        setIsFileSelected(true);
        const selectedFile = e.target.files[0];
        const selectedFileName = e.target.files[0].name;
        setSelectedFileName(selectedFileName);
        // Create a FormData object to send the file to the server
        const formdata = new FormData();
        formdata.append('file', selectedFile);
        //formdata.append('Form', formData.Master.Full_Name);
        setSelectedFile(formdata);
        const newValues = [...values];
        newValues[index] = selectedFileName;
        const newColumns = [...columns];

        if (columnName) {
            newColumns[index] = columnName;
        }

        setValues(newValues);
        console.log('values:', newValues);
        console.log('new columns:', newColumns);
        setColumns(newColumns);

        /* if (id !== null) {
            formdata.append('Form', retrievedData.Full_Name);
            setSelectedFile(formdata);
            setIsfileSelected(true);
        } else {
            setIsfileSelected(true);
            formdata.append('Form', formData.Master.Full_Name);
            setSelectedFile(formdata);
        }*/

        console.log('Selected File:', formdata);
    };

    const loadRelationDetails = async (tableName, selectedSchema) => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `api/getRelationshipDetails/${selectedSchema}/${tableName}`);
            fetchAllFieldRelations(response.data);
            console.log("relationShipDetails", response.data);
        } catch (error) {
            console.error('Error loading tables:', error);
        }
    };

    const loadPrimaryDataList = async (tableName, value, text) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getPrimaryDataList/${selectedSchema}/${tableName}/${value}/${text}`
            );
            return response.data;
        } catch (error) {
            console.error('Error loading tables:', error);
            return null;
        }
    };

    const fetchAllFieldRelations = async (relationShipDetails) => {
        if (relationShipDetails && relationShipDetails.length > 0) {
            const optionsList = [];

            for (const field of relationShipDetails) {
                const primaryTableDataList = await loadPrimaryDataList(field.primary_table, field.Primary_Table_Value, field.Primary_Table_Text);
                const insideDataList = [];
                if (primaryTableDataList && primaryTableDataList.length > 0) {

                    primaryTableDataList.forEach((fieldInside) => {
                        const dataInside = {
                            value: fieldInside.value,
                            text: fieldInside.text,
                        };
                        insideDataList.push(dataInside);
                    });
                    const dataOption = {
                        column: field.Relation_Table_value,
                        dependency: field.Dependency_Value,
                        options: insideDataList,
                    };

                    optionsList.push(dataOption);
                }
            }

            //console.log('optionsList', optionsList);
            setRelationshipOptionsList(optionsList);
            console.log("relationshipOptionlist", relationshipOptionsList);


        }
    };

    //function to load detail_dependency table data
    const loadDetailDependencydata = async () => {
        try {
            debugger;
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${'detail_dependency'}`);
            setDetailDependencyData(response.data);
            console.log(response.data[0].detail_table);
            setDetailTableName(response.data[0].detail_table);
            const detailTable = await loadDetailTable(response.data[0].detail_table);
            console.log("arr1", detailTable);
            loadRelationDetails(selectedTable);
            if (selectedTable === response.data[0].header_table) {
                setisTableisdependent(true);
                loadRelationDetailsDepTable(response.data[0].detail_table);
                setDependencyAddButton('+Add Details');
                setShowAddRowbutton(true);
                /* const newFields = [...fields, ...detailTable];
                setFields(newFields);
                console.log(newFields);  */
            } else {
                setisTableisdependent(false);
                console.log("the selected table is not in the header table of detail dependency");
            }
            //checkTablein_detaildependency(response.data[0].header_table);
        } catch (error) {
            console.error(error);
        }
    };

    const loadDetailDependencydataForEdit = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
            setDetailDependencyData(response.data);
            console.log(response.data[0].detail_table);
            setDetailTableName(response.data[0].detail_table);
            const detailTable = await loadDetailTable(response.data[0].detail_table);
            console.log("arr1", detailTable);
            loadRelationDetails(selectedTable);
            if (selectedTable === response.data[0].header_table) {
                setisTableisdependent(true);
                loadRelationDetailsDepTable(response.data[0].detail_table);

                /* const newFields = [...fields, ...detailTable];
                setFields(newFields);
                console.log(newFields);  */
            } else {
                console.log("the selected table is not in the header table of detail dependency");
            }
            //checkTablein_detaildependency(response.data[0].header_table);
        } catch (error) {
            console.error(error);
        }
    };


    const loadDetailDependencydataEdit = async (id) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
            const detailTable = await loadDetailTable(response.data[0].detail_table);
            //console.log("detail table selected", detailTable);

            const detailTableAllData = await loadDetailTableAllData(response.data[0].detail_table);
            //console.log("detail table all", detailTableAllData);

            console.log(id);
            const detailTableMatch = detailTableAllData.filter((item) => item.header_id === id);

            // Use a local variable to store the value
            const extraRowsCount = detailTableMatch.length;

            // Set the state with the local variable
            setEditExtraRowsCount(extraRowsCount);

            // Return an object containing both values
            return { extraRowsCount, detailTableMatch, detailTableData, detailTable };
        } catch (error) {
            console.error(error);
            // Handle the error as needed
            return { extraRowsCount: 0, detailTableMatch: [] }; // Return default values in case of an error
        }
    };


    const loadDetailTable = async (detail_table_name) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getDetailTable/${selectedSchema}/${detail_table_name}`);
            console.log(detail_table_name);
            const detailTable = response.data;
            setDetailTableData(detailTable);
            console.log("arr", detailTable);
            return detailTable;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const loadDetailTableAllData = async (detail_table_name) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}api/getDetailTableData/${selectedSchema}/${detail_table_name}`);
            const detailTable = response.data;
            setDetailTableDataFields(detailTable);
            return detailTable;
        } catch (error) {
            console.error(error); // Log the error
            return [];
        }
    };


    const loadRelationDetailsDepTable = async (tableName) => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_REACT_APP_API_URL + `api/getRelationshipDetails/${tableName}`);
            fetchAllFieldRelationsDepTable(response.data);
            console.log("relationShipDetails for dependent", response.data);
        } catch (error) {
            console.error('Error loading tables:', error);
        }
    };


    const fetchAllFieldRelationsDepTable = async (relationShipDetails) => {
        if (relationShipDetails && relationShipDetails.length > 0) {
            const optionsList = [];

            for (const field of relationShipDetails) {
                const primaryTableDataList = await loadPrimaryDataList(field.primary_table, field.Primary_Table_Value, field.Primary_Table_Text);
                const insideDataList = [];
                if (primaryTableDataList && primaryTableDataList.length > 0) {

                    primaryTableDataList.forEach((fieldInside) => {
                        const dataInside = {
                            value: fieldInside.value,
                            text: fieldInside.text,
                        };
                        insideDataList.push(dataInside);
                    });
                    const dataOption = {
                        column: field.Relation_Table_value,
                        dependency: field.Dependency_Value,
                        options: insideDataList,
                    };

                    optionsList.push(dataOption);
                }
            }

            //const newOptionList = [...relationshipOptionsList, ...optionsList];
            console.log('optionsListDepTable', optionsList);

            setRelationshipOptionsListDepTable(optionsList);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('values', values);
        console.log('columns', columns);
        delete editData.tableData;
        console.log('edit', editData);
        /* 
        console.log('values', values);
        console.log('columns', columns);
        delete editData.tableData;
        console.log('edit', editData);

        const sanitizedValues = values.map((value) => (value === '' ? null : value));

        if (!isEdit) {
            if (isFileSelected) {
                try {
                    // Send the file to the server using FormData
                    const response = await axios.post(
                        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/InsertFileDataDynamic',
                        selectedFile,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data', // Important for file uploads
                            },
                        }
                    );

                    const filepath = response.data.filePath;
                    const fileName = response.data.fileName;
                    console.log('filename', fileName);
                    // Define a regular expression to match file extensions
                    const fileExtensionRegex = /\.(pdf|docx|xlsx)$/i;

                    // Iterate over each value in the VALUES array

                    const NewValues = sanitizedValues.map(value => {
                        // Check if the value ends with a file extension
                        if (fileExtensionRegex.test(value)) {
                            // Replace the value with your desired text or leave it blank
                            const normalizedFileName = filepath.replace(/\\\\/g, '\\');
                            return normalizedFileName; // Replace with your desired text
                        } else {
                            // If the value doesn't end with a file extension, keep it unchanged
                            return value;
                        }
                    });

                    const UploadColumns = FormFields.map((item) => item.column_name);

                    const obj = {};

                    UploadColumns.forEach((item, index) => {
                        obj[item] = NewValues[index];
                    });


                    const updatedValues = Object.values(obj).map((value, index) => {

                        // Check if the value is null or undefined
                        if (value === null || value === undefined) {
                            // If it is null or undefined, replace it with the fileName
                            return fileName;
                        } else {
                            // If it is not null or undefined, keep it unchanged
                            return value;
                        }
                    });



                    try {
                        debugger;
                        const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/insertData', {
                            database: selectedSchema,
                            table: selectedTable,
                            columns: UploadColumns,
                            values: updatedValues, // Use the sanitized values array
                            username: 'Admin',
                        });

                        setValues(Array(FormFields.length).fill('')); // Assuming you have an initial state for `values`
                        setColumns(Array(FormFields.length).fill('')); // Assuming you have an initial state for `columns`

                        setIsSubmited(true);
                        setSubmitmessage('SUBMITTED');
                        setIsEdit(false);
                        onRetrivedEdit(false);
                        setIsSubmitedError(false);
                    } catch (error) {

                        console.error(error);
                        setIsSubmited(false);
                        setIsSubmitedError(true);
                    }

                } catch (error) {

                    console.error(error);

                }
            } else {
                try {
                    debugger;
                    const UploadColumns = FormFields.map((item) => item.column_name);
                    const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/insertData', {
                        database: selectedSchema,
                        table: selectedTable,
                        columns: UploadColumns,
                        values: sanitizedValues, // Use the sanitized values array
                        username: 'Admin',
                    });

                    setValues(Array(FormFields.length).fill('')); // Assuming you have an initial state for `values`
                    setColumns(Array(FormFields.length).fill('')); // Assuming you have an initial state for `columns`

                    setIsSubmited(true);
                    setSubmitmessage('SUBMITTED');
                    setIsEdit(false);
                    setIsSubmitedError(false);
                } catch (error) {

                    console.error(error);
                    setIsSubmited(false);
                    setIsSubmitedError(true);
                }
            }



        } else {
            if (isFileSelected) {
                try {
                    // Send the file to the server using FormData
                    const response = await axios.post(
                        process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/InsertFileDataDynamic',
                        selectedFile,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data', // Important for file uploads
                            },
                        }
                    );

                    const filepath = response.data.filePath;
                    const fileName = response.data.fileName;
                    console.log('filename', fileName);

                    const editColumns = Object.keys(editData);
                    const editValues = Object.values(editData);

                    // Define a regular expression to match file extensions
                    const fileExtensionRegex = /\.(pdf|docx|xlsx)$/i;

                    // Iterate over each value in the VALUES array



                    const UploadColumns = FormFields.map((item) => item.column_name);

                    const obj = {};

                    editColumns.forEach((item, index) => {
                        obj[item] = editValues[index];
                    });


                    // Create a new object with updated values
                    const updatedValues = {};
                    Object.keys(obj).forEach((key) => {
                        debugger;
                        // Check if the key ends with "_filename"
                        if (key.endsWith('_filename')) {
                            // If it does, update the value with fileName
                            updatedValues[key] = fileName;
                        } else if (key.endsWith('_file')) {
                            // Replace double backslashes with single backslashes in file paths
                            updatedValues[key] = filepath.replace(/\\\\/g, '\\');
                        } else {
                            updatedValues[key] = obj[key];
                        }
                    });

                    console.log('Updated values:', updatedValues);

                    debugger;

                    const sanitizedValues = editValues.map((value) => (value === '' ? null : value));
                    const responseUpdate = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/updateRecords', {
                        database: selectedSchema,
                        table: selectedTable,
                        valueId: editData.id,
                        columns: Object.keys(updatedValues),
                        values: Object.values(updatedValues), // Use the sanitized values array
                        username: 'Admin',
                    });


                    setIsSubmited(true);
                    setSubmitmessage('UPDATED');
                    setValues(Array(FormFields.length).fill('')); // Assuming you have an initial state for `values`
                    setIsEdit(false);

                } catch (error) {

                    console.error(error);
                    setIsEdit(false);

                }
            }

            else {
                try {
                    setIsEdit(false);
                    const editColumns = Object.keys(editData);
                    const editValues = Object.values(editData);
                    const sanitizedValues = editValues.map((value) => (value === '' ? null : value));
                    const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_API_URL + 'api/updateRecords', {
                        database: selectedSchema,
                        table: selectedTable,
                        valueId: editData.id,
                        columns: editColumns,
                        values: sanitizedValues, // Use the sanitized values array
                        username: 'Admin',
                    });

                    setIsSubmited(true);
                    setSubmitmessage('UPDATED');
                    setValues(Array(FormFields.length).fill('')); // Assuming you have an initial state for `values`


                } catch (error) {

                    console.error(error);
                    setIsEdit(false);

                }
            }


        } */


    }

    useEffect(() => {
        if (selectedTable && selectedSchema) {
            loadRelationDetails(selectedTable, selectedSchema);
        }
    }, [selectedTable, selectedSchema]);

    useEffect(() => {
        debugger;
        if (isEdit === true) {
            onRetrivedEdit(isEdit);
            //setIsEdit(false);
        } else {
            loadDetailDependencydata();
        }
    }, [isEdit]);


    const mysqlToHtmlInputType = {
        INT: 'number',
        TINYINT: 'checkbox',
        SMALLINT: 'number',
        MEDIUMINT: 'number',
        BIGINT: 'number',
        DECIMAL: 'number',
        FLOAT: 'number',
        DOUBLE: 'number',
        DATE: 'date',
        TIME: 'time',
        DATETIME: 'datetime-local',
        TIMESTAMP: 'datetime-local',
        YEAR: 'number',
        CHAR: 'text',
        VARCHAR: 'text',
        TINYTEXT: 'text',
        TEXT: 'text',
        MEDIUMTEXT: 'text',
        LONGTEXT: 'text',
        ENUM: 'select',
        SET: 'select',
        TINYBLOB: 'file',
        BLOB: 'file',
        MEDIUMBLOB: 'file',
        LONGBLOB: 'file',
        BOOLEAN: 'checkbox',
    };

    return (
        <Card>

            <CardHeader titleTypographyProps={{ variant: 'h6' }} />
            <CardContent>
                <form onSubmit={handleSubmit}>

                    {!isTableisdependent && (
                        <Grid container spacing={5}>

                            <Grid item xs={12}>
                                {FormFields.map((item, index) => {
                                    const labelText = item.COLUMN_COMMENT === '' ? item.column_name.toUpperCase().split('_').join(' ') : item.COLUMN_COMMENT.toUpperCase().split('_').join(' ');

                                    return (
                                        item.column_name === 'header_id' ? null :
                                            item.column_name.endsWith("_file") ? (
                                                <div key={index}>
                                                    {!isEdit ? (
                                                        <>
                                                            <InputLabel>{item.column_name.toUpperCase().split('_').join(' ')}</InputLabel>
                                                            <Input
                                                                accept="image/*"
                                                                style={{ display: 'none' }}
                                                                id={`raised-button-file-${index}`}
                                                                multiple
                                                                type="file"
                                                                onChange={(e) => handleFileChange(e, index, item.column_name)}
                                                            />
                                                            <label htmlFor={`raised-button-file-${index}`} >
                                                                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                    <Grid item xs={4}>
                                                                        <Button variant="contained" component="span" style={{ marginBottom: '20px' }}>
                                                                            Upload <i className="ri-upload-cloud-2-fill"></i>
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={8}>
                                                                        {selectedFile && (
                                                                            <Typography variant="body1" component="p">
                                                                                {selectedFileName}
                                                                            </Typography>
                                                                        )}
                                                                    </Grid>
                                                                </Grid>

                                                            </label>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Grid container spacing={2} >
                                                                <Grid item xs={12} md={12}>
                                                                    <InputLabel>{item.column_name.toUpperCase().split('_').join(' ')}</InputLabel>
                                                                    <Button

                                                                        variant="outlined"
                                                                        color="success"
                                                                        onClick={fileName === null ? null : () => openInNewTab(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}upload/${fileName}`)}
                                                                    >
                                                                        {fileName === null || fileName === 'null' ? 'Not Selected' : fileName}
                                                                    </Button>
                                                                </Grid>

                                                                <Grid item xs={12} md={12} style={{ marginBottom: '20px' }}>
                                                                    <Input

                                                                        accept="image/*"
                                                                        style={{ display: 'none' }}
                                                                        id={`raised-button-file-${index}`}
                                                                        multiple
                                                                        type="file"
                                                                        onChange={(e) => handleFileChange(e, index, item.column_name)}
                                                                    />
                                                                    <label htmlFor={`raised-button-file-${index}`} >

                                                                        <Button variant="contained" component="span" >
                                                                            Upload New <i className="ri-upload-cloud-2-fill"></i>
                                                                        </Button>

                                                                        <Grid item xs={12} md={12}>
                                                                            {selectedFile && (
                                                                                <Typography variant="body1" color="primary" fontWeight="bold" component="p">
                                                                                    {selectedFileName}
                                                                                </Typography>
                                                                            )}
                                                                        </Grid>


                                                                    </label>
                                                                </Grid>

                                                            </Grid>


                                                        </>
                                                    )}


                                                </div>
                                            ) :
                                                relationshipOptionsList.some((opt) => opt.column === item.column_name) ? (
                                                    <FormControl fullWidth key={index} style={{ marginBottom: 15 }}>
                                                        <InputLabel id={`demo-simple-select-label-${index}`}>{item.column_name}</InputLabel>
                                                        <Select
                                                            labelId={`demo-simple-select-label-${index}`}
                                                            id={`demo-simple-select-${index}`}
                                                            label={item.column_name}
                                                            value={(isEdit && editData && editData[item.column_name]) || (isEdit ? '' : values[index] || '')}
                                                            onChange={(e) => handleInputChange(e, index, item.column_name)}
                                                        >
                                                            <MenuItem value="">{'Select ' + item.column_name}</MenuItem>
                                                            {(relationshipOptionsList.find((opt) => opt.column === item.column_name)?.options ?? []).map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.text}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                ) : (
                                                    <TextField
                                                        disabled={item.column_name.endsWith("_filename") ? true : false}
                                                        InputLabelProps={{ shrink: true }}
                                                        style={{ marginBottom: 15 }}
                                                        fullWidth
                                                        key={index} // Add a unique key prop
                                                        required
                                                        id={`outlined-required-${index}`}
                                                        type={mysqlToHtmlInputType[item.data_type.toUpperCase()] || 'text'}
                                                        label={labelText}
                                                        value={(isEdit && editData && editData[item.column_name]) || (isEdit ? '' : values[index] || '')}
                                                        onChange={(e) => handleInputChange(e, index, item.column_name, item.data_type)}
                                                    />
                                                )
                                    );
                                })}
                                <Button fullWidth type='submit' sx={{ mr: 2 }} variant='contained'>
                                    Submit
                                </Button>
                            </Grid>
                            {isSubmited && (
                                <Alert severity="success">
                                    Successfully {submitmessage}
                                </Alert>
                            )}

                            {isSubmitedError && (
                                <Alert severity="error">
                                    Error Submitting Form
                                </Alert>
                            )}

                        </Grid>

                    )}

                    {isTableisdependent && (
                        <Grid item xs={12}>
                            {fields.map((item, index) => {
                                const labelText = item.column_name.toUpperCase().split('_').join(' ');

                                return (
                                    item.column_name === 'header_id' ? null :
                                        item.column_name.endsWith("_file") ? (
                                            <div key={index}>
                                                {!isEdit ? (
                                                    <>
                                                        <InputLabel>{item.column_name.toUpperCase().split('_').join(' ')}</InputLabel>
                                                        <Input
                                                            accept="image/*"
                                                            style={{ display: 'none' }}
                                                            id={`raised-button-file-${index}`}
                                                            multiple
                                                            type="file"
                                                            onChange={(e) => handleFileChange(e, index, item.column_name)}
                                                        />
                                                        <label htmlFor={`raised-button-file-${index}`} >
                                                            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                                                <Grid item xs={4}>
                                                                    <Button variant="contained" component="span" style={{ marginBottom: '20px' }}>
                                                                        Upload <i className="ri-upload-cloud-2-fill"></i>
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item xs={8}>
                                                                    {selectedFile && (
                                                                        <Typography variant="body1" component="p">
                                                                            {selectedFileName}
                                                                        </Typography>
                                                                    )}
                                                                </Grid>
                                                            </Grid>

                                                        </label>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Grid container spacing={2} >
                                                            <Grid item xs={12} md={12}>
                                                                <InputLabel>{item.column_name.toUpperCase().split('_').join(' ')}</InputLabel>
                                                                <Button

                                                                    variant="outlined"
                                                                    color="success"
                                                                    onClick={fileName === null ? null : () => openInNewTab(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}upload/${fileName}`)}
                                                                >
                                                                    {fileName === null || fileName === 'null' ? 'Not Selected' : fileName}
                                                                </Button>
                                                            </Grid>

                                                            <Grid item xs={12} md={12} style={{ marginBottom: '20px' }}>
                                                                <Input

                                                                    accept="image/*"
                                                                    style={{ display: 'none' }}
                                                                    id={`raised-button-file-${index}`}
                                                                    multiple
                                                                    type="file"
                                                                    onChange={(e) => handleFileChange(e, index, item.column_name)}
                                                                />
                                                                <label htmlFor={`raised-button-file-${index}`} >

                                                                    <Button variant="contained" component="span" >
                                                                        Upload New <i className="ri-upload-cloud-2-fill"></i>
                                                                    </Button>

                                                                    <Grid item xs={12} md={12}>
                                                                        {selectedFile && (
                                                                            <Typography variant="body1" color="primary" fontWeight="bold" component="p">
                                                                                {selectedFileName}
                                                                            </Typography>
                                                                        )}
                                                                    </Grid>


                                                                </label>
                                                            </Grid>

                                                        </Grid>


                                                    </>
                                                )}


                                            </div>
                                        ) : relationshipOptionsList.some((opt) => opt.column === item.column_name) ? (
                                            <FormControl fullWidth key={index} style={{ marginBottom: 15 }}>
                                                <InputLabel id={`demo-simple-select-label-${index}`}>{item.column_name}</InputLabel>
                                                <Select
                                                    labelId={`demo-simple-select-label-${index}`}
                                                    id={`demo-simple-select-${index}`}
                                                    label={item.column_name}
                                                    value={(isEdit && editData && editData[item.column_name]) || (isEdit ? '' : values[index] || '')}
                                                    onChange={(e) => handleInputChange(e, index, item.column_name)}
                                                >
                                                    <MenuItem value="">{'Select ' + item.column_name}</MenuItem>
                                                    {(relationshipOptionsList.find((opt) => opt.column === item.column_name)?.options ?? []).map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.text}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        ) : (
                                            <TextField
                                                disabled={item.column_name.endsWith("_filename")
                                                }
                                                InputLabelProps={{ shrink: true }}
                                                style={{ marginBottom: 15 }}
                                                fullWidth
                                                key={index}
                                                required
                                                id={`outlined-required-${index}`}
                                                type={mysqlToHtmlInputType[item.data_type.toUpperCase()] || 'text'}
                                                label={labelText}
                                                value={(isEdit && editData && editData[item.column_name]) || (isEdit ? '' : values[index] || '')}
                                                onChange={(e) => handleInputChange(e, index, item.column_name, item.data_type)}
                                            />
                                        )
                                );
                            })}
                            {/* {showAddRowbutton && (
                                <Button
                                    
                                    style={{ float: 'right' }}
                                    onClick={() => { handleAddinputFields() }}
                                >
                                    {dependencyAddButton}
                                </Button>
                            )} */}

                            <Button fullWidth type='submit' sx={{ mr: 2 }} variant='contained'>
                                Submit
                            </Button>
                        </Grid>
                    )}



                </form>
            </CardContent>
        </Card>
    )
}

export default FormLayoutsBasic
