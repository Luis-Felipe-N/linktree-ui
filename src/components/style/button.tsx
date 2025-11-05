import { CustomizeColorsButton } from "./button/customize-colors";
import CustomizeRadiusButton from "./button/customize-radius";
import { CustomizeShapeButton } from "./button/customize-shape";

export function CustomizeButton() {
  return (
    <div className="space-y-2">
      <CustomizeShapeButton />
      <CustomizeColorsButton />
      <CustomizeRadiusButton />
    </div>
  )
}