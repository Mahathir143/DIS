import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faL, faBars, faXmark, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col, Container, Dropdown, Form, ListGroup, Modal } from 'react-bootstrap';
import { Buffer } from 'buffer';
import 'D:/project/DynamicScreen/DynamicScreenClient/src/pages/DynamicScreen.css';
import { format } from 'date-fns'; // Make sure to import the 'format' function



const DynamicScreen = (props) => {
  const [schemaList, setSchemaList] = useState([]);
  const [schemaList_SA, setSchemaList_SA] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState('');
  const [isSchemaSelected, setIsSchemaSelected] = useState(false);
  const [istableRestrictionClick, setIstableRestrictionClick] = useState(false);
  const [allTables, setAllTables] = useState([]);
  const [tables, setTables] = useState([]);
  const [nonRestrictedTables, setNonRestrictedTables] = useState([]);
  const [viewRestrictionTables, setViewRestrictionTable] = useState([]);
  const [tablesForRestriction, setTablesforRestriction] = useState([]);
  const [roleTablesData, setRoleTablesData] = useState([]);
  const [userTablesData, setUserTableData] = useState([]);
  const [permissionTableData, setPermissionTableData] = useState([]);
  const [detailDependencyTable, setDetailDependencyTable] = useState('');
  const [detailDependencyData, setDetailDependencyData] = useState([]);
  const [detailTableData, setDetailTableData] = useState([]);
  const [detailTableName, setDetailTableName] = useState('');
  const [detailTableDataFields, setDetailTableDataFields] = useState([]);
  const [editExtraRowsCount, setEditExtraRowsCount] = useState();
  const [executeInputValues, setExecuteInputValues] = useState([]);
  const [newColumns, setNewColumns] = useState([]);
  const [detailFields, setDetailFields] = useState([]);
  const [fieldsAdded, setFieldsAdded] = useState(false);
  const [updateheaderTableData, setUpdateHeaderTableData] = useState([]);
  const [updateDetailData, setUpdateDetailData] = useState([]);
  const [isEditclick, setIsEditClick] = useState(false);
  const [isRolefieldclick, setRoleFieldClick] = useState(true);
  const [isPermissionTableChosen, setIsPermissionTableChosen] = useState(false);
  const [permissionData, setPermissionData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [roleFormData, setRoleFormData] = useState([]);
  const [insertPermissionData, setinsertPermissionData] = useState([]);
  const [insertRestrictionData, setInsertRestrictionData] = useState([]);
  const [dataForRestrictioncondition, setDataForRestrictioncondition] = useState([]);
  const [retrievedRoleData, setretrievedRoleData] = useState([]);
  const [retrievedPermissionData, setretrievedPermissionData] = useState([]);
  const [tableRestrictionData, setTableRestrictionData] = useState([]);
  const [isEditTableRestrictionClicked, setIsEditTableRestrictionClicked] = useState(false);


  const [showAddRowbutton, setShowAddRowbutton] = useState(false);

  const [showAddbutton, setShowAddbutton] = useState(true);
  const [showEditbutton, setShowEditbutton] = useState(true);
  const [showDeletebutton, setShowDeletebutton] = useState(true);
  const [showViewbutton, setShowViewbutton] = useState(true);
  const [showsubmitButton, setShowsubmitButton] = useState(true);

  const [isTableisdependent, setisTableisdependent] = useState(false);
  const [submitButton, setSubmitButton] = useState('SUBMIT')
  const [retrievedData, setRetrievedData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [storedProcedureData, setStoredProcedureData] = useState([]);

  const [extLinks, setExtLinks] = useState([]);
  const [executeMenu, setExecuteMenu] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [fields, setFields] = useState([]);
  const [defaultFields, setDefaultFields] = useState([]);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState([]);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isRestrictionModalOpen, setIsRestrictionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditPermissionModalOpen, setIsEditPermissionModalOpen] = useState(false);
  const [relationshipOptionsList, setRelationshipOptionsList] = useState([]);
  const [relationshipOptionsListDepTable, setRelationshipOptionsListDepTable] = useState([]);
  const [goToPageInput, setGoToPageInput] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [delId, setDelId] = useState("");

  const [order, setOrder] = useState("ASC");
  const [currentSortcolumn, setCurrentSortcolumn] = useState();
  const [arrowButton, setArrowButton] = useState("");

  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isExecuteDropdownOpen, setIsExecuteDropdownOpen] = useState(false);
  const [isConfigDropdownOpen, setIsConfigDropdownOpen] = useState(false);
  const [isOtherDropdownOpen, setIsOtherDropdownOpen] = useState(false);
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);

  const [selectedLink, setSelectedLink] = useState('');
  const [showIframe, setShowIframe] = useState(false);
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [showProcedureDataModal, setShowProcedureDataModal] = useState(false);
  const [procedureName, setProcedureName] = useState('');
  const [showExecuteButton, setShowExecuteButton] = useState(false);
  const [procedureParameters, setProcedureParameters] = useState([]);
  const [showSideBar, setShowSideBar] = useState(true);

  const [search, setSearch] = useState("");
  const history = useHistory();

  const [companyDetails, setCompanyDetails] = useState([]);
  const [imgBlob, setImgBlob] = useState('');

  const [formData, setFormData] = useState([]);
  const [dependencyAddButton, setDependencyAddButton] = useState('')

  const [rowCount, setRowCount] = useState(0);
  const [crudaccessData, setCrudAccessData] = useState([]);

  // Retrieve the selected company name from the route parameters
  const companyName = props.location.state && props.location.state.companyName;
  const userName = props.location.state && props.location.state.userName;
  const roleCode = props.location.state && props.location.state.roleCode;
  const permissionTables = props.location.state && props.location.state.permissionTables;
  const crudPermissionData = props.location.state && props.location.state.crudPermissionData;

  //column sorting function
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setData(sorted);
      setCurrentSortcolumn(col);
      setArrowButton("▲");
      setOrder("DSC");

    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setData(sorted);
      setCurrentSortcolumn(col);
      setArrowButton("▼");
      setOrder("ASC");
    }
  };


  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Number of items to display per page
  //const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Go to page function
  const handleGoToPage = () => {
    const pageNumber = parseInt(goToPageInput, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber - 1);
      setGoToPageInput('');
    } else {
      // Show an error message or handle invalid input
      console.log("invalid page number")
    }
  };

  // Function to handle entries per page change
  const handleEntriesPerPageChange = (e) => {
    const newEntriesPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newEntriesPerPage);
    setCurrentPage(0); // Reset to the first page when changing entries per page
  };


  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //const itemsToDisplay = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  //function to handle filtered data for searching
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value && value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  //slice filtered data
  const itemsToDisplay = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  //Get schemas
  const loadDatabase = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/getDatabases');
      setSchemaList(response.data);
      console.log("schemas", response.data);
    } catch (error) {
      console.error('Error loading schema:', error);
    }
  };

  const loadDatabaseSA = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/getDatabases_SA');
      setSchemaList_SA(response.data);
    } catch (error) {
      console.error('Error loading schema:', error);
    }
  };


  /*   const handleSchemaChange = (schemaName) => {
      setSelectedSchema(schemaName);
      loadTables(schemaName);
      setSelectedTable(''); // Clear the selected table when changing the schema
    }; */



  const loadTables = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getTables/${schemaName}`);

      const tablesArray = response.data;

      const onlyTables = response.data.map((item) => item.Tables);

      const prevData = [];
      const tableswithCondition = onlyTables.map((item) => ({
        ...prevData,
        [item]: {
          ...prevData[item],
          ['remove']: false
        },
      }));


      setDataForRestrictioncondition(tableswithCondition);
      console.log("only tables", tableswithCondition);



      setTablesforRestriction(tablesArray);
      console.log("tablesforRestriction", response.data);

      const RoleTables = Object.values(tablesArray).filter(item => item.Tables === 'role');

      setRoleTablesData(RoleTables);

      const PermissionTables = Object.values(tablesArray).filter(item => item.Tables === 'permission');

      setPermissionTableData(PermissionTables);

      const userTablesData = Object.values(tablesArray).filter(item => item.Tables === 'user');

      setUserTableData(userTablesData);

      const filteredArray = tablesArray.filter(item => permissionTables.includes(item.Tables));
      setAllTables(filteredArray);
      console.log("all tables", filteredArray);

      const newFilteredArray = filteredArray.filter(item => !(item.Tables === 'role' || item.Tables === 'user' || item.Tables === 'permission'));

      //setTables(newFilteredArray);
      console.log("current tables", newFilteredArray);

      // Find the 'detail_dependency' table in the array
      const detailTable = filteredArray.find(table => table.Tables === 'detail_dependency');

      // Check if the table is found
      if (detailTable) {
        // Access the table details
        setDetailDependencyTable(detailTable.Tables);
      } else {
        console.log('detail dependency table not found');
      }
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadNonRestrictedTables = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getNonRestrictedTables/${schemaName}`);
      setNonRestrictedTables(response.data);
      setTables(response.data);
      console.log("non restricted tables", response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadViewRestrictionTable = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getViewRestrictionTable/${schemaName}`);
      setViewRestrictionTable(response.data);
      console.log("view restriction tables", response.data);
    } catch (error) {
      console.error('Error loading table');
    }
  };

  //load external links for iframe
  const loadExternalLinks = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getExternalLinks/${schemaName}`);
      setExtLinks(response.data);
    } catch (error) {
      console.error('Error getting External links table');
    }
  };

  const loadExecuteMenu = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getExecutableTables/${schemaName}`);
      console.log(response.data);
      setExecuteMenu(response.data);
    } catch (error) {
      console.error('Error getting execute menu');
    }
  }

  //Get Company details and image
  const loadCompanyDetails = async (schemaName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getCompanyDetails/${schemaName}`);
      setCompanyDetails(response.data);
      const imageBuffer = response.data[0].company_logo.data;
      const base64Data = Buffer.from(imageBuffer).toString('base64');
      const decodedData = atob(base64Data);//Decode the base64 converted string using atob.
      setImgBlob(decodedData);


    } catch (error) {
      console.error('Error loading schema:', error);
    }
  };


  const handleTableChange = (tableName) => {
    debugger;
    setShowExecuteButton(false);
    setShowProcedureDataModal(false);
    setShowIframe(false);
    setSelectedTable(tableName);
    const crudaccessData = crudPermissionData.filter(item => item.table === tableName);
    setCrudAccessData(crudaccessData);
    loadFields(tableName);
    //loadDataForTable();
    handleButtonPermissions(crudaccessData);
    setIsPermissionTableChosen(false);

    /* if (tableName === 'role') {
      setIsSuperAdmin(true);
    } else {
      setIsSuperAdmin(false);
    }
 */
  };

  const handleChoosePermission = (tableName) => {
    setIsPermissionTableChosen(true);
    setIstableRestrictionClick(false);
    loadPermissionTable();
    loadRoleTable();
  }

  const handleButtonPermissions = (crudData) => {

    const create = crudData[0].create;
    const read = crudData[0].read;
    const update = crudData[0].update;
    const delete_ = crudData[0].delete;

    if (create === 0) {
      setShowAddbutton(false);
    } else {
      setShowAddbutton(true);
    }

    if (update === 0) {
      setShowEditbutton(false);
    } else {
      setShowEditbutton(true);
    }

    if (delete_ === 0) {
      setShowDeletebutton(false);
    } else {
      setShowDeletebutton(true);
    }

    if (read === 0) {
      setShowViewbutton(false);
    } else {
      setShowViewbutton(true);
    }


  }

  const loadpermissions = async (tableName) => {

    try {
      var userEmail = localStorage.getItem('loginEmail');
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `api/getpermissions/${userEmail}/${selectedSchema}/${tableName}`
      );
      console.log('permissions', response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  //Function to get table column fields
  const loadFields = async (tableName) => {
    try {
      loadpermissions(tableName);
      const response = await axios.get(
        process.env.REACT_APP_API_URL + `api/getFields/${selectedSchema}/${tableName}`
      );
      setFields(response.data);
      setDefaultFields(response.data);
      //console.log("first fields",response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadPermissionTable = async (newselectedSchema) => {
    if (roleCode === 'SA') {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `api/getPermissionTable/${selectedSchema}`);
        setPermissionData(response.data);
      } catch (error) {
        console.log('Error loading role table', error);
      }
    } else {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `api/getPermissionTable/${selectedSchema}`);
        setPermissionData(response.data);
      } catch (error) {
        console.log('Error loading role table', error);
      }
    }
  };

  const loadRoleTable = async () => {
    if (roleCode === 'SA') {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `api/getRoleTable/${selectedSchema}`);
        setRoleData(response.data);
        console.log("role:", response.data, selectedSchema);
      } catch (error) {
        console.log('Error loading role table', error);
      }
    } else {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + `api/getRoleTable/${selectedSchema}`);
        setRoleData(response.data);
      } catch (error) {
        console.log('Error loading role table', error);
      }
    }
  };




  const loadDataForTable = async () => {
    debugger;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getForTables/${selectedSchema}/${selectedTable}`);
      const formatType = 'yyyy-MM-dd HH:mm';
      const newArray = response.data.map(item => {
        const newItem = { ...item };

        fields.forEach(column => {
          if (newItem.hasOwnProperty(column.column_name) && (column.data_type === 'datetime' || column.data_type === 'date')) {
            const originalDate = new Date(newItem[column.column_name]);

            // Use the 'format' function from date-fns

            const formattedDate = format(originalDate, formatType);
            newItem[column.column_name] = formattedDate;
          }
        });

        return newItem;
      });

      console.log('sdsdsd', newArray);

      setData(newArray);
      console.log(response.data);
      //setTotalPages(Math.ceil(response.data.length / itemsPerPage));
    } catch (error) {
      console.error(error);
    }
  };


  //function to load detail_dependency table data
  const loadDetailDependencydata = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getDetailTable/${selectedSchema}/${detail_table_name}`);
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getDetailTableData/${selectedSchema}/${detail_table_name}`);
      const detailTable = response.data;
      setDetailTableDataFields(detailTable);
      return detailTable;
    } catch (error) {
      console.error(error); // Log the error
      return [];
    }
  };

  //Add button for role
  const handlePermissionAddButtonclick = () => {
    setIsPermissionModalOpen(true);
  }

  const handleAddrestrictionButtonClick = () => {
    setIsRestrictionModalOpen(true);
  }

  //function to get the entered role data 
  const handleAddRolechange = (key, value) => {

    setRoleFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

  }

  const handleSelectRole = (role) => {
    console.log(role.target.value);
  }

  const handleCheckboxChange = (tableName, operation) => {
    setinsertPermissionData((prevPermissions) => ({
      ...prevPermissions,
      [tableName]: {
        ...prevPermissions[tableName],
        [operation]: !prevPermissions[tableName]?.[operation]
      }
    }));
  };

  const handleRestrictionCheckboxChange = (index) => {
    //debugger;
    setDataForRestrictioncondition((prevData) => {
      const updatedData = [...prevData];
      const tableName = Object.keys(updatedData[index])[0];
      updatedData[index][tableName].remove = true;
      return updatedData;
    });
  };

  //Function to insert role data
  const handleAddPermissionSubmit = async () => {
    console.log("permission data", insertPermissionData);
    const roleColumns = Object.keys(roleFormData);
    const roleValues = Object.values(roleFormData);
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'api/insertRoleandPermissionData', {
        database: selectedSchema,
        Rolecolumns: roleColumns,
        Rolevalues: roleValues, // Use the sanitized values array
        username: userName,
        PermissionData: insertPermissionData
      });


      setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
      setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
      loadDataForTable();
      handleCloseModal();

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(roleColumns);
      console.log(roleValues);
      console.error(error);
      toast.error('Error occurred while sending data.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  //function to Add restriction data
  const handleAddRestrictionSubmit = async () => {
    console.log("permission data", dataForRestrictioncondition);
    const roleColumns = Object.keys(roleFormData);
    const roleValues = Object.values(roleFormData);
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'api/insertRestrictionData', {
        database: selectedSchema,
        Rolecolumns: roleColumns,
        Rolevalues: roleValues, // Use the sanitized values array
        username: userName,
        PermissionData: dataForRestrictioncondition
      });


      setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
      setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
      loadDataForTable();
      handleCloseModal();

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(roleColumns);
      console.log(roleValues);
      console.error(error);
      toast.error('Error occurred while sending data.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  //Add button to open modal
  const handleAddButtonClick = () => {
    setShowsubmitButton(true);
    setRetrievedData([]);
    setSubmitButton('SUBMIT');
    loadDetailDependencydata();
    setIsModalOpen(true);
    setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
    setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`

    //console.log(fields);
    const allColumns = fields.map((column) => column.COLUMN_NAME);
    setColumns(allColumns);
    setNewColumns(allColumns);
    console.log("all columns", allColumns);

  };

  //function to add more input fields in dependency table data
  const handleAddinputFields = () => {
    setDependencyAddButton('+Add Row')
    const newFields = [...fields, ...detailTableData];
    console.log("Add rows", newFields);
    setFields(newFields);
    setRowCount(rowCount + 1)
    console.log(rowCount);
    const newOptions = [...relationshipOptionsList, ...relationshipOptionsListDepTable];
    setRelationshipOptionsList(newOptions);
    console.log("new options", newOptions, relationshipOptionsList);
    //console.log("addedRelationdata",newOptions);
  }

  const loadRelationDetails = async (tableName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getRelationshipDetails/${tableName}`);
      fetchAllFieldRelations(response.data);
      console.log("relationShipDetails", response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadRelationDetailsDepTable = async (tableName) => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + `api/getRelationshipDetails/${tableName}`);
      fetchAllFieldRelationsDepTable(response.data);
      console.log("relationShipDetails for dependent", response.data);
    } catch (error) {
      console.error('Error loading tables:', error);
    }
  };

  const loadPrimaryDataList = async (tableName, value, text) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/getPrimaryDataList/${selectedSchema}/${tableName}/${value}/${text}`
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


  const handleCloseModal = () => {
    setIsEditClick(false);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
    setShowAddRowbutton(false);
    setShowExecuteModal(false);
    setShowProcedureDataModal(false);
    setFields(defaultFields);
    setIsEditPermissionModalOpen(false);
    setIsPermissionModalOpen(false);
    setIsRestrictionModalOpen(false);

  };

  const handleRole = () => {
    setRoleFieldClick(false);


  }


  //function to open confirmation when the delete button is clicked
  const openConfirm = (id) => {
    setDelId(id);
    setShowConfirmationModal(true);
  };


  const deleteRecord = async (id) => {

    setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
    setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`

    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
    const detailTableName = response.data[0].detail_table;
    const { extraRowsCount, detailTableMatch, detailTable } = await loadDetailDependencydataEdit(id);
    console.log("edit extra rows", extraRowsCount);
    console.log("detailTableMatch", detailTableMatch);
    const newColumns = detailTable.map(item => item.column_name);
    console.log("detailTableData", newColumns);

    const allColumns = fields.map((column) => column.column_name);
    setColumns(allColumns);
    const record_values = data.find((item) => item.id === id);

    const valuesWithoutId = record_values ? { ...record_values } : null;
    delete valuesWithoutId.id;

    if (selectedTable === response.data[0].header_table) {
      axios.post(process.env.REACT_APP_API_URL + `api/delete_and_archive_dependent`, {
        database: selectedSchema,
        table1: selectedTable,
        table2: detailTableName,
        valueId: id,
        isTableDependent: true,
        columns1: allColumns,
        columns2: newColumns,
        values1: valuesWithoutId,
        values2: detailTableMatch,
        username: userName,
      })
        .then((response) => {
          if (response.status === 200) {
            setShowConfirmationModal(false);
            loadDataForTable();
            console.log("Values", valuesWithoutId);
            toast.success("Record deleted successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

          } else {
            toast.error("Error deleting Record", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          console.log("Columns", allColumns);
          console.log("Values", valuesWithoutId);
          toast.error("Error deleting Record", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });

    } else {
      axios.post(process.env.REACT_APP_API_URL + `api/delete_and_archive`, {
        database: selectedSchema,
        table: selectedTable,
        valueId: id,
        columns: allColumns,
        values: valuesWithoutId,
        isTableDependent: false,
        username: userName,
      })
        .then((response) => {
          if (response.status === 200) {
            setShowConfirmationModal(false);
            loadDataForTable();
            console.log("Values", valuesWithoutId);
            toast.success("Record deleted successfully", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

          } else {
            toast.error("Error deleting Record", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.error(error);
          console.log("Columns", allColumns);
          console.log("Values", valuesWithoutId);
          toast.error("Error deleting Record", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    }



  };

  const editRecord = async (id) => {
    setRetrievedData([]);
    setIsEditClick(true);
    loadDetailDependencydataForEdit();
    //debugger;
    loadRelationDetails(selectedTable);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getdetailDependency/${selectedSchema}/${detailDependencyTable}`);
      if (selectedTable === response.data[0].header_table) {
        loadRelationDetailsDepTable(response.data[0].detail_table);
        setisTableisdependent(true);
        setDetailTableName(response.data[0].detail_table);
        try {
          console.log("selected item id", id);
          setIsEditModalOpen(true);
          setSelectedId(id);

          const { extraRowsCount, detailTableMatch, detailTableData, detailTable } = await loadDetailDependencydataEdit(id);
          console.log("edit extra rows", extraRowsCount);
          console.log("detailTableMatch", detailTableMatch);
          console.log("detailTableData", detailTable);


          const newdetailFields = [...detailTable];

          setDetailFields(newdetailFields);

          console.log("new detail fields", newdetailFields);

          const dataforId = [data.find((item) => item.id === id)];

          const combinedArray = detailTableMatch.map((detail) => ({
            ...dataforId[0],
            ...detail
          }));

          setRetrievedData(combinedArray);

          console.log("new retrieved(combined)", combinedArray);

          const newOptions = [...relationshipOptionsList, ...relationshipOptionsListDepTable];
          setRelationshipOptionsList(newOptions);
          console.log("new options(edit)", newOptions);

          setShowsubmitButton(true);
          setSubmitButton('UPDATE');
        } catch (error) {
          console.error(error);
        };

      } else {
        setisTableisdependent(false);
        setIsModalOpen(true);
        console.log("selected item id", id);
        setSelectedId(id);
        setRetrievedData(data.find((item) => item.id === id));
        console.log(data.find((item) => item.id === id));
        console.log(detailDependencyData);
        const newOptions = [...relationshipOptionsList, ...relationshipOptionsListDepTable];
        setRelationshipOptionsList(newOptions);
        console.log("new options(edit)", newOptions);
        setShowsubmitButton(true);
        setSubmitButton('UPDATE');
      }
    } catch (error) {
      console.error(error);
    };
  };

  const viewRecord = (id) => {
    console.log("view record button");
    setSelectedId(id);
    setRetrievedData(data.find((item) => item.id === id));
    setIsModalOpen(true);
    setShowsubmitButton(false);
  };

  const editTableRestrictions = () => {
    setIsEditTableRestrictionClicked(true);
  }

  const editRole = async (id) => {
    console.log("selected record", id);
    setIsEditPermissionModalOpen(true);

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getRolePermissionData/${selectedSchema}/${id}`);
      console.log("combined data", response.data);

      const filteredPermission = response.data.map((item) => {
        const { Rolename, Rolecode, ...rest } = item;
        return rest;

      });
      console.log(filteredPermission);
      setretrievedPermissionData(filteredPermission);

      const filteredData = response.data[0];
      const retrievedRoleData = [
        { Rolename: filteredData.Rolename, Rolecode: filteredData.Rolecode }
      ];
      setretrievedRoleData(retrievedRoleData);
      console.log("role permission data", retrievedRoleData);
    } catch (error) {
      console.log("the data is not received", error);
    }
  };


  const handleInputChange = (e, index, columnName, columnDataType) => {
    // debugger;
    // used to empty the populated data in the edit modal
    setRetrievedData([]);

    const { value } = e.target;
    const newValues = [...values];
    const newColumns = [...columns];
    newValues[index] = value;

    // If columnName is provided, update the corresponding column
    if (columnName) {
      newColumns[index] = columnName;
    }

    console.log(newValues);

    setValues(newValues);
    setColumns(newColumns); // Update the columns state
  };

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

  const handleSelectSchema = (event) => {
    const newselectedSchema = event.target.value;
    setIsSchemaSelected(true)
    setSelectedSchema(newselectedSchema);
    loadTables(newselectedSchema);
    loadNonRestrictedTables(newselectedSchema);
  }


  const handleExecuteInputChange = (e, index, data_type) => {
    const { value } = e.target;

    const updatedValues = [...executeInputValues];
    updatedValues[index] = { value, data_type };

    setExecuteInputValues(updatedValues);

  }

  const handleTableRestrions = async () => {
    setShowProcedureDataModal(false);
    setIstableRestrictionClick(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getRestrictionTable`);
      console.log(response.data);
      setTableRestrictionData(response.data);
    } catch {
      console.log("error loading restriction table");

    }
  };


  const toggleTableDropdown = () => {
    setIsTableDropdownOpen(!isTableDropdownOpen);
  };

  const toggleOtherDropdown = (e) => {
    e.stopPropagation();
    setIsOtherDropdownOpen(!isOtherDropdownOpen);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleExecuteDropdown = (e) => {
    e.stopPropagation();
    setIsExecuteDropdownOpen(!isExecuteDropdownOpen);

  };

  const toggleConfigDropdown = (e) => {
    e.stopPropagation();
    setIsConfigDropdownOpen(!isConfigDropdownOpen);
  }

  const toggleExecutewindow = async (selectedProcedure) => {
    setIstableRestrictionClick(false);
    setShowExecuteButton(true);
    setProcedureName(selectedProcedure);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/CheckProcedureParameter/${selectedProcedure}`);
      console.log(response.data);
      setProcedureParameters(response.data);
    } catch {
      console.log("error");
    }
    setShowExecuteModal(true);
  }

  const toggleAccountDropdown = () => {
    setIsAccountDropDownOpen(!isAccountDropDownOpen);
  }

  const toggleIframe = (Link) => {
    setSelectedLink(Link);
    setShowIframe(true);
  }

  const executeStoredProcedure = async () => {
    console.log("parameters:", executeInputValues);
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + 'api/CallStoreProcedure', {
        params: {
          procedureName: procedureName,
          database: selectedSchema,
          parameters: executeInputValues
        },
      });

      console.log(response.data[0]);
      setStoredProcedureData(response.data[0]);
      setShowProcedureDataModal(true);
      setExecuteInputValues([]);
      setShowExecuteModal(false);
    } catch (error) {
      console.error(error);
      console.log("Error calling stored procedure");
    }
  };


  const handleLogOut = () => {
    localStorage.setItem('loggedIn', 'false');
    localStorage.removeItem('username');
    localStorage.removeItem('company');
    // Redirect the user to the desired page after login
    history.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedValues = values.map((value) => (value === '' ? null : value));
    setFormData(values);

    console.log("fields", fields)
    const newExtraFields = fields.map(item => item.column_name);
    console.log("new fields", newExtraFields);
    console.log("columns in handle submit", newColumns);

    debugger;
    if (submitButton === 'SUBMIT') {

      if (isTableisdependent === true) {

        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + 'api/insertDependentData', {
            database: selectedSchema,
            username: userName,
            table1: selectedTable,
            table2: detailTableName,
            table1columns: newExtraFields.splice(0, newColumns.length),
            table1values: values.splice(0, newColumns.length),
            //values: sanitizedValues, // Use the sanitized values array
            table2columns: newExtraFields.splice(0, detailTableData.length * rowCount),
            table2values: values,
            //table2values: values.splice(0, detailTableData.length * rowCount),
            rows: rowCount
          });


          setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
          setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
          loadDataForTable();
          handleCloseModal();
          console.log(values);
          console.log(newExtraFields.splice(0, columns.length));
          console.log(values.splice(0, columns.length));

          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.log(rowCount);
          console.log(values);
          console.log(newExtraFields.splice(0, columns.length));
          console.log(values.splice(0, columns.length));
          console.error(error);
          toast.error('Error occurred while sending data.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

      } else {

        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + 'api/insertData', {
            database: selectedSchema,
            table: selectedTable,
            columns: columns,
            values: sanitizedValues, // Use the sanitized values array
            username: userName,
          });


          setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
          setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
          loadDataForTable();
          handleCloseModal();

          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.log(values);
          console.log(newExtraFields);
          console.log(columns);
          console.error(error);
          toast.error('Error occurred while sending data.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } else {

      if (isTableisdependent === true) {

        const extractedHeaderValues = Object.values(updateheaderTableData);


        const extractedDetailKeys = detailFields.map(item => item.column_name);


        const extractedDetailValues = Object.values(updateDetailData);

        const extractedDetailValueId = extractedDetailValues.map(item => item.id);

        try {
          const response = await axios.post(process.env.REACT_APP_API_URL + 'api/updateDependentData', {
            database: selectedSchema,
            username: userName,
            table1: selectedTable,
            table2: detailTableName,
            table1columns: newExtraFields,
            table1values: extractedHeaderValues,
            table1valueId: selectedId,
            table2columns: extractedDetailKeys,
            table2values: extractedDetailValues,
            table2valuesId: extractedDetailValueId
          });


          setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
          setColumns(Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
          loadDataForTable();
          handleCloseModal();

          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.error(error);
          toast.error('Error occurred while sending data.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {

        try {
          console.log("Columns", columns);
          const response = await axios.post(process.env.REACT_APP_API_URL + 'api/updateRecords', {
            database: selectedSchema,
            table: selectedTable,
            valueId: selectedId,
            columns: columns,
            values: sanitizedValues, // Use the sanitized values array
            username: userName,
          });


          setValues(Array(fields.length).fill('')); // Assuming you have an initial state for `values`
          (Array(fields.length).fill('')); // Assuming you have an initial state for `columns`
          loadDataForTable();
          handleCloseModal();

          toast.success(response.data.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } catch (error) {
          console.log(values);
          console.log(newExtraFields);
          console.log(columns);
          console.log(selectedId);
          console.error(error);
          toast.error('Error occurred while sending data.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }


    }


  };
  useEffect(() => {

    if (!isSchemaSelected) {
      setSelectedSchema(companyName);
      loadTables(companyName);
      loadNonRestrictedTables(companyName);
      loadViewRestrictionTable(companyName);
    } else {
      setIsSchemaSelected(false);
      loadTables(selectedSchema);
      loadNonRestrictedTables(selectedSchema);
      loadViewRestrictionTable(selectedSchema);
    }


    loadCompanyDetails(companyName);
    loadExternalLinks(companyName);
    loadExecuteMenu(companyName);
    loadDatabase();
    loadDatabaseSA();

    const formatDates = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/getForTables/${selectedSchema}/${selectedTable}`);
        const formatType = 'yyyy-MM-dd HH:mm';
        const newArray = response.data.map(item => {
          const newItem = { ...item };

          fields.forEach(column => {
            if (newItem.hasOwnProperty(column.column_name) && (column.data_type === 'datetime' || column.data_type === 'date')) {
              const originalDate = new Date(newItem[column.column_name]);

              // Use the 'format' function from date-fns
              const formattedDate = format(originalDate, formatType);
              newItem[column.column_name] = formattedDate;
            }
          });

          return newItem;
        });

        console.log('sdsdsd', newArray);

        setData(newArray);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedTable) {
      formatDates();

    }

    if (roleCode === 'SA') {
      setIsSuperAdmin(true);
    } else {
      setIsSuperAdmin(false);

    }

    /* if (isEditclick) {
      loadDetailDependencydataForEdit();
    } */

  }, [selectedTable, selectedSchema, fields]);

  const mysqlToHtmlInputType = {
    INT: 'number',
    TINYINT: 'number',
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
    <div>
      <ToastContainer />

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { deleteRecord(delId) }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>


      <div style={{ marginLeft: '10px', marginRight: '10px' }}>

        {selectedSchema ? (
          <Row>
            {showSideBar && (
              <Col xs={12} md={2} style={{ backgroundColor: '#444f45', padding: '10px', paddingLeft: '0px', paddingRight: '0px', height: '98vh', overflowY: 'auto', overflowX: 'hidden' }} className="custom-sidebar">
                <div className='sidebar-content'>
                  <FontAwesomeIcon icon={faXmark} size='2x' className='menu_icon' style={{ float: 'left', paddingLeft: '10px', color: '#fff' }} onClick={() => setShowSideBar(!showSideBar)} />
                  <ul style={{ fontWeight: 'bolder' }}>

                    <Row>
                      <div className='hover_dropdown'>
                        <li className='second-dropdown' onClick={toggleTableDropdown}>
                          Tables
                          <FontAwesomeIcon className='downarrow' icon={faCaretDown} style={{ color: "#fff" }} />
                          {isTableDropdownOpen && (
                            <ListGroup onScroll={(e) => { e.stopPropagation(); }}>
                              {tables.map((item, index) => (
                                <ListGroup.Item
                                  className='SideBar'
                                  key={index}
                                  //action={item.haveId === 1} // Make it clickable only if haveId is 1
                                  active={item.Tables === selectedTable}
                                  onClick={() => handleTableChange(item.Tables)} // Only allow onClick if haveId is 1
                                  style={{
                                    //color: item.haveId === 1 ? '#fff' : 'red',
                                    color: '#fff',
                                    height: '40px',
                                    //cursor: item.haveId === 1 ? 'pointer' : 'not-allowed', // Set cursor accordingly
                                    border: 'none',
                                    backgroundColor: '#2C3B41',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                  title={item.haveId === 0 ? 'Id column required' : undefined}
                                >
                                  {item.Tables}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          )}
                        </li>
                      </div>
                    </Row>

                    <Row>
                      <div className='hover_dropdown'>
                        <li className="second-dropdown" onClick={toggleUserDropdown}>
                          User
                          <FontAwesomeIcon className='downarrow' icon={faCaretDown} style={{ color: "#fff", }} />
                          {isUserDropdownOpen && (
                            <ListGroup onScroll={(e) => { e.stopPropagation(); }}>
                              {roleTablesData.map((item, index) => (
                                <ListGroup.Item
                                  className='SideBar'
                                  key={index}
                                  action={item.haveId === 1} // Make it clickable only if haveId is 1
                                  active={item.Tables === selectedTable}
                                  onClick={() => item.haveId === 1 && handleTableChange(item.Tables)} // Only allow onClick if haveId is 1
                                  style={{
                                    color: item.haveId === 1 ? '#fff' : 'red',
                                    height: '40px',
                                    cursor: item.haveId === 1 ? 'pointer' : 'not-allowed', // Set cursor accordingly
                                    border: 'none',
                                    backgroundColor: '#2C3B41',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                  title={item.haveId === 0 ? 'Id column required' : undefined}
                                >
                                  {item.Tables}
                                </ListGroup.Item>
                              ))}

                              {permissionTableData.map((item, index) => (
                                <ListGroup.Item
                                  className='SideBar'
                                  key={index}
                                  action={item.haveId === 1} // Make it clickable only if haveId is 1
                                  active={item.Tables === selectedTable}
                                  onClick={() => item.haveId === 1 && handleChoosePermission(item.Tables)} // Only allow onClick if haveId is 1
                                  style={{
                                    color: item.haveId === 1 ? '#fff' : 'red',
                                    height: '40px',
                                    cursor: item.haveId === 1 ? 'pointer' : 'not-allowed', // Set cursor accordingly
                                    border: 'none',
                                    backgroundColor: '#2C3B41',
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                  title={item.haveId === 0 ? 'Id column required' : undefined}
                                >
                                  {item.Tables}
                                </ListGroup.Item>
                              ))}

                            </ListGroup>
                          )}
                        </li>
                      </div>
                    </Row>

                    <Row>
                      <div className='hover_dropdown'>
                        <li className="second-dropdown" onClick={toggleOtherDropdown}>
                          External Links
                          <FontAwesomeIcon className='downarrow' icon={faCaretDown} style={{ color: "#fff", }} />
                          {isOtherDropdownOpen && (


                            <ListGroup onScroll={(e) => { e.stopPropagation(); }}>
                              {extLinks.map((item, index) => (
                                <ListGroup.Item
                                  className='SideBar'
                                  key={index}
                                  onClick={() => { toggleIframe(item.link) }}
                                  style={{
                                    height: '40px',
                                    backgroundColor: '#2C3B41',
                                    color: '#fff',
                                    display: 'flex',
                                    border: 'none',
                                    alignItems: 'center',
                                  }}

                                >
                                  {item.menu}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>

                          )}
                        </li>
                      </div>
                    </Row>

                    <Row>
                      <div className='hover_dropdown'>
                        <li className="second-dropdown" onClick={toggleExecuteDropdown}>
                          Execute
                          <FontAwesomeIcon className='downarrow' icon={faCaretDown} style={{ color: "#fff" }} />
                          {isExecuteDropdownOpen && (
                            <ListGroup onScroll={(e) => { e.stopPropagation(); }}>
                              {executeMenu.map((item, index) => (
                                <ListGroup.Item
                                  className='SideBar'
                                  key={index}
                                  onClick={() => { toggleExecutewindow(item.name) }}
                                  style={{
                                    height: '40px',
                                    backgroundColor: '#2C3B41',
                                    color: '#fff',
                                    display: 'flex',
                                    border: 'none',
                                    alignItems: 'center',
                                  }}

                                >
                                  {item.name}
                                </ListGroup.Item>
                              ))}
                            </ListGroup>

                          )}
                        </li>
                      </div>
                    </Row>

                    {isSuperAdmin && (
                      <Row>
                        <div className='hover_dropdown'>
                          <li className="second-dropdown" onClick={toggleConfigDropdown}>
                            Configuration
                            <FontAwesomeIcon className='downarrow' icon={faCaretDown} style={{ color: "#fff", }} />
                            {isConfigDropdownOpen && (
                              <ul className='inner_dropdown' style={{ marginTop: '0px' }} onClick={(e) => e.stopPropagation()}>
                                <li style={{ color: '#fff' }} onClick={handleTableRestrions}>Table Restrictions</li>
                              </ul>
                            )}
                          </li>

                        </div>
                      </Row>

                    )}

                  </ul>
                </div>

              </Col>
            )}

            <Col xs={showSideBar ? 12 : 12} md={showSideBar ? 10 : 12} style={{ border: '5px solid #D5D5DD', backgroundColor: '#e6eee0', height: '98vh', paddingLeft: '0px', paddingRight: '0px' }}>
              {showIframe ? (

                <iframe
                  title="Embedded Content"
                  width="100%"
                  height="100%"
                  src={selectedLink}
                  allowFullScreen
                ></iframe>
              ) : (
                <div>
                  <Row>
                    <Col xs={12} md={12} style={{ position: 'relative', marginLeft: '0px', marginRight: '0px' }}>
                      <div style={{ marginBottom: '0px', paddingLeft: '0px', textAlign: 'center', fontWeight: 'bolder', backgroundColor: '#93b874' }}>
                        {!showSideBar && (

                          <FontAwesomeIcon size='2x' icon={faBars} className='menu_icon' style={{ float: 'left', paddingTop: '10px', paddingLeft: '10px' }} onClick={() => setShowSideBar(!showSideBar)} />

                        )}
                        <img src={`data:image/jpeg;base64, ${imgBlob}`} style={{ width: '58px', height: '58px' }} /> {companyName.toUpperCase()}
                        <label
                          onClick={toggleAccountDropdown}
                          style={{ paddingLeft: '10px', float: 'right', paddingRight: '10px', marginTop: '10px' }}
                          className='user_name'
                        >
                          <FontAwesomeIcon icon={faUser} style={{ paddingRight: '5px' }} />{userName}
                        </label>
                        {isAccountDropDownOpen && (
                          <div className='account_dropdown' style={{ position: 'absolute', top: '100%', right: '0', zIndex: '1', backgroundColor: 'white', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }}>
                            <ul style={{ paddingLeft: '10px' }}>
                              <li>
                                <Button
                                  className='loguout_button'
                                  style={{ backgroundColor: '#fff', paddingLeft: '0px', color: 'black', fontWeight: 'bold', fontSize: 'large' }}
                                  onClick={() => { handleLogOut() }}
                                >
                                  <FontAwesomeIcon icon={faRightFromBracket} style={{ paddingRight: '10px' }} />Log out
                                </Button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </Col>

                  </Row>

                  {!showExecuteButton && selectedTable && !isPermissionTableChosen && !istableRestrictionClick && (
                    <Row style={{ backgroundColor: "#e6eee0", marginLeft: '0px', marginRight: '0px' }}>
                      <Col xs={12} md={12}>
                        {showAddbutton && (
                          <Button
                            type="submit"
                            variant="warning"
                            style={{ height: '40px', float: 'right' }}
                            className="custom-button"
                            onClick={handleAddButtonClick}
                          >
                            + Add
                          </Button>
                        )}
                      </Col>
                    </Row>
                  )}

                  {isSuperAdmin && selectedTable === 'role' && !istableRestrictionClick && (
                    <Row style={{ backgroundColor: "#e6eee0", marginLeft: '0px', marginRight: '0px' }}>
                      <Col xs={4} md={4}>
                        <Form.Select onChange={(e) => handleSelectSchema(e)}>
                          <option>Select Schema</option>
                          {schemaList_SA.map((item) => (
                            <option key={item.value} value={item.value}>
                              {item.Database}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  )}

                  {!showExecuteButton && !isPermissionTableChosen && !istableRestrictionClick && (
                    <Row>
                      <Col md={6}>
                        <Form.Group style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                          <Form.Label className='select_entry' style={{ fontWeight: 'bold', marginRight: '10px' }}>Entry</Form.Label>
                          <Form.Control
                            as='select'
                            style={{ width: '20%', padding: 0, paddingLeft: 5, height: 35, marginBottom: 7, borderColor: '#93b874' }}
                            value={itemsPerPage}
                            placeholder='select entry'
                            onChange={handleEntriesPerPageChange}
                          >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                          <Form.Label className='search' style={{ fontWeight: 'bold', marginRight: '10px', marginLeft: '15%' }}>Search </Form.Label>
                          <Form.Control
                            className='search-form'
                            placeholder='search'
                            onChange={(e) => { setSearch(e.target.value) }}
                            style={{ width: '60%', marginLeft: '5px', padding: 0, paddingLeft: 5, height: 35, marginTop: 0, marginBottom: 5, borderColor: '#93b874' }}
                            type='text'
                          >
                          </Form.Control>
                        </Form.Group>
                      </Col>

                    </Row>
                  )}

                  {!showExecuteButton && !isPermissionTableChosen && !istableRestrictionClick && (
                    <Row className='tablefixHead'>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th style={{ backgroundColor: '#93b874' }} className="text-center">No.</th>
                            {data?.length > 0 &&
                              Object.keys(data[0])?.map((key) => (
                                key.toLowerCase() === "id" ? null : (
                                  <th style={{ backgroundColor: '#93b874' }} onClick={() => sorting(key)} key={key} className="text-center">
                                    {key}{" "}
                                    {currentSortcolumn === key ? arrowButton : " "}
                                  </th>
                                )
                              ))}
                            <th style={{ backgroundColor: '#93b874' }} className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemsToDisplay.length > 0 ? (
                            itemsToDisplay.map((item, index) => (
                              <tr key={item.Id}>
                                <td className="text-center" scope="row">{(currentPage) * itemsPerPage + index + 1}</td>
                                {Object.keys(item).map((key) => (
                                  key.toLowerCase() === "id" ? null : (
                                    <td key={key}>{item[key]}</td>
                                  )

                                ))}
                                <td className="text-center">

                                  {showEditbutton && (
                                    <button
                                      className="btn btn-primary btn-sm"
                                      onClick={() => editRecord(item.id || item.ID)} // Pass the item.id to the delete function
                                    >Edit</button>

                                  )}


                                  {showDeletebutton && (
                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() => openConfirm(item.id || item.ID)} // Pass the item.id to the delete function
                                    >
                                      Delete
                                    </button>
                                  )}

                                  {showViewbutton && (
                                    <button
                                      className="btn btn-info btn-sm"
                                      onClick={() => viewRecord(item.id || item.ID)} // Pass the item.id to the delete function
                                    >
                                      View
                                    </button>

                                  )}


                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={data.length > 0 ? Object.keys(data[0]).length + 2 : 2}>
                                No data available
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                    </Row>
                  )}


                  {!showExecuteButton && !isPermissionTableChosen && !istableRestrictionClick && (
                    <Row style={{ marginTop: '20px' }}>
                      <Col md={4}>
                        <Form.Group>
                          <Form.Label className='go_to_page' style={{ marginRight: 10, float: 'left' }}>Go to Page</Form.Label>
                          <Form.Control
                            type="text"
                            style={{ width: '30%', padding: '0', paddingLeft: 10, height: 35, borderColor: '#93b874' }}
                            value={goToPageInput}
                            placeholder='Enter page'
                            onChange={(e) => {
                              // Use regex to allow only numeric input
                              const numericValue = e.target.value.replace(/[^0-9]/g, '');
                              setGoToPageInput(numericValue);
                            }}
                            pattern="[0-9]*" // Enforce numeric input
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleGoToPage();
                              }
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={{ span: 4, offset: 3 }}>
                        <div className='pagination-container'>
                          {totalPages > 1 && (
                            <ReactPaginate
                              pageCount={totalPages}
                              pageRangeDisplayed={5} // Adjust as needed
                              marginPagesDisplayed={2} // Adjust as needed
                              onPageChange={handlePageChange}
                              forcePage={currentPage}
                              containerClassName={'pagination'}
                              activeClassName={'active'}
                            />
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}

                  {showExecuteButton && !istableRestrictionClick && (
                    <Row>
                      {procedureParameters.map((item, index) => (
                        <Form.Group key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                          <Col xs={6} md={4}>
                            <Form.Label style={{ fontWeight: 'bold' }}>
                              Enter {item.PARAMETER_NAME}
                            </Form.Label>
                          </Col>
                          <Col xs={12} md={8}>
                            <Form.Control
                              type={item.DATA_TYPE.toUpperCase()}
                              placeholder={'Enter' + item.PARAMETER_NAME}
                              onChange={(e) => handleExecuteInputChange(e, index, item.DATA_TYPE)}
                              style={{ height: '40px', flex: '2', display: item.column_name === 'header_id' ? 'none' : 'block' }}
                            />
                          </Col>

                        </Form.Group>
                      ))}
                    </Row>
                  )}


                  {isPermissionTableChosen && !istableRestrictionClick && (
                    <Row justify="center" align="right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                      <Col span={6}>
                        <Button style={{ width: '10%' }} onClick={handlePermissionAddButtonclick}>
                          Add Role
                        </Button>
                      </Col>
                    </Row>
                  )}

                  {istableRestrictionClick && (
                    <Row justify="center" align="right" style={{ paddingTop: '20px', paddingBottom: '20px' }}>

                      <Col span={6}>
                        <Button style={{ width: '10%' }} onClick={handleAddrestrictionButtonClick}>
                          Add Restrictions
                        </Button>
                      </Col>
                    </Row>
                  )}

                  {isPermissionTableChosen && !istableRestrictionClick && (
                    <Row className='tablefixHead'>
                      {roleData?.length > 0 ? (
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              {Object.keys(roleData[0])?.map((key) => (
                                key.toLowerCase() === "id" ? null : (
                                  <th style={{ backgroundColor: '#93b874' }} key={key} className="text-center">
                                    {key}{" "}
                                  </th>
                                )
                              ))}
                              <th style={{ backgroundColor: '#93b874' }} className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {roleData?.map((row, index) => (
                              <tr key={index}>
                                {Object.keys(row)?.map((key) => (
                                  key.toLowerCase() === "id" ? null : (
                                    <td key={key} className="text-center">
                                      {row[key]}
                                    </td>
                                  )
                                ))}
                                <td className="text-center">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => editRole(row.id)} // Pass the item.id to the delete function
                                  >Edit</button>

                                  <button
                                    className="btn btn-info btn-sm"
                                  //onClick={() => viewRecord(item.id || item.ID)} // Pass the item.id to the delete function
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No data available</p>
                      )}
                    </Row>
                  )}

                  <Modal className='Add_modal' show={isPermissionModalOpen} onHide={handleCloseModal} style={{ padding: '10px' }}>

                    <Modal.Header>
                      <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Role Permission</h2>
                    </Modal.Header>

                    <div style={{ padding: '30px' }}>
                      <Modal.Body>
                        <Form>

                          <Form.Group>
                            <Form.Label>Rolename</Form.Label>
                            <Form.Control
                              type="text"
                              autoFocus
                              onChange={(e) => handleAddRolechange("Rolename", e.target.value)}

                            />
                          </Form.Group>

                          <Form.Group style={{ paddingBottom: '20px' }}>
                            <Form.Label>Rolecode</Form.Label>
                            <Form.Control
                              type="text"
                              onChange={(e) => handleAddRolechange("Rolecode", e.target.value)}

                            />
                          </Form.Group>

                          {allTables.map((item, index) => (

                            <Form.Group>
                              <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }} >{item.Tables.toUpperCase()}</Form.Label>
                              {['read', 'create', 'edit', 'delete'].map((operation) => (
                                <Form.Check
                                  type={'checkbox'}
                                  id={operation}
                                  label={operation}
                                  onChange={() => handleCheckboxChange(item.Tables, operation)}

                                />
                              ))}

                            </Form.Group>
                          ))}

                        </Form>



                      </Modal.Body>
                    </div>

                    <Modal.Footer style={{ justifyContent: 'center' }}>
                      <Button onClick={handleAddPermissionSubmit}>Submit</Button>
                    </Modal.Footer>


                  </Modal>

                  {/* Edit role permission modal */}

                  <Modal className='Add_modal' show={isEditPermissionModalOpen} onHide={handleCloseModal} style={{ padding: '10px' }}>

                    <Modal.Header>
                      <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Role Permission</h2>
                    </Modal.Header>

                    <div style={{ padding: '30px' }}>
                      <Modal.Body>
                        {retrievedRoleData.map((item, index) => (
                          <Form>

                            <Form.Group>
                              <Form.Label>Rolename</Form.Label>
                              <Form.Control
                                type="text"
                                autoFocus
                                onChange={(e) => handleAddRolechange("Rolename", e.target.value)}
                                value={item.Rolename}
                              />
                            </Form.Group>

                            <Form.Group style={{ paddingBottom: '20px' }}>
                              <Form.Label>Rolecode</Form.Label>
                              <Form.Control
                                type="text"
                                onChange={(e) => handleAddRolechange("Rolecode", e.target.value)}
                                value={item.Rolecode}
                              />
                            </Form.Group>

                            {allTables.map((item, index) => (

                              <Form.Group>
                                <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }} >{item.Tables.toUpperCase()}</Form.Label>
                                {['read', 'create', 'edit', 'delete'].map((operation) => (
                                  <Form.Check
                                    type={'checkbox'}
                                    id={operation}
                                    label={operation}
                                    onChange={() => handleCheckboxChange(item.Tables, operation)}

                                  />
                                ))}

                              </Form.Group>
                            ))}

                          </Form>

                        ))}


                      </Modal.Body>
                    </div>

                    <Modal.Footer style={{ justifyContent: 'center' }}>
                      <Button onClick={handleAddPermissionSubmit}>Submit</Button>
                    </Modal.Footer>


                  </Modal>

                  {/* Add restriction modal */}
                  <Modal className='Add_modal' show={isRestrictionModalOpen} onHide={handleCloseModal} style={{ padding: '10px' }}>

                    <Modal.Header>
                      <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>Add Restrictions</h2>
                    </Modal.Header>

                    <div style={{ padding: '30px' }}>
                      <Modal.Body>
                        <Row style={{ marginLeft: '0px', marginRight: '0px' }}>
                          <Col xs={4} md={4}>
                            <Form.Select onChange={(e) => handleSelectSchema(e)}>
                              <option>Select Schema</option>
                              {schemaList_SA.map((item) => (
                                <option key={item.value} value={item.value}>
                                  {item.Database}
                                </option>
                              ))}
                            </Form.Select>
                          </Col>
                        </Row>

                        {isEditTableRestrictionClicked ?
                          dataForRestrictioncondition.map((table, index) => {
                            const tableName = Object.keys(table)[0];
                            const insertedData = viewRestrictionTables.find(data => data.tables === tableName);
                            const isRemoved = insertedData ? insertedData.is_active === '1' : false;

                            return (
                              <Form.Group key={index}>
                                <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }}>
                                  {tableName.toUpperCase()}
                                </Form.Label>
                                {['remove'].map((operation) => (
                                  <Form.Check
                                    key={operation}
                                    type={'checkbox'}
                                    id={operation}
                                    label={operation}
                                    checked={isRemoved}
                                    onChange={() => handleRestrictionCheckboxChange(index)}
                                  />
                                ))}
                              </Form.Group>
                            );
                          }) :
                          dataForRestrictioncondition.map((table, index) => {
                            const tableName = Object.keys(table)[0];
                            return (
                              <Form.Group key={index}>
                                <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }}>
                                  {tableName.toUpperCase()}
                                </Form.Label>
                                {['remove'].map((operation) => (
                                  <Form.Check
                                    key={operation}
                                    type={'checkbox'}
                                    id={operation}
                                    label={operation}
                                    checked={table[tableName].remove}
                                    onChange={() => handleRestrictionCheckboxChange(index)}
                                  />
                                ))}
                              </Form.Group>
                            );
                          })
                        }
                      </Modal.Body>
                    </div>

                    <Modal.Footer style={{ justifyContent: 'center' }}>
                      <Button onClick={handleAddRestrictionSubmit}>Submit</Button>
                    </Modal.Footer>
                  </Modal>


                  {showExecuteButton && !istableRestrictionClick && (
                    <Row justify="center" align="middle" style={{ paddingTop: '20px' }}>
                      <Col span={4}>
                        <Button style={{ width: '10%' }} onClick={executeStoredProcedure}>
                          Execute
                        </Button>
                      </Col>
                    </Row>
                  )}


                  {showProcedureDataModal && !istableRestrictionClick && (
                    <Row className='tablefixHead'>
                      {storedProcedureData?.length > 0 ? (
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              {Object.keys(storedProcedureData[0])?.map((key) => (
                                key.toLowerCase() === "id" ? null : (
                                  <th style={{ backgroundColor: '#93b874' }} key={key} className="text-center">
                                    {key}{" "}
                                  </th>
                                )
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {storedProcedureData?.map((row, index) => (
                              <tr key={index}>
                                {Object.keys(row)?.map((key) => (
                                  key.toLowerCase() === "id" ? null : (
                                    <td key={key} className="text-center">
                                      {row[key]}
                                    </td>
                                  )
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No data available</p>
                      )}
                    </Row>
                  )}

                  {istableRestrictionClick && (
                    <Row className='tablefixHead'>
                      {tableRestrictionData?.length > 0 ? (
                        <table className="table table-striped table-bordered">
                          <thead>
                            <tr>
                              {Object.keys(tableRestrictionData[0])?.map((key) => (
                                key.toLowerCase() === "id" ? null : (
                                  <th style={{ backgroundColor: '#93b874' }} key={key} className="text-center">
                                    {key}{" "}
                                  </th>
                                )
                              ))}
                              <th style={{ backgroundColor: '#93b874' }} className="text-center">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableRestrictionData?.map((row, index) => (
                              <tr key={index}>
                                {Object.keys(row)?.map((key) => (
                                  key.toLowerCase() === "id" ? null : (
                                    <td key={key} className="text-center">
                                      {row[key]}
                                    </td>
                                  )
                                ))}
                                <td className="text-center">
                                  <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => editTableRestrictions(row.id)} // Pass the item.id to the delete function
                                  >Edit</button>

                                  <button
                                    className="btn btn-info btn-sm"
                                  //onClick={() => viewRecord(item.id || item.ID)} // Pass the item.id to the delete function
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No data available</p>
                      )}
                    </Row>
                  )}


                  <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%', textAlign: 'center', backgroundColor: '#93b874' }}>
                    <p style={{ fontSize: '0.8rem', color: '#fff' }}>© Copyright - Easy Outdesk. All rights reserved.</p>
                  </div>

                </div>
              )}


            </Col>


          </Row>
        ) : null}
        {selectedTable ? (
          <Modal className='Add_modal' show={isModalOpen} onHide={handleCloseModal} style={{ padding: '10px' }}>
            <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>{selectedTable}</h2>
            <div style={{ padding: '30px' }}>
              <Form onSubmit={handleSubmit}>
                {fields.map((item, index) => (
                  <Form.Group key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                    {item.column_name === 'header_id' ? null : (
                      <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }}>
                        {item.column_name.toUpperCase()}
                      </Form.Label>
                    )}

                    {relationshipOptionsList.some((opt) => opt.column === item.column_name) ? (
                      <Form.Select
                        as="select"
                        custom
                        value={retrievedData[item.column_name]}
                        // value={selectedDropdownValue} // Ensure you set the selected value in the state
                        onChange={(e) => handleInputChange(e, index, item.column_name)} // Handle the select change
                        style={{ height: '40px', flex: '2', marginLeft: 10 }}
                      >
                        <option value="">{'Select ' + item.column_name}</option>
                        {/* Render options based on your primary table data */}
                        {(relationshipOptionsList.find((opt) => opt.column === item.column_name)?.options ?? []).map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.text}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      <Form.Control
                        type={mysqlToHtmlInputType[item.data_type.toUpperCase()] || 'text'}
                        value={retrievedData[item.column_name]}
                        onChange={(e) => handleInputChange(e, index, item.column_name, item.data_type)}
                        placeholder={'Enter ' + item.column_name}
                        style={{ height: '40px', flex: '2', display: item.column_name === 'header_id' ? 'none' : 'block' }}
                      />
                    )}
                  </Form.Group>

                ))}
                {showAddRowbutton && (
                  <Button
                    style={{ float: 'right' }}
                    onClick={() => { handleAddinputFields() }}
                  >
                    {dependencyAddButton}
                  </Button>
                )}

                {showsubmitButton && (
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: '40%', height: '40px', marginLeft: '30%', marginBottom: '0px', marginTop: '30px' }}
                    className="custom-button"
                  >
                    {submitButton}
                  </Button>
                )}

              </Form>
            </div>

          </Modal>
        ) : null}

        {isTableisdependent ? (
          <Modal className='Add_modal' show={isEditModalOpen} onHide={handleCloseModal} style={{ padding: '10px' }}>
            <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>{selectedTable}</h2>
            <div style={{ padding: '30px' }}>
              <Form onSubmit={handleSubmit}>
                {retrievedData.map((rowData, rowIndex) => (
                  <div key={rowIndex}>
                    {/* Add fields only for the first iteration */}
                    {rowIndex === 0 && !fieldsAdded && fields.map((field, subIndex) => (
                      <Form.Group key={subIndex} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        {field.column_name === 'header_id' ? null : (
                          <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }}>
                            {field.column_name.toUpperCase()}
                          </Form.Label>
                        )}
                        {relationshipOptionsList.some((opt) => opt.column === field.column_name) ? (
                          <Form.Select
                            as="select"
                            custom
                            value={rowData[field.column_name] || ''}
                            onChange={(e) => handleDependencyTableInputChange(e, rowIndex, field.column_name)}
                            style={{ height: '40px', flex: '2', marginLeft: 10 }}
                          >
                            <option value="">{`Select ${field.column_name}`}</option>
                            {(relationshipOptionsList.find((opt) => opt.column === field.column_name)?.options ?? []).map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              )
                            )}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={mysqlToHtmlInputType[field.data_type.toUpperCase()] || 'text'}
                            value={rowData[field.column_name] || ''}
                            onChange={(e) => handleDependencyTableInputChange(e, rowIndex, field.column_name, field.data_type)}
                            placeholder={`Enter ${field.column_name}`}
                            style={{
                              height: '40px',
                              flex: '2',
                              display: field.column_name === 'header_id' ? 'none' : 'block',
                            }}
                          />
                        )}
                      </Form.Group>
                    ))}

                    {/* Continue with regular detailFields mapping for all iterations */}
                    {detailFields.map((item, index) => (
                      <Form.Group key={index} style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        {item.column_name === 'header_id' ? null : (
                          <Form.Label style={{ fontWeight: 'bold', marginRight: '10px', flex: '1' }}>
                            {item.column_name.toUpperCase()}
                          </Form.Label>
                        )}
                        {relationshipOptionsList.some((opt) => opt.column === item.column_name) ? (
                          <Form.Select
                            as="select"
                            custom
                            value={rowData[item.column_name] || ''}
                            onChange={(e) => handleDependencyTableInputChange(e, rowIndex, item.column_name)}
                            style={{ height: '40px', flex: '2', marginLeft: 10 }}
                          >
                            <option value="">{`Select ${item.column_name}`}</option>
                            {(relationshipOptionsList.find((opt) => opt.column === item.column_name)?.options ?? []).map(
                              (option) => (
                                <option key={option.value} value={option.value}>
                                  {option.text}
                                </option>
                              )
                            )}
                          </Form.Select>
                        ) : (
                          <Form.Control
                            type={mysqlToHtmlInputType[item.data_type.toUpperCase()] || 'text'}
                            value={rowData[item.column_name] || ''}
                            onChange={(e) => handleDependencyTableInputChange(e, rowIndex, item.column_name, item.data_type)}
                            placeholder={`Enter ${item.column_name}`}
                            style={{
                              height: '40px',
                              flex: '2',
                              display: item.column_name === 'header_id' ? 'none' : 'block',
                            }}
                          />
                        )}
                      </Form.Group>
                    ))}
                  </div>
                ))}
                {showAddRowbutton && (
                  <Button
                    style={{ float: 'right' }}
                    onClick={() => {
                      handleAddinputFields();
                    }}
                  >
                    {dependencyAddButton}
                  </Button>
                )}

                {showsubmitButton && (
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: '40%', height: '40px', marginLeft: '30%', marginBottom: '0px', marginTop: '30px' }}
                    className="custom-button"
                  >
                    {submitButton}
                  </Button>
                )}
              </Form>
            </div>
          </Modal>
        ) : null}
      </div>
    </div >
  );
};

export default DynamicScreen;
