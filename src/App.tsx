import Select from "./components/select";
import { DUMMY_OPTIONS } from "./data/dummy";
import { FaRegUser, FaCircle } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";

function App() {
  const handleSelectChange = (value: string) => {
    console.log("Selected value: ", value);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="flex flex-col gap-4">
        <Select
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          onChange={handleSelectChange}
        />
        <Select
          showItemIcon
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<FaRegUser />}
          onChange={handleSelectChange}
        />
        <Select
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<FaRegUser />}
          onChange={handleSelectChange}
        />
        <Select
          showItemIcon
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<FaCircle className="text-green-400 w-2 h-2" />}
          onChange={handleSelectChange}
        />
        <Select
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<CiSearch />}
          onChange={handleSelectChange}
        />
        <Select
          showItemIcon
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<FaRegUser />}
          onChange={handleSelectChange}
          variant="chipList"
        />
      </div>
    </div>
  );
}

export default App;
