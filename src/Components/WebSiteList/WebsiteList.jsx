import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import cross_icon from "../Assets/cross_icon.png";
import DashBoard from "../DashBorad/DashBoard";
import "./WebsiteList.css";

const WebsiteList = () => {
  const [allWebProducts, setAllWebProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("http://44.201.85.252/allwebproducts");
        const data = await response.json();
        setAllWebProducts(data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://44.201.85.252/removeproducts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const response = await fetch("http://44.201.85.252/allwebproducts");
    const data = await response.json();
    setAllWebProducts(data);
  };

  const handleOpenModal = (website) => {
    setSelectedWebsite(website);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const filteredWebProducts = allWebProducts.filter((website) =>
    Object.values(website).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const columns = [
    {
      field: "webimage1",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "webimage2",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "webimage3",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "webimage4",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "webimage5",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "webimage6",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value || "placeholder.jpg"}
          alt="Website"
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() => handleOpenModal(params.row)}
        />
      ),
    },
    {
      field: "viewDetails",
      headerName: "View Details",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenModal(params.row)}
        >
          View Details
        </Button>
      ),
      width: 150,
    },
    {
      field: "remove",
      headerName: "Remove",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => removeProduct(params.row.id)}
        >
          <img
            src={cross_icon}
            alt="Remove"
            style={{ width: "20px", height: "auto" }}
          />
        </Button>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <DashBoard />
      <div className="container">
        <div className="listproduct">
          <h1>All Website List</h1>
          <TextField
            label="Search..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <div style={{ height: "600px", width: "100%" }}>
            <DataGrid
              rows={filteredWebProducts.map((website, index) => ({
                id: website._id,
                ...website,
              }))}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </div>

      {/* Modal for Viewing Website Details */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Website Details</DialogTitle>
        <DialogContent>
          {selectedWebsite && (
            <div>
              <img
                src={selectedWebsite.webimage1 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src={selectedWebsite.webimage2 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src={selectedWebsite.webimage3 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src={selectedWebsite.webimage4 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src={selectedWebsite.webimage5 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <img
                src={selectedWebsite.webimage6 || "placeholder.jpg"}
                alt="Website"
                style={{ width: "100%", height: "auto" }}
              />
              <p>
                <strong>Title:</strong> {selectedWebsite.webname}
              </p>
              <p>
                <strong>Old Price:</strong> Rs.{selectedWebsite.webold_price}
              </p>
              <p>
                <strong>New Price:</strong> Rs.{selectedWebsite.webnew_price}
              </p>
              <p>
                <strong>Category:</strong> {selectedWebsite.webcategory}
              </p>
              <p>
                <strong>Description:</strong> {selectedWebsite.webdescriptions}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WebsiteList;
