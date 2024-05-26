import {Modal} from "@/components/ui/modal/modal";
import s from "@/components/ModalsForTable/modals.module.scss";
import Typography from "@/components/ui/Typography/Typography";
import {Button} from "@/components/ui/button";
import style from "./ModalOnEmpty.module.scss"
import { path } from '@/router/path'
import {Link} from "react-router-dom";

type Props = {
    open: boolean
    setIsOpenModal: (value: boolean) => void
}
const ModalOnEmpty = (props: Props) => {
    const {  open, setIsOpenModal } = props
    const onDeleteDeckHandler = () => {
        setIsOpenModal(false)
    }
    return (
        <Modal  onOpenChange={() => setIsOpenModal(false)} open={open} title={"Are you sure you want to leave this page?"}>
            <div className={s.body}>
                <Typography variant={'body1'}>
                    Do you really want to leave this page? You haven't created any cards !!!
                </Typography>
            </div>
            <div className={s.footer}>
                <Button  className={style.button} onClick={onDeleteDeckHandler} variant={'secondary'}>
                    <Typography variant={'subtitle2'}>No</Typography>
                </Button>
                <Button as={Link} to={`${path.decks}`} className={style.button} variant={'primary'}>
                    <Typography  variant={'subtitle2'}>
                        Yes
                    </Typography>
                </Button>
            </div>
        </Modal>
    );
};

export default ModalOnEmpty;