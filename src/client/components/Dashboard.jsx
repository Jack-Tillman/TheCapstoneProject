import { CrudGridUsers } from "./CrudGridUsers";
import { CrudGridGames } from "./CrudGridGames";
import { CrudGridMerch } from "./CrudGridMerch";
import { CrudGridHardware } from "./CrudGridHardware";

export const Dashboard = ({ admin }) => {
  return (
    <>
      {/* <h1>Welcome, {users.username}!</h1>  */}
      {/* i think we need a single user fetch */}
      <h1>This is the user dashboard.</h1>
      <h2>Congratulations on being a user</h2>

      {admin && (
        <div className="grids-container">
          <CrudGridUsers admin={admin} />
          <CrudGridGames admin={admin} />
          <CrudGridMerch admin={admin} />
          <CrudGridHardware admin={admin} />
        </div>
      )}
    </>
  );
};
