// Import Prisma Client from your specific path
import prisma from "@/app/libs/prismadb";
import { AllTableListType } from "@/types/tables";
import { TableStatus } from "@prisma/client";

export default async function getAllTableList(): Promise<AllTableListType[]> {
  try {
    const tables = await prisma.table.findMany();

    // Map tables to match AllTableListType
    const mappedTables: AllTableListType[] = tables.map((table) => ({
      id: table.id,
      name: table.name,
      status: mapTableStatus(table.status), // Map status to match AllTableListType
      createdAt: table.createdAt,
      updatedAt: table.updatedAt,
    }));

    return mappedTables;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw new Error("Failed to fetch tables"); // Throw an error to handle it elsewhere
  }
}

// Function to map TableStatus to AllTableListType's status enum
function mapTableStatus(status: any): AllTableListType["status"] {
  switch (status) {
    case "FREE":
    case "OCCUPIED":
    case "RESERVED":
      return status; // Directly return known statuses
    default:
      return "OTHER_STATUS"; // Map unknown statuses to OTHER_STATUS
  }
}
