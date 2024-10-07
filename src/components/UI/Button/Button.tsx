
import styled from "styled-components";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
  type?: ButtonType;
  children?: React.ReactNode;
  disabled?: boolean; 
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
}


export const ButtonStyle = styled.button`
    border: 1px solid aqua;
    border-radius:1rem;
    padding: 0.5rem 1rem;
    background-color: white;
    margin: 0;
    color: black;
    font-weight: bold;
    cursor: pointer;
    width: 50%;

    &:hover {
        background-color: #0d0db1;
        color: white;
    }

`
const Button: React.FC<ButtonProps> = ({ children, disabled = false, onClick, label, type = "button" }) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick} type={type}>
      {label}
      {children}
    </ButtonStyle>
  );
};

export default Button;