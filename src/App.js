import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setList } from "./store";

export default function App() {
  const { list } = useSelector((state) => state.general);
  const [search, setSearch] = React.useState({ name: "", year: 2000 });
  const dispach = useDispatch();

  useEffect(() => {
    const getData = setTimeout(() => {
      if (search?.name) {
        fetch(
          "https://api.github.com/search/repositories?q=" + search.name
        ).then(async (result) => {
          let data = await result.json();

          dispach(setList(data.items));
        });
      }
    }, [500]);

    return () => clearTimeout(getData);
  }, [search, dispach]);

  return (
    <div
      style={{
        display: "flex",
        marginTop: "100px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        freeSolo
        onInputChange={(_, newInputValue) => {
          setSearch({ name: newInputValue });
        }}
        options={list ? list : []}
        value={search}
        onChange={(event, value) => {
          if (value?.html_url) {
            window.open(value.html_url, "_blank");
            setSearch(value);
          }
        }}
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search Repo" />}
      />
    </div>
  );
}
