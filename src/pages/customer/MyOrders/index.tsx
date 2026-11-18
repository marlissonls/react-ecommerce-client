
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
} from '@mui/material'

import api from "@/api";
import type { Order, OrderPageView } from "@/types";

import OrdersHeader from "./components/OrdersHeader";
// import OrderFilters from "./components/OrderFilters";
import OrderList from "./components/OrderList";
import OrdersPagination from "./components/OrdersPagination";

const PAGE_SIZE = 12

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  // const [activeFilter, setActiveFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(0);

  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        // const params: Record<string, string | number> = {
        //   page: currentPage,
        // };

        // if (activeFilter !== "ALL") {
        //   params.status = activeFilter;
        // }

        // const response = await api.get<OrderPageView>("/orders", {
        //   params,
        // });

        const response = await api.get<OrderPageView>("/orders");

        setOrders(response.data.items);
        setTotal(response.data.total)
      } catch {
        setError("Não foi possível carregar seus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentPage]);
  // }, [activeFilter, currentPage]);

  // const handleFilterChange = (filter: string) => {
  //   setActiveFilter(filter);
  //   setCurrentPage(0);
  // };

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <Box className="min-w-0 flex-1 p-6">
      <OrdersHeader />

      {/* <OrderFilters
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      /> */}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box className="flex justify-center py-12">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <OrderList orders={orders} />

          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Box>
  );
}

export default MyOrders;
