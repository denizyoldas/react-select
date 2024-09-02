import Select from "./components/select";
import { DUMMY_OPTIONS } from "./data/dummy";
import { FaRegUser, FaCircle } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { usePostQuery } from "./data/use-post.query";
import { Option } from "./components/select/model";

function App() {
  const { data, isLoading } = usePostQuery();
  const handleSelectChange = (value: string | Option[]) => {
    console.log("Selected value: ", value);
  };
  const options = data?.map((item: { id: string; title: string }) => ({
    value: item.id,
    label: item.title,
  }));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="grid grid-cols-1 gap-4 max-w-md">
        <Select
          label="Team member"
          placeholder="Select team member"
          options={options}
          onChange={handleSelectChange}
          helperText="This is a hint text to help user."
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
          optionRender={(option) => (
            <div className="flex items-center gap-x-2">
              <img
                src={option.img}
                alt={option.label}
                className="w-6 h-6 rounded-full"
              />
              {option.label}
            </div>
          )}
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
          options={DUMMY_OPTIONS}
          icon={<CiSearch />}
          onChange={handleSelectChange}
        />
        <Select
          label="Team member"
          placeholder="Select team member"
          options={DUMMY_OPTIONS}
          icon={<CiSearch />}
          onChange={handleSelectChange}
          variant="chipList"
          optionRender={(option) => (
            <div className="flex items-center gap-x-2">
              <img
                src={option.img}
                alt={option.label}
                className="w-6 h-6 rounded-full"
              />
              {option.label}
            </div>
          )}
          tagRender={(option) => (
            <div
              key={option.value}
              className="rounded-md px-2 py-1 text-sm border border-secondary flex items-center gap-x-2"
            >
              <img
                src={option.img}
                alt={option.label}
                className="w-6 h-6 rounded-full"
              />
              {option.label.split("@")[0]}
              <button
                onClick={() => option.handleChipRemove(option)}
                className="ml-1 text-secondary"
              >
                ×
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}

export default App;
