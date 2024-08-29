import Select from "./components/select";
import { DUMMY_OPTIONS } from "./data/dummy";
import { FaRegUser } from "react-icons/fa6";

function App() {
  const handleSelectChange = (value: string) => {
    console.log("Selected value: ", value);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Select
        showItemIcon
        label="Team member"
        placeholder="Select team member"
        // helperText="This is a hint text to help user."
        options={DUMMY_OPTIONS}
        icon={<FaRegUser />}
        onChange={handleSelectChange}
      />
    </div>
  );
}

export default App;
