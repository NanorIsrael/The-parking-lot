type ControlsType = {
    handleCarPark(): void
}

export const Controls = ({handleCarPark}: ControlsType) => {
        // console.log('numberPlate', numberPlate)
    return (
        <div className={''}>
                  <button onClick={handleCarPark}>PARK!</button>
        </div>
    )
}