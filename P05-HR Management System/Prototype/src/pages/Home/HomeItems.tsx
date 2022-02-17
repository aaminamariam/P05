import { ISettingsItemCardProps } from "../../components/SettingsItemCard";
import { IEnhancedCardProps } from "../../components/EnhancedCard";

import SettingsIcon from "@material-ui/icons/Settings";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

export const itemsArray = [
  {
    title: "General",
    items: [
      {
        icon: <SettingsIcon color="action" />,
        title: "My Profile",
        description: "View and update your particulars and address details",
        link: "link",
      },
      {
        icon: <PaymentIcon color="action" />,
        title: "Change Password",
        description: "Change your current password",
        link: "link",
      },

      {
        icon: <SettingsIcon color="action" />,
        title: "My Profile",
        description: "View and update your particulars and address details",
        link: "link",
      },
      {
        icon: <PaymentIcon color="action" />,
        title: "Change Password",
        description: "Change your current password",
        link: "link",
      },
      {
        icon: <SettingsIcon color="action" />,
        title: "General Settings",
        description: "Customize your T4, T4A, and Filling Data Attributes",
        link: "link",
      },
    ],
  },
  {
    title: "Company",
    items: [
      {
        icon: <LocalShippingIcon color="action" />,
        title: "API",
        description: "Manage your API keys and IDs",
        link: "link",
      },
      {
        icon: <PaymentIcon color="action" />,
        title: "Change Password",
        description: "Change your current password",
        link: "link",
      },
      {
        icon: <AccountBalanceIcon color="action" />,
        title: "Users",
        description: "Manage your Users",
        link: "link",
      },
      {
        icon: <PaymentIcon color="action" />,
        title: "Change Password",
        description: "Change your current password",
        link: "link",
      },
      {
        icon: <SettingsIcon color="action" />,
        title: "Filing Resource",
        description: "View and update your resources for filing",
        link: "link",
      },
      {
        icon: <PaymentIcon color="action" />,
        title: "Change Password",
        description: "Change your current password",
        link: "link",
      },
    ],
  },
];
