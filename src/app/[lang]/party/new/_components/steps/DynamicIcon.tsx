import { Icon } from '@mui/material';
import { BugReport, Code, DesignServices, Info, ManageAccounts, Storage, Web } from '@mui/icons-material';

const IconMap: Record<string, any> = {
  Info,
  ManageAccounts,
  Code,
  Web,
  Storage,
  BugReport,
  DesignServices,
};
const DynamicIcon = ({ iconName }: { iconName: string }) => {
  if (!iconName) return <Icon />;

  return <Icon component={IconMap[iconName]} />;
};

export default DynamicIcon;
