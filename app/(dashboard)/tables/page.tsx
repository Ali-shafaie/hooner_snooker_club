import { getTableList } from "@/app/actions/tables/getTableList";
import React from "react";
import TableWrapperClient from "./components/TableWrapperClient";
import { TablesType } from "@/types/tables";
import getAllMenuItems from "@/app/actions/menuItem/getAllMenuItems";
import { MenuItem } from "@/types/menuItem";

const TablePage = async () => {
  const tablelist: TablesType[] = await getTableList();
  const menuItem: MenuItem[] = await getAllMenuItems();

  return (
    <div>
      <TableWrapperClient tablelist={tablelist} menuItem={menuItem} />
    </div>
  );
};

export default TablePage;
