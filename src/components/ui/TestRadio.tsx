import  {ReactNode} from "react";
type TestRadioProps = {
    children: ReactNode
}

const TestRadio = (props:TestRadioProps ) => {
    return (
        <div>
            {props.children}
        </div>
    );
};

export default TestRadio;