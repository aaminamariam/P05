import Button from "@mui/material/Button";

export interface IEnhancedButtonProps {
  startIcon?;
  children?;
  color?;
  disabled?;
  size?;
  sx?;
  variant?;
  onClick?;
}

export default function EnhancedButton(props: IEnhancedButtonProps) {
  return (
    <Button
      color={props.color}
      disabled={props.disabled}
      size={props.size}
      sx={props.sx}
      variant={props.variant}
      onClick={props.onClick}
      startIcon={props.startIcon}
    >
      {props.children}
    </Button>
  );
}
