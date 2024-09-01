import Select from "./components/select";
import { DUMMY_OPTIONS, DUMMY_OPTIONS_NO_IMAGE } from "./data/dummy";
import { FaRegUser, FaCircle } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { usePostQuery } from "./data/use-post.query";

function App() {
  const { data, isLoading } = usePostQuery();
  const handleSelectChange = (value: string) => {
    console.log("Selected value: ", value);
  };
  const options = data?.map((item: any) => ({
    value: item.id,
    label: item.title,
  }));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Team member"
          placeholder="Select team member"
          options={options}
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
          variant="search"
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS_NO_IMAGE}
          icon={<CiSearch />}
          onChange={handleSelectChange}
        />
        <Select
          showItemIcon
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<FaRegUser />}
          selectedIcon={<FaRegUser />}
          onChange={handleSelectChange}
          variant="chipList"
        />
      </div>
    </div>
  );
}

export default App;
