import { Row } from "../../Pages/Main/Main"
import style from './parking-slot.module.css'

export const ParkingSlot = ({
     slotNum,
    isBusy,
    numberPlate, 
    remove
} : Row) => {
        console.log('numberPlate', numberPlate)
        const ensureCarExist = () => {
            numberPlate && remove!(numberPlate)
        }
    return (
        <div className={style.slot} 
        onClick={
            ensureCarExist
            }
            >
            {isBusy ? 
            numberPlate 
             : 
            slotNum}
        </div>
    )
}