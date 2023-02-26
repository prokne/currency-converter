import { Statistics } from "../types/types";
import classes from "./Stats.module.css";

const Stats: React.FC<{ stats: Statistics }> = (props) => {
  return (
    <div className={classes.stats}>
      <h2>Statistics</h2>
      <div className={classes.stats_row}>
        <div className={`${classes.stats_column} ${classes.stats_name}`}>
          <p> Most popular destination currency: </p>
          <p>Total amount converted:</p>
          <p>Total number of conversion requests made:</p>
        </div>
        <div className={classes.stats_column}>
          <p> {props.stats.mostPopularDestinationCurrency}</p>
          <p>${props.stats.totalAmount} USD</p>
          <p>{props.stats.totalNumberOfRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
