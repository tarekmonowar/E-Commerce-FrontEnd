import AccountDetails from "./AccountDetails";
import ChangePassword from "./ChangePasswrord";
import DeleteAccount from "./DeleteAccount";
import MyOrders from "./MyOrders";
import ShippingAddress from "./ShippingAddress";

interface Props {
  activeMenu: string;
}

export const RenderContent: React.FC<Props> = ({ activeMenu }) => {
  switch (activeMenu) {
    case "account":
      return <AccountDetails />;

    case "password":
      return <ChangePassword />;

    case "shipping":
      return <ShippingAddress />;

    case "orders":
      return <MyOrders />;

    case "delete":
      return <DeleteAccount />;

    default:
      return null;
  }
};
