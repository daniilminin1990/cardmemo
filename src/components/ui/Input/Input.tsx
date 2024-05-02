import s from "./Input.module.scss"
import Eye from "../../../assets/icons/svg/Eye"
import Search from "../../../assets/icons/svg/Search"
import Close from "../../../assets/icons/svg/Close"
import {ChangeEvent, useState} from "react";
import clsx from "clsx"

type inputProps = {
    type: "text"|"search"|"password"
    placeholder:string,
    disabled: boolean,
    error?: string
    label?:string
}

const Input = (props:inputProps) => {
    const {disabled="default",type, error,label} = props;

    const [tex,setText] = useState("")
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }
    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement> ) => {
        setText(e.currentTarget.value)
    }


    let classNameForInput = type==="search" && !!error ?
        clsx(s.boxInput,s.boxPadding,s.errorSeach) :
        type==="text" && !!error ?
            clsx(s.boxInput,s.boxPadding,s.errorTextAndPassword) :
            type==="password" && !!error ?
                clsx(s.boxInput,s.boxPadding,s.errorTextAndPassword) :
                type==="search" ?
                    clsx(s.boxInput,s.boxPadding) : s.boxInput

    let placeHolder = type==="search"? "Input search" : "Input"

    return (
        <div className={s.box}>
            <div className={s.label}>{label}</div>
            <div className={s.searchClose}>
                {type === "password" && isFocused && <Eye className={s.Eye} viewBox={"0 0 24 24"}/>}
                {type === "search" && <Search className={s.Search} viewBox={"0 0 24 24"}/>}

                <div onClick={() => setText("")}>
                    {type === "search" && <Close className={s.Close} viewBox={"0 0 24 24"}/>}
                </div>

                <input
                    className={classNameForInput}
                    type={type}
                    placeholder={placeHolder}
                    disabled={!!disabled}
                    onChange={onChangeInputHandler}
                    value={tex}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </div>
            {error && <div className={s.errorText}>{error}</div>}
        </div>
    );
};

export default Input;