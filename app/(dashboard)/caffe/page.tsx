import getAllMenuItems from "@/app/actions/menuItem/getAllMenuItems";
import WrapperMenuItems from "./components/WrapperMenuItems";
import { MenuItem } from "@/types/menuItem"; // Import MenuItem type

const CafePage = async () => {
  const menuItems: MenuItem[] = await getAllMenuItems();

  return <WrapperMenuItems menuItems={menuItems} />;
};

export default CafePage;
