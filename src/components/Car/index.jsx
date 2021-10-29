import React from "react";
import styles from "../../styles/Car.module.scss";

class Car extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            x: 0,
            y: 0
        }
    }

    componentDidMount() {
        this.calcPosition();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.TrackPos !== this.props.TrackPos)
            this.calcPosition();
    }

    calcPosition() {
        const {TrackPos} = this.props;
        const Radius = 300;
        const CircleCenter = 275;
        const Radian = (360 - ((360 * TrackPos) - 270)) * (Math.PI / 180);

        const x = Radius * Math.cos(Radian) + CircleCenter;
        const y = Radius * Math.sin(Radian) + CircleCenter;

        this.setState({x, y});
    }

    render() {
        return <div className={styles.car} style={{top: this.state.y, right: this.state.x, backgroundColor: this.props.Color}}>
                <span className={styles.value}>
                    {this.props.Nr}
                </span>
        </div>
    }
}

export default Car;