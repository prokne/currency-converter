import { useContext } from "react";
import AppContext from "../store/app-context";
import classes from "./Stats.module.css";

//Renders statistics
const Stats: React.FC = () => {
  const ctx = useContext(AppContext);
  const mostPopDestCurrencies =
    ctx.stats?.mostPopularDestinationCurrencies.join(", ");
  return (
    <div className={classes.stats}>
      <h2>Statistics</h2>
      <div className={classes.stats_row}>
        <div className={`${classes.stats_column} ${classes.stats_name}`}>
          <p>Most popular destination currency:</p>
          <p>Total amount converted:</p>
          <p>Total number of conversion requests made:</p>
        </div>
        <div className={classes.stats_column}>
          <p> {mostPopDestCurrencies}</p>
          <p>${ctx.stats?.totalAmount} USD</p>
          <p>{ctx.stats?.totalNumberOfRequests}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
