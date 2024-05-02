
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import icon from "../../../assets/icons/person.svg"
import icon2 from "../../../assets/icons/search.svg"
import './DropDown.scss';
import {ReactNode} from "react";

type DropdownMenuDemoProps ={
    type: "head"| "menu"
    children:ReactNode
}

const DropdownMenuDemo = (props:DropdownMenuDemoProps) => {
    const {type,children} = props;



    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <button className="IconButton" aria-label="Customise options">
                    {type === "head" ? <img src={icon} alt=""/> : <img src={icon2} alt=""/> }
                </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>

                <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>

                    {type === "head" &&
                    <DropdownMenu.Item className="DropdownMenuItem">
                        <img src={icon} alt=""/>
                        <div>Ivan</div>
                        <div>Email</div>
                    </DropdownMenu.Item>
                    }

                    {children}

                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
};

export default DropdownMenuDemo;