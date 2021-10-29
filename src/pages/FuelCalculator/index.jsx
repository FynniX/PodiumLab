import React from "react";
import styles from '../../styles/FuelCalculator.module.scss';

class FuelCalculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.api = window.api;
    }

    componentDidMount() {
        //Init Listener
        this.api.send('ReadyToListen');
    }

    render() {
        return <div className={styles.container}>
            <div className={styles.leftContainer}>
                <h3 className={styles.title}>
                    Fuel Calculator
                </h3>

                <div className={styles.bar}>
                    <span className={styles.left}>0L</span>
                    <span className={styles.middle}>50L</span>
                    <span className={styles.right}>100L</span>
                </div>

                <div className={styles.info}>
                    <div>
                        <span className={styles.value}>2.00L</span>
                        <span className={styles.title}>AVG Use</span>
                    </div>
                    <div>
                        <span className={styles.value}>10.0L</span>
                        <span className={styles.title}>Refuel</span>
                    </div>
                    <div>
                        <span className={styles.value}>10.0</span>
                        <span className={styles.title}>Laps</span>
                    </div>
                    <div>
                        <span className={styles.value}>10.0</span>
                        <span className={styles.title}>Rem. Laps</span>
                    </div>
                </div>
            </div>
            <div className={styles.rightContainer}>
                <ul className={styles.list}>
                    <li className={styles.headline}>
                        <span>Lap</span>
                        <span>Used</span>
                        <span>Diff</span>
                    </li>
                    <li>
                        <span>15</span>
                        <span>3.1</span>
                        <span>0.0</span>
                    </li>
                    <li>
                        <span>14</span>
                        <span>3.1</span>
                        <span>0.0</span>
                    </li>
                    <li>
                        <span>13</span>
                        <span>3.1</span>
                        <span>0.0</span>
                    </li>
                    <li>
                        <span>12</span>
                        <span>3.1</span>
                        <span>0.0</span>
                    </li>
                    <li>
                        <span>11</span>
                        <span>3.1</span>
                        <span>0.0</span>
                    </li>
                </ul>
            </div>
        </div>;
    }
}

export default FuelCalculator;