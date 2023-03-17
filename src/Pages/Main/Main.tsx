import { useEffect, useState } from 'react'
import { ParkingSlot } from '../../components/ParkingSlot'
import { ParkingLotImpl } from '../../lib/ParkingLot'
import style from './main.module.css'
import { Controls } from '../../components/Controls'


const ROW_LIMIT = 3
interface Mainprops {
    slotCount: number
}
export interface Row {
    slotNum: number
    isBusy: boolean
    numberPlate: number
    remove?: (id: number) => void
}
// type Rows = [Row]
export const Main = ({slotCount}: Mainprops) => {
    const [parkingLot, setParkingLot] = useState( new ParkingLotImpl(0))
    const [availableSlots, setAvailableSlots] = useState<number[]>([])

    const [rows, setRows] = useState<Row[][]>([])

    useEffect(() => {
         setParkingLot(new ParkingLotImpl(slotCount))
    }, [slotCount])


    useEffect(() => {
        function distributeSlots() {
            let rowCount = Math.ceil(slotCount / ROW_LIMIT)
            const rows: Row[][] = []
            let row: Row []= []

            while(slotCount > 0 && rowCount > 0) {
                slotCount--
                // eslint-disable-next-line 
                const slot: number = parkingLot?.slots[slotCount] as number
                const isSlotTaken = slot !== null && slot !== undefined
                    // console.log('already saved life', slotCount)
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
        console.log('rows limit', rows, slotCount)

    }, [slotCount, availableSlots, parkingLot?.slots, rows])
    
    const handleCarPark = () => {
        if(parkingLot.isFull()) {
            console.log('Parking lot is full at the moment')
            return
        }
        parkingLot.setParkingLot()
        setAvailableSlots(parkingLot.availableSlot())
    } 

    const handleCarRemove = (id: number) => {
        parkingLot.removeParkingLot(id)
        setAvailableSlots(parkingLot.availableSlot()) 
    }

    return (
          <>
         {rows.map((row, idx) => 
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
            <div>
              <Controls handleCarPark={handleCarPark} />
            </div>
        </>
    )
}