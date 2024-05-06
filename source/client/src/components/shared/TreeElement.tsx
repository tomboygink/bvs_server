import React, { FC } from "react";
import { IGroup } from "../../models/IDevice";
import FolderIcon from "@mui/icons-material/Folder";
import GpsNotFixedIcon from "@mui/icons-material/GpsNotFixed";
interface Props {
  location: IGroup;
}
import { TreeView, TreeItem } from "@mui/x-tree-view";
import { APP_STORAGE } from "../../storage/AppStorage";
export const TreeElement: FC<Props> = ({ location }) => {
  return (
    <TreeItem
      nodeId={location.id}
      label={location.group.g_name}
      icon={<FolderIcon fontSize="small" sx={{ color: "#FFE2C0" }} />}
      sx={{
        color: "#222",
        fontSize: "14px",
      }}
    >
      {location.childs.length !== 0 && (
        <>
          {location.childs.map((child) => (
            <TreeElement key={`child_${child.id}`} location={child} />
          ))}
        </>
      )}
      {location?.wells?.map((well) => {
        return (
          <TreeItem
            key={`dev_${well.id}`}
            nodeId={`well_${well.id}`}
            label={well.number}
            icon={<GpsNotFixedIcon sx={{ color: "#266BF1" }} />}
            sx={{ color: "black" }}
            onClick={() => APP_STORAGE.wells.setDefaultWell(well)}
          ></TreeItem>
        );
      })}
    </TreeItem>
  );
};
