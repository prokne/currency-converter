import classes from "./Stats.module.css";

const Stats: React.FC = () => {
  return (
    <div className={classes.stats}>
      <h2>Stats</h2>
      <ul className={classes.stats_list}>
        <div className={classes.item_wrapper}>
          <li>Most popular destination currency: </li>
        </div>
        <div className={classes.item_wrapper}>
          <li>Total amount converted (in USD):</li>
        </div>
        <div className={classes.item_wrapper}>
          <li>Total number of conversion requested made:</li>
        </div>
      </ul>
    </div>
  );
};

export default Stats;
