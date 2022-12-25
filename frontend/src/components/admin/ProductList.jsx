import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProductforAdmin,
  deleteProduct,
} from "../../redux/utils/apiCalls";
import { reset } from "../../redux/productSlice";
import { reset as deleteReset } from "../../redux/deleteProduct";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    deleteProduct(dispatch, id);
  };
  useEffect(() => {
    getAllProductforAdmin(dispatch);
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(reset());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(deleteReset());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch(deleteReset());
    }
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${row.id}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
