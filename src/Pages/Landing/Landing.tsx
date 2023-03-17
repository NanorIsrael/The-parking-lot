import { FieldValues, useForm } from 'react-hook-form'
// import {PropTypes} from 'react'
import style from './landing.module.css'

const PARKING_SIZE = 20;

interface LandingProps{
    setParkingSlotCount : (parkingSize: number) => void;
    triggerTransitions: () => void;
}

export function Landing ({setParkingSlotCount, triggerTransitions} : LandingProps): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm({ mode: 'onChange'});

    const onSubmit = (data: FieldValues) => {
        const parkingSize: number = Number(data.parkingSize)
        setParkingSlotCount(parkingSize)
        triggerTransitions();
    }
   
    
    return (
        <div className={style.landing_page}>
            {/* <div className={style.landing_section}> */}
                <h1 className={style.landing__h1}>Welcome to Parking Lot Software Inc.</h1>
                <section className={style.landing_form}>
                    <h2 className={style.landing_h2}>  How many parking slots do you need?</h2>
                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            id="lot_size" 
                            type="number" 
                            placeholder={`Enter your desired size here (1-${PARKING_SIZE})`}
                            {...register('parkingSize',{
                            required: true,
                            max: PARKING_SIZE,
                            maxLength: 2,
                            min: 1
                            })}
                        />
                          {
                            errors.parkingSize && (
                                <span className='form__error'>Parking slots count should be between 1 and {PARKING_SIZE}{" "}
                                (including).</span>
                            )
                        }
                        <label htmlFor={'lot_size'}>Lot size</label>
                        <input type="submit" />
                      
                    </form>
                </section>
            {/* </div> */}
        </div>
    );
}