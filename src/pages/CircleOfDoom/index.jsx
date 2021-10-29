import React from "react";
import Car from "../../components/Car";
import Tracks from './Tracks.json';
import styles from '../../styles/CircleOfDoom.module.scss';

class CircleOfDoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            RaceNumber: "",
            TrackId: 0,
            TrackPos: 0,
            PitTime: 0,
            x: 0,
            y: 0,
            EntryListCars: [],
            CarUpdates: []
        }

        this.api = window.api;
    }

    componentDidMount() {
        //Init Listeners
        this.api.send('ReadyToListen');

        //Init Output Pointer
        this.calcOutput();

        //Listeners
        this.api.on("TRACK_DATA", res => this.setState({TrackId: res.TrackId}));
        this.api.on("ENTRY_LIST_CAR", res => this.setState({EntryListCars: res._entryListCars}));
        this.api.on("REALTIME_CAR_UPDATE", res => {
            const {CarUpdates} = this.state;
            const Index = CarUpdates.findIndex(value => value.CarIndex === res.CarIndex);

            if(Index === -1)
                return this.setState({CarUpdates: CarUpdates.concat(res)});

            CarUpdates[Index] = res;
            this.setState({CarUpdates});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.TrackPos !== this.state.TrackPos)
            this.calcOutput();
    }

    calcOutput() {
        const Radius = 300;
        const CircleCenter = 275;
        const Radian = (360 - ((360 * this.state.TrackPos) - 270)) * (Math.PI / 180);

        const x = Radius * Math.cos(Radian) + (CircleCenter + 20);
        const y = Radius * Math.sin(Radian) + (CircleCenter + 5);

        this.setState({x, y});
    }

    arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }

    render() {
        const cars = this.state.EntryListCars.map((value, index) => {
            const {CarUpdates} = this.state;
            const CarUpdateIndex = CarUpdates.findIndex(value2 => value2.CarIndex === value.CarIndex);
            const TrackKey = Object.keys(Tracks).find(key => Tracks[key].TrackId === this.state.TrackId);
            const TrackData = TrackKey !== undefined ? Tracks[TrackKey] : undefined;

            if(CarUpdateIndex !== -1 && TrackData !== undefined) {
                const {PitTime} = this.state;
                const NewTrackPos = Math.round(CarUpdates[CarUpdateIndex].SplinePosition * 10000) / 10000;
                const NewOutputTime = TrackData.LapTime - (PitTime + 8 + TrackData.LossOfTime);
                const NewOutputPos = NewTrackPos - (1 - (NewOutputTime / TrackData.LapTime));

                if(value.RaceNumber === this.state.RaceNumber && this.state.RaceNumber !== 0 && NewOutputPos !== this.state.TrackPos)
                    this.setState({TrackPos: NewOutputPos});

                return <Car key={index} Nr={value.RaceNumber} Color={value.RaceNumber === this.state.RaceNumber ? "red" : "rgba(255, 255, 255, 0.65)"} TrackPos={NewTrackPos}/>;
            }

            return <Car key={index} Nr={value.RaceNumber} Color="rgba(255, 255, 255, 0.65)" TrackPos={0}/>;
        });

        return <div className={styles.container}>
            <div className={styles.title}>
                <span className={styles.main}>
                    Circle Of Doom
                </span>
                <br/>
                <span className={styles.sub}>
                    Stop Time:&nbsp;
                    <input type="number" value={this.state.PitTime} onChange={e => {
                        this.setState({PitTime: e.target.value.length !== 0 ? parseFloat(e.target.value) : parseFloat("0")})
                    }}/>s
                </span>
                <br/>
                <span className={styles.sub}>
                    Car Number:&nbsp;
                    <input type="number" value={this.state.RaceNumber} style={{marginTop: 5}} onChange={e => {
                        this.setState({RaceNumber: e.target.value.length !== 0 ? parseInt(e.target.value) : parseInt("0")})
                    }}/>
                </span>
            </div>

            <div className={styles.output} style={{top: this.state.y, right: this.state.x, transform: `rotate(${this.state.TrackPos * 360}deg)`}}/>
            {cars}
        </div>;
    }
}

export default CircleOfDoom;