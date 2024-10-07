export interface IButton {
    onClick?: () => void;
    children: React.ReactNode;
    type?: string;
}