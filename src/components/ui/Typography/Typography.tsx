import {ComponentProps, ElementType} from "react";
import s from "./Typography.module.css"
import clsx from "clsx";

type TypographyVariant = | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'

type TextOwnProps<E extends ElementType = ElementType>={
    children?:string;
    as?:E
    className?:string
    variant?:TypographyVariant
}

type TextProps<E extends ElementType> = TextOwnProps<E> & Omit<ComponentProps<E>, keyof TextOwnProps>

const defaultElement = 'div'
export default function Typography<E extends ElementType = typeof defaultElement>({children,className,as, variant = 'body1',...otherProps}:TextProps<E>){

    const classNames = clsx(s.text, s[variant], className)
    const Component = as || 'p'

    return <Component className={classNames} {...otherProps} >{children}</Component>
}
