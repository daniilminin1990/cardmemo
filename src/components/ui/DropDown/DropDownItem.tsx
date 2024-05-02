import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

type DropDownItemProps = {
    icon:string,
    text:string
}

const DropDownItem = (props:DropDownItemProps) => {
    const {icon,text,}=props
    return (
        <>
            <DropdownMenu.Separator className="ferstSeparator"/>
            <DropdownMenu.Separator className="DropdownMenuSeparator"/>
        <DropdownMenu.Item className="DropdownMenuItem">
            <img src={icon} alt=""/>
            <div>{text}</div>
        </DropdownMenu.Item>
        </>
    );
};

export default DropDownItem;