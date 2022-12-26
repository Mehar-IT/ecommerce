import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../redux/utils/apiCalls";
import { reset as userReset } from "../../redux/adminSlice/allUserSlice";
import { reset as deleteUserReset } from "../../redux/adminSlice/deleteUserSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.deleteUser);

  const deleteUserHandler = (id) => {
    deleteUser(dispatch, id);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(userReset());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(deleteUserReset());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch(deleteUserReset());
    }

    getAllUsers(dispatch);
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, message]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      renderCell: ({ row }) => {
        return (
          <p
            className={` badge ${
              row.role === "admin" ? "greenColor" : "redColor"
            } `}
          >
            {row.role}
          </p>
        );
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,

      renderCell: ({ row }) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandler(row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
