import getTableList from "@/app/actions/tables/getTableList";
import TabList from "./components/TabList";
import getTable from "@/app/actions/tables/getTable";
import { TableType } from "@/types/singleTable";

const TableDetails = async ({ params }: { params: { id: string } }) => {
  try {
    const currentTable: TableType | null = await getTable(params.id); // Ensure tables is an array of Table objects or

    if (!currentTable) {
      return <div>Table list not available</div>;
    }

    if (!currentTable) {
      return <div>Table details not found</div>;
    }

    return (
      <div>
        <TabList currentTable={currentTable} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching table list:", error);
    // Handle the error gracefully, e.g., display an error message
    return <div>Error fetching table list</div>;
  }
};

export default TableDetails;
