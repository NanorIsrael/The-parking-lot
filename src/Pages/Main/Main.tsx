import { useEffect, useState } from 'react'
import { ParkingSlot } from '../../components/ParkingSlot'
import { ParkingLot, ParkingLotImpl } from '../../lib/ParkingLot'
import style from './main.module.css'
import { Controls } from '../../components/Controls'


const ROW_LIMIT = 3
interface Mainprops {
    slotCount: number
}
export interface Row {
    slotNum: number
    isBusy: boolean
    numberPlate: number | null
    remove?: (id: number) => void
}
// type Rows = [Row]
export const Main = ({slotCount}: Mainprops) => { 

    const [parkingLot, setParkingLot] = useState<ParkingLot>(new ParkingLotImpl())
    const [availableSlots, setAvailableSlots] = useState<undefined | number>(slotCount)

    const [mainrows, setRows] = useState<Row[][]>([])

        useEffect(() => {
            if (slotCount !== 0)
                setParkingLot(new ParkingLotImpl(slotCount))
   
       }, [slotCount])
   
    
  
    useEffect(() => {
        function distributeSlots() {
            let rowCount = Math.ceil(slotCount / ROW_LIMIT)
            const rows: Row[][] = []
            let row: Row []= []

            while(slotCount > 0 && rowCount > 0) {
                slotCount--
                const slot: number | null = parkingLot?.slots[slotCount] as number
                const isSlotTaken = slot !== null && slot !== undefined

                row.push({
                    slotNum: slotCount,
                    isBusy: isSlotTaken,
                    numberPlate: slot,
                })

                if(slotCount % ROW_LIMIT === 0) {
                    rowCount--
                    rows.push(row)
                    row = []
                }

            }

            setRows(rows)

        }
        distributeSlots()
    }, [slotCount, availableSlots, parkingLot?.slots])

        // eslint-disable-next-line 

    const handleCarPark = () => {
        if(parkingLot?.isFull()) {
            console.log('Parking lot is full at the moment')
            return
        }
        parkingLot?.setParkingLot()
        setAvailableSlots(parkingLot?.availableSlot())
    } 

    const handleCarRemove = (id: number) => {
        parkingLot?.removeParkingLot(id)
        setAvailableSlots(parkingLot?.availableSlot()) 
    }

    return (
          <>
          <div className={style.app}>
            <section>
            {mainrows.map((row, idx) => 
                ( <div key={row[idx] + ''+ idx} className={style.slots}>
                { row.map(({ slotNum, isBusy, numberPlate}) => (
                    <ParkingSlot 
                    key={slotNum + idx}
                    slotNum={slotNum}
                    isBusy={isBusy}
                    numberPlate={numberPlate}
                    remove={handleCarRemove}
                    />
                ))}
                </div>
                )
                )}
               
            </section>
            <section>
                    <article>
                        <h1>Gv Parking Lot.</h1>
                        <p>Available slots:&nbsp;{availableSlots}</p>
                        <hr/>
                      
                        <Controls handleCarPark={handleCarPark} 
                        isFull={availableSlots === 0}/>
                        
                        <p>Click on a busy slot to unpack a car.</p>

                    </article>
            </section>
          </div>
         
        </>
    )
}