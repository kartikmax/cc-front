import { ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

export const CustomListItem = ({ to, primary, icon: Icon, onClick }) => (
  <ListItem component={Link} to={to} onClick={onClick}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);
