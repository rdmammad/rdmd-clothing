import React from "react";
import "./custom-button.style.scss";

const CustomButton = ({children, buttonPurpose, ...otherProps}) => (
    <button className={`${buttonPurpose} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;