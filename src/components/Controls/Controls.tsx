import style from './controls.module.css'

type ControlsType = {
    handleCarPark(): void
    isFull: boolean
}

export const Controls = ({handleCarPark, isFull}: ControlsType) => {
    return (
        <div className={style.p_btn}>
                  <button 
                  onClick={handleCarPark}
                   className ={isFull ? style.bg_r : style.bg_g}>PARK!</button>
        </div>
    )
}