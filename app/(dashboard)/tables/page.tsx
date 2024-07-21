import { getTableList } from "@/app/actions/tables/getTableList";
import { log } from "console";
import React from "react";
import TableWrapperClient from "./components/TableWrapperClient";
import { TablesType } from "@/types/tables";
import fetchAllMenuItemsList from "@/app/actions/menuItem/getMenuItemList";

const TablePage = async () => {
  const tablelist: TablesType[] = await getTableList();
  const menuItem = await fetchAllMenuItemsList();

  return (
    <div>
      <TableWrapperClient tablelist={tablelist} menuItem={menuItem} />
    </div>
  );
};

export default TablePage;
