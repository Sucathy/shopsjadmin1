import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import DashBoard from "../DashBorad/DashBoard";
import "./OrderList.css";

const OrderList = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [userStates, setUserStates] = React.useState({});
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [updatedStatus, setUpdatedStatus] = React.useState({});

  // Fetch all users when the component mounts
  React.useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await fetch("http://localhost:4000/allusers");
        const data = await response.json();
        if (Array.isArray(data)) {
          setAllUsers(data);

          // Extracting and setting order statuses
          const initialUserStates = {};
          data.forEach((user) => {
            user.orders.forEach((order) => {
              initialUserStates[order.orderId] = order.orderStatus || {};
            });
          });
          setUserStates(initialUserStates);
        } else {
          setAllUsers([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAllUsers([]);
      }
    };
    fetchInfo();
  }, []);

  // Handle switch toggle for order status
  const handleChange = async (userId, orderId, event) => {
    const { name, checked } = event.target;

    // Update local state immediately for better UX
    const updatedStatus = {
      ...userStates[orderId],
      [name]: checked,
    };

    setUserStates((prevStates) => ({
      ...prevStates,
      [orderId]: updatedStatus,
    }));

    try {
      const response = await fetch("http://localhost:4000/updateOrderStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          orderId,
          orderStatus: updatedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      console.log("Order status updated successfully");
    } catch (error) {
      console.error("Error updating order status:", error);
      // Revert local state if backend update fails
      setUserStates((prevStates) => ({
        ...prevStates,
        [orderId]: prevStates[orderId], // revert to previous state
      }));
    }
  };

  // Open modal and set selected order
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setUpdatedStatus(order.orderStatus || {});
    setModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Update order status
  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;

    try {
      const response = await fetch("http://localhost:4000/updateOrderStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedOrder.userId,
          orderId: selectedOrder.orderId,
          orderStatus: updatedStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update local state
      setUserStates((prevStates) => ({
        ...prevStates,
        [selectedOrder.orderId]: updatedStatus,
      }));

      console.log("Order status updated successfully");
      handleCloseModal();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Filter users based on search term
  const filteredUsers = allUsers.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Prepare rows for DataGrid
  const rows = filteredUsers.flatMap((user, index) =>
    user.orders.map((order, orderIndex) => ({
      rowNumber: index * user.orders.length + orderIndex + 1,
      id: order.orderId,
      userId: user._id,
      name: user.name,
      orderId: order.orderId,
      orderStatus: order.orderStatus || {},
      products: order.products,
      amount: order.amount / 100,
      currency: order.currency,
      paymentStatus: order.paymentStatus,
      orderDate: new Date(order.orderDate).toLocaleDateString(),
      shippingAddress: `${order.shipping_address.username} ${order.shipping_address.lastName}, ${order.shipping_address.phoneNumber}, ${order.shipping_address.flatHouse}, ${order.shipping_address.fullAddress}, ${order.shipping_address.pinCode}, ${order.shipping_address.city}, ${order.shipping_address.state}`,
    }))
  );

  const columns = [
    { field: "rowNumber", headerName: "No.", width: 80 },
    { field: "userId", headerName: "User ID", width: 190 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "orderId", headerName: "Order ID", width: 150 },
    {
      field: "orderStatus",
      headerName: "Order Status",
      renderCell: (params) => (
        <div>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={params.value.likeOrder || false}
                    onChange={(event) =>
                      handleChange(params.row.userId, params.row.orderId, event)
                    }
                    name="likeOrder"
                    color="primary"
                  />
                }
                label="Order Confirmed"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={params.value.status42 || false}
                    onChange={(event) =>
                      handleChange(params.row.userId, params.row.orderId, event)
                    }
                    name="status42"
                    color="primary"
                  />
                }
                label="Shipped"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={params.value.orderCameActive || false}
                    onChange={(event) =>
                      handleChange(params.row.userId, params.row.orderId, event)
                    }
                    name="orderCameActive"
                    color="primary"
                  />
                }
                label="Out for Delivery"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={params.value.deliveryOrder || false}
                    onChange={(event) =>
                      handleChange(params.row.userId, params.row.orderId, event)
                    }
                    name="deliveryOrder"
                    color="primary"
                  />
                }
                label="Delivered"
              />
            </FormGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenModal(params.row)}
            style={{ marginTop: "10px" }}
          >
            Update
          </Button>
        </div>
      ),
      width: 400,
    },
    {
      field: "products",
      headerName: "Products",
      renderCell: (params) => (
        <div>
          {params.value.map((product, index) => (
            <div key={index}>
              <img
                src={product.image}
                alt={`Product ${product.productId}`}
                style={{ width: "30px", height: "30px" }}
              />
              <div>Product ID: {product.productId}</div>
              <div>Quantity: {product.quantity}</div>
            </div>
          ))}
        </div>
      ),
      width: 300,
    },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "currency", headerName: "Currency", width: 100 },
    { field: "paymentStatus", headerName: "Payment Status", width: 150 },
    { field: "orderDate", headerName: "Order Date", width: 150 },
    {
      field: "shippingAddress",
      headerName: "Shipping Address",
      renderCell: (params) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {params.value}
        </div>
      ),
      width: 300,
    },
  ];

  return (
    <>
      <DashBoard />
      <div className="container">
        <div className="listproduct">
          <h1>All User List</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <h2>Order Details</h2>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
              getRowHeight={() => "auto"}
            />
          </div>
        </div>
      </div>

      {/* Modal for Updating Order Status */}
      <Dialog open={modalOpen} onClose={handleCloseModal}>
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={updatedStatus.likeOrder || false}
                      onChange={(event) =>
                        setUpdatedStatus((prevStatus) => ({
                          ...prevStatus,
                          likeOrder: event.target.checked,
                        }))
                      }
                      name="likeOrder"
                      color="primary"
                    />
                  }
                  label="Order Confirmed"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={updatedStatus.status42 || false}
                      onChange={(event) =>
                        setUpdatedStatus((prevStatus) => ({
                          ...prevStatus,
                          status42: event.target.checked,
                        }))
                      }
                      name="status42"
                      color="primary"
                    />
                  }
                  label="Shipped"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={updatedStatus.orderCameActive || false}
                      onChange={(event) =>
                        setUpdatedStatus((prevStatus) => ({
                          ...prevStatus,
                          orderCameActive: event.target.checked,
                        }))
                      }
                      name="orderCameActive"
                      color="primary"
                    />
                  }
                  label="Out for Delivery"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={updatedStatus.deliveryOrder || false}
                      onChange={(event) =>
                        setUpdatedStatus((prevStatus) => ({
                          ...prevStatus,
                          deliveryOrder: event.target.checked,
                        }))
                      }
                      name="deliveryOrder"
                      color="primary"
                    />
                  }
                  label="Delivered"
                />
              </FormGroup>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OrderList;
