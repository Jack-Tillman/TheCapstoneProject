import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { fetchItems } from "../api";
/* END OF IMPORTS */

//LINK TO DOCS: https://mui.com/x/react-data-grid/editing/

/* editToolbar COMPONENT - This component is responsible for the toolbar icons and functionality */

function EditToolbar(props) {
  //idCounter and setIdCounter are used to increment the id of each added user by 1
  const { setRows, setRowModesModel, idCounter, setIdCounter } = props;

  const handleClick = () => {
    const id = idCounter + 1;
    setRows((oldRows) => [
      ...oldRows,
      {
        id: id,
        stripe_id: "",
        productname: "",
        genre: "",
        delivery: "",
        price: "",
        stock: "",
        condition: "",
        description: "",
        productimage: "",
        publisher: "",
        playerrange: "",
        esrb: "",
        featured: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "stripe_id" },
    }));
    setIdCounter(idCounter + 1);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add Game
      </Button>
    </GridToolbarContainer>
  );
}

/* GRID COMPONENT */

export const CrudGridGames = () => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  //idCounter is used for creating new rows, starts at 10 because there are currently 10 games in seed data
  const [idCounter, setIdCounter] = useState(
    Math.max(...rows.map((row) => row.id), 10)
  );
  useEffect(() => {
    async function getGames() {
      try {
        const response = await fetchItems("games");
        const result = await response.json();
        if (response.status === 200) {
          setRows(result);
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getGames();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  //column width is set below for each column, numbers are in px
  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    { field: "stripe_id", headerName: "stripeId", width: 130, editable: true },
    {
      field: "productname",
      headerName: "Product Name",
      width: 130,
      editable: true,
    },
    { field: "genre", headerName: "Genre", width: 130, editable: true },
    {
      field: "delivery",
      headerName: "Delivery Type",
      width: 130,
      editable: true,
    },
    { field: "price", headerName: "price ($)", width: 80, editable: true },
    { field: "stock", headerName: "stock", width: 80, editable: true },
    { field: "condition", headerName: "Condition", width: 70, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 130,
      editable: true,
    },
    { field: "publisher", headerName: "Publisher", width: 130, editable: true },
    {
      field: "productimage",
      headerName: "Product Image",
      width: 130,
      editable: true,
    },
    {
      field: "playerrange",
      headerName: "Player Range",
      width: 130,
      editable: true,
    },
    { field: "esrb", headerName: "ESRB Rating", width: 60, editable: true },
    { field: "featured", headerName: "Featured", width: 60, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: (props) => <EditToolbar {...props} idCounter={idCounter} />,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, idCounter, setIdCounter },
        }}
      />
    </Box>
  );
};
