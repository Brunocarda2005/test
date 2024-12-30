import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ label, count, bg, linkAncord }) => {
  return (
    <Link to={`/${linkAncord}`}>
      <div className="w-full h-32 bg-color-sexto p-5 shadow-md rounded-md flex items-center justify-between cursor-pointer">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-color-principal">{label}</p>
          <span className="text-2xl font-semibold text-color-principal">
            {count}
          </span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${bg}`}
        >
          {label.charAt(0)}
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  bg: PropTypes.string.isRequired,
  linkAncord: PropTypes.string.isRequired,
};

const Dashboard = () => {
  const stats = [
    {
      label: "TOTAL TASK",
      total: 50,
      bg: "bg-[#1d4ed8]",
      linkAncord: "",
    },
    {
      label: "COMPLETED TASK",
      total: 25,
      bg: "bg-[#0f766e]",
      linkAncord: "completeTask",
    },
    {
      label: "TASK IN PROGRESS",
      total: 15,
      bg: "bg-[#f59e0b]",
      linkAncord: "inProgressTask",
    },
    {
      label: "PENDING",
      total: 10,
      bg: "bg-[#be185d]",
      linkAncord: "pendingTask",
    },
  ];

  return (
    <div className="mx-auto w-[90%]">
      {/* <Sidebar /> */}
      <div className="flex flex-col w-full justify-between">
        <h1 className="sm:text-2xl text-3xl font-bold my-8 text-center text-color-principal">
          Tasks
        </h1>
        <div className="h-full w-full mx-auto py-4 px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-item-center">
            {stats.map(({ label, total, bg, linkAncord }, index) => (
              <Card
                key={index}
                bg={bg}
                label={label}
                count={total}
                linkAncord={linkAncord}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
