declare module "react-icons-picker" {
  import * as React from "react";

  interface IconPickerProps {
    value: string;
    onChange: (value: string) => void;
    pickButtonStyle?: React.CSSProperties;
  }

  interface IconPickerItemProps {
    value: string;
    size: number;
    color?: string;
  }

  const IconPicker: React.FC<IconPickerProps>;

  export const IconPickerItem: React.FC<IconPickerItemProps>;

  export default IconPicker;
}
